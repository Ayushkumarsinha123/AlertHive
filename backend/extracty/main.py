from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from transformers import pipeline
import spacy
import os
import torch

# Ensure only PyTorch is used
os.environ["USE_TF"] = "0"

# Load required models
nlp = spacy.load("en_core_web_sm")
disaster_classifier = pipeline("text-classification", model="custom_model/disaster_model", tokenizer="custom_model/disaster_model")
fake_news_classifier = pipeline("text-classification", model="custom_model/fake_news_model", tokenizer="custom_model/fake_news_model")

# FastAPI app
app = FastAPI()

# Input schema
class TitlesInput(BaseModel):
    titles: List[str]

def extract_disaster_info(text: str) -> dict:
    """
    Extract structured disaster-related information from input text.
    Returns a dictionary with flags, entities, and other inferred values.
    """
    doc = nlp(text)

    # Define keyword categories
    realtime_verbs_by_type = {
        "fire": {"spreading", "burning", "engulfing"},
        "flood": {"rising", "overflowing", "submerging"},
        "earthquake": {"shaking", "rumbling", "cracking"},
        "explosion": {"collapsing", "crumbling", "spreading"},
        "storm": {"intensifying", "raging", "moving"},
        "landslide": {"sliding", "burying"},
        "riot": {"escalating", "breaking", "attacking"},
        "default": {"happening", "occurring", "ongoing"}
    }

    temporal_markers = {"now", "currently", "at the moment", "immediately", "rapidly", "fast", "today", "right now"}
    urgency_keywords = {"urgent", "emergency", "immediately", "asap", "critical"}
    help_keywords = {"help", "need", "send", "rescue", "assistance", "medical", "evacuate"}
    disaster_keywords = set(realtime_verbs_by_type.keys())

    data = {
        "urgency": False,
        "real_time": False,
        "disaster_type": None,
        "location": [],
        "magnitude": None,
        "killed": 0,
        "injured": 0,
        "infrastructure_damage": [],
        "request_for_help": False,
        "tags": []
    }

    disaster_detected = None

    for token in doc:
        lemma = token.lemma_.lower()

        if lemma in urgency_keywords:
            data["urgency"] = True
            data["tags"].append("urgent")

        if lemma in disaster_keywords:
            data["disaster_type"] = lemma
            disaster_detected = lemma

        if "magnitude" in token.text.lower():
            prev = token.nbor(-1) if token.i > 0 else None
            if prev and prev.like_num:
                data["magnitude"] = float(prev.text)

        # Improved numeric extraction for killed/injured using dependency patterns
        if lemma in ["kill", "injure"]:
            for child in token.children:
                if child.like_num:
                    if lemma == "kill":
                        data["killed"] += int(child.text)
                    elif lemma == "injure":
                        data["injured"] += int(child.text)

    for token in doc:
        lemma = token.lemma_.lower()
        text_lower = token.text.lower()
        real_time_verbs = realtime_verbs_by_type.get(disaster_detected, set()) | realtime_verbs_by_type["default"]

        if token.tag_ == "VBG" and lemma in real_time_verbs:
            data["real_time"] = True
            data["tags"].append("real_time_event")

        if text_lower in temporal_markers:
            data["real_time"] = True
            data["tags"].append("real_time_event")

        if lemma in help_keywords:
            data["request_for_help"] = True
            help_tag_map = {
                "medical": "medical_help",
                "rescue": "rescue_needed",
                "evacuate": "evacuation_needed"
            }
            data["tags"].append(help_tag_map.get(lemma, "help_requested"))

    for ent in doc.ents:
        if ent.label_ in ["GPE", "LOC"]:
            data["location"].append(ent.text)
        elif ent.label_ in ["FAC", "ORG"] and any(w in ent.text.lower() for w in ["building", "bridge", "hospital", "road"]):
            data["infrastructure_damage"].append(ent.text)

    return data

@app.post("/analyze")
async def analyze_titles(input_data: TitlesInput):
    results = []
    for title in input_data.titles:
        disaster_result = disaster_classifier(title)[0]

        if disaster_result['label'] == 'LABEL_1':
            credibility_result = fake_news_classifier(title)[0]

            if credibility_result['label'] == 'LABEL_1':
                info = extract_disaster_info(title)
                results.append({
                    "title": title,
                    "disaster": True,
                    "credible": True,
                    "info": info
                })
            else:
                results.append({
                    "title": title,
                    "disaster": True,
                    "credible": False,
                    "info": {}
                })
        else:
            results.append({
                "title": title,
                "disaster": False,
                "credible": None,
                "info": {}
            })
    return results
