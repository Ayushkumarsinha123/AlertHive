from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
from transformers import pipeline
import spacy

# Load required models
nlp = spacy.load("en_core_web_sm")
disaster_classifier = pipeline("text-classification", model="garynguyen1174/disaster_tweet_bert")
fake_news_classifier = pipeline("text-classification", model="mrm8488/bert-tiny-finetuned-fake-news-detection")

# FastAPI app
app = FastAPI()

# Input schema
class TitlesInput(BaseModel):
    titles: List[str]

# Core extraction function
def extract_disaster_info(text):
    doc = nlp(text)

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
        if lemma in ["kill", "injure"]:
            for child in token.children:
                if child.dep_ == "dobj":
                    for subchild in child.children:
                        if subchild.dep_ == "nummod" and subchild.like_num:
                            count = int(subchild.text)
                            if lemma == "kill":
                                data["killed"] += count
                            elif lemma == "injure":
                                data["injured"] += count

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
            if lemma == "medical":
                data["tags"].append("medical_help")
            elif lemma == "rescue":
                data["tags"].append("rescue_needed")
            elif lemma == "evacuate":
                data["tags"].append("evacuation_needed")
            else:
                data["tags"].append("help_requested")

    for ent in doc.ents:
        if ent.label_ in ["GPE", "LOC"]:
            data["location"].append(ent.text)
        if ent.label_ in ["FAC", "ORG"] and any(w in ent.text.lower() for w in ["building", "bridge", "hospital", "road"]):
            data["infrastructure_damage"].append(ent.text)

    return data

# API endpoint
@app.post("/analyze")
async def analyze_titles(input_data: TitlesInput):
    results = []
    for title in input_data.titles:
        disaster_result = disaster_classifier(title)[0]
        if disaster_result['label'] == 'LABEL_1':
            credibility_result = fake_news_classifier(title)[0]
            if credibility_result['label'] == 'real':
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
