from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List

from transformers import pipeline
import spacy

import os

from twikit_bot.xscrape import create_default_bot


# Ensure only PyTorch is used
os.environ["USE_TF"] = "0"

# Load required models
nlp = spacy.load("en_core_web_sm")
disaster_classifier = pipeline("text-classification", model="custom_model/disaster_model", tokenizer="custom_model/disaster_model")
fake_news_classifier = pipeline("text-classification", model="custom_model/fake_news_model", tokenizer="custom_model/fake_news_model")

# FastAPI app
app = FastAPI()

# RESULT
RESULT = [
    {
        "id": "1922271817307148711",
        "user": "Matere™",
        "text": "Hiyo Python inafanya nini kwa computer zirudishe kwa museum https://t.co/U3JiQyCowV",
        "created_at": "Tue May 13 12:44:49 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:49+00:00",
        "media": [
            {
                "large": {
                    "faces": []
                },
                "medium": {
                    "faces": []
                },
                "small": {
                    "faces": []
                },
                "orig": {
                    "faces": []
                }
            }
        ],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "Hiyo Python inafanya nini kwa computer zirudishe kwa museum https://t.co/U3JiQyCowV"
    },
    {
        "id": "1922271811422585171",
        "user": "Yannick Veys - Marketing & Growth",
        "text": "@cursor_ai @mntruell @sualehasif996 @amanrsanger @ArVID220u The future won't be programming languages like TypeScript or Python.\n\nIt won't be chatbots either (too imprecise).\n\nIt'll be a new representation of software logic that looks more like English – a high-level pseudocode you can edit and control. https://t.co/177IMR7uX8",
        "created_at": "Tue May 13 12:44:48 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:48+00:00",
        "media": [
            {
                "aspect_ratio": [
                    16,
                    9
                ],
                "duration_millis": 23000,
                "variants": [
                    {
                        "content_type": "application/x-mpegURL",
                        "url": "https://video.twimg.com/amplify_video/1922271786109980673/pl/EP8fLvmElD3G9YwG.m3u8?tag=14"
                    },
                    {
                        "bitrate": 288000,
                        "content_type": "video/mp4",
                        "url": "https://video.twimg.com/amplify_video/1922271786109980673/vid/avc1/480x270/ZqnJ88bid5mZ-r0j.mp4?tag=14"
                    },
                    {
                        "bitrate": 832000,
                        "content_type": "video/mp4",
                        "url": "https://video.twimg.com/amplify_video/1922271786109980673/vid/avc1/640x360/nF-NumRxnGWx-xRF.mp4?tag=14"
                    },
                    {
                        "bitrate": 2176000,
                        "content_type": "video/mp4",
                        "url": "https://video.twimg.com/amplify_video/1922271786109980673/vid/avc1/1280x720/tcahIv9xYSruA0Vy.mp4?tag=14"
                    }
                ]
            }
        ],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@cursor_ai @mntruell @sualehasif996 @amanrsanger @ArVID220u The future won't be programming languages like TypeScript or Python.\n\nIt won't be chatbots either (too imprecise).\n\nIt'll be a new representation of software logic that looks more like English – a high-level pseudocode you can edit and control. https://t.co/177IMR7uX8"
    },
    {
        "id": "1922271811355426925",
        "user": "HumanChauvinist",
        "text": "@Simon_Lucy @learntToCode @ChShersh In Python, it literally executes the file being imported. In Java, the import statement is just info given to the compiler.",
        "created_at": "Tue May 13 12:44:48 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:48+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@Simon_Lucy @learntToCode @ChShersh In Python, it literally executes the file being imported. In Java, the import statement is just info given to the compiler."
    },
    {
        "id": "1922271766640025638",
        "user": "ひかやまうちる",
        "text": "boa python cobra snake viperといるのに日本語だと全部ヘビ",
        "created_at": "Tue May 13 12:44:37 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:37+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "boa python cobra snake viperといるのに日本語だと全部ヘビ"
    },
    {
        "id": "1922271745404281123",
        "user": "ニッパー@株シストレ",
        "text": "ExcelやPythonとかでバックテストするのもありですが、準備が大変。\nイザナミ使ったほうが楽です。",
        "created_at": "Tue May 13 12:44:32 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:32+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "ExcelやPythonとかでバックテストするのもありですが、準備が大変。\nイザナミ使ったほうが楽です。"
    },
    {
        "id": "1922271671261544482",
        "user": "Akos",
        "text": "@buildwithpetar oh for sure, I'll do the same in a different niche. Also I don't know python so I'm exploring TypeScript alternatives",
        "created_at": "Tue May 13 12:44:15 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:15+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@buildwithpetar oh for sure, I'll do the same in a different niche. Also I don't know python so I'm exploring TypeScript alternatives"
    },
    {
        "id": "1922271670531723368",
        "user": "チョコパイソン",
        "text": "@9Rhn0TwDNKw2A6D ホンマやね🤣🤣🤣❗️",
        "created_at": "Tue May 13 12:44:14 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:14+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@9Rhn0TwDNKw2A6D ホンマやね🤣🤣🤣❗️"
    },
    {
        "id": "1922271654568153539",
        "user": "あゆ＠Python×AI",
        "text": "🧩Python学習中「自分向いてないかも」と思った瞬間\n\n何度書いてもエラー。\n調べても解決しない。\n「私には無理かも…」って何度も思った。\n\nでも、今はChatGPTがある！\nAIに質問すれば初級レベルの内容はほぼ完璧に解決する。\n\nこんな便利なもの使わない手はない！",
        "created_at": "Tue May 13 12:44:11 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:11+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "🧩Python学習中「自分向いてないかも」と思った瞬間\n\n何度書いてもエラー。\n調べても解決しない。\n「私には無理かも…」って何度も思った。\n\nでも、今はChatGPTがある！\nAIに質問すれば初級レベルの内容はほぼ完璧に解決する。\n\nこんな便利なもの使わない手はない！"
    },
    {
        "id": "1922271653523869792",
        "user": "nokenda_njan_tanne",
        "text": "@Sridev_i Python",
        "created_at": "Tue May 13 12:44:10 +0000 2025",
        "created_at_datetime": "2025-05-13T12:44:10+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@Sridev_i Python"
    },
    {
        "id": "1922271599698313223",
        "user": "Legitas Realty | Python Backend dev",
        "text": "The Lagos State Government has begun demolishing buildings in Megamound Estate, Oral Estate, and Lekki County.\n\nThese aren't random shops or kiosks  these are luxury homes worth tens of millions of naira.\n\nSo, what happened?",
        "created_at": "Tue May 13 12:43:58 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:58+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "The Lagos State Government has begun demolishing buildings in Megamound Estate, Oral Estate, and Lekki County.\n\nThese aren't random shops or kiosks  these are luxury homes worth tens of millions of naira.\n\nSo, what happened?"
    },
    {
        "id": "1922271583059460482",
        "user": "チョコパイソン",
        "text": "「なんか炒めたやつ」からの🤣かなり遅れてからのグングン後上がり上がり中\n追加行っときます☝️\nルムジェブ準備よしっ👍\nでは発射します💉\n久々のロック🔛🚀\n行けぇ〜ルムジェブスペシャル😆☝️ https://t.co/Ym6VKGFd54",
        "created_at": "Tue May 13 12:43:54 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:54+00:00",
        "media": [
            {
                "large": {
                    "faces": []
                },
                "medium": {
                    "faces": []
                },
                "small": {
                    "faces": []
                },
                "orig": {
                    "faces": []
                }
            }
        ],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "「なんか炒めたやつ」からの🤣かなり遅れてからのグングン後上がり上がり中\n追加行っときます☝️\nルムジェブ準備よしっ👍\nでは発射します💉\n久々のロック🔛🚀\n行けぇ〜ルムジェブスペシャル😆☝️ https://t.co/Ym6VKGFd54"
    },
    {
        "id": "1922271484568867271",
        "user": "Prettie Bee🐝",
        "text": "Hizo tweets za kabogo na python have made my whole ass day. Hehe",
        "created_at": "Tue May 13 12:43:30 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:30+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "Hizo tweets za kabogo na python have made my whole ass day. Hehe"
    },
    {
        "id": "1922271421851488335",
        "user": "Mass Servant 🇰🇪",
        "text": "Mtu aniekezee ka Kabogo what is meant by Python.",
        "created_at": "Tue May 13 12:43:15 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:15+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "Mtu aniekezee ka Kabogo what is meant by Python."
    },
    {
        "id": "1922271411223072908",
        "user": "𝗻𝗼𝗯𝗼𝗱𝘆",
        "text": "@Python_Dv so who did you steal this one from",
        "created_at": "Tue May 13 12:43:13 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:13+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@Python_Dv so who did you steal this one from"
    },
    {
        "id": "1922271400221393128",
        "user": "こう 土木設計×AI・プログラミング",
        "text": "@Ne9QsqEqRY6446 いえ、僕がAutoCAD+Lispに限ってしか話せないので、それについては苦戦してるという感じです。\n\nSVGや他CAD(free cad)、python出力などでクオリティの高い構造物の出力を見かけたことがあるので、そういったアプローチなら現時点でも図面作成していけるのかもしれません。",
        "created_at": "Tue May 13 12:43:10 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:10+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@Ne9QsqEqRY6446 いえ、僕がAutoCAD+Lispに限ってしか話せないので、それについては苦戦してるという感じです。\n\nSVGや他CAD(free cad)、python出力などでクオリティの高い構造物の出力を見かけたことがあるので、そういったアプローチなら現時点でも図面作成していけるのかもしれません。"
    },
    {
        "id": "1922271357368164586",
        "user": "TheFlipper🔅(Ø,G) KGEN",
        "text": "Build on @pwrlabs Chain with flexibility - use your preferred programming language, whether it's Python, Java, or more.\"\n\nValidator nodes are accessible and affordable - run them on low-cost cloud machines ($5-6/month) or compact devices like Raspberry Pi.\"",
        "created_at": "Tue May 13 12:43:00 +0000 2025",
        "created_at_datetime": "2025-05-13T12:43:00+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "Build on @pwrlabs Chain with flexibility - use your preferred programming language, whether it's Python, Java, or more.\"\n\nValidator nodes are accessible and affordable - run them on low-cost cloud machines ($5-6/month) or compact devices like Raspberry Pi.\""
    },
    {
        "id": "1922271347318677632",
        "user": "HR Balthazar",
        "text": "@LayTXT Laysa, compensa migrar pra Linux, investir em python (ml/ia gen)?\n\nSou dev Java a um tempo considerável e tô querendo abrir mão de algumas coisas pra começar negócio próprio em algo mais futurista.",
        "created_at": "Tue May 13 12:42:57 +0000 2025",
        "created_at_datetime": "2025-05-13T12:42:57+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "@LayTXT Laysa, compensa migrar pra Linux, investir em python (ml/ia gen)?\n\nSou dev Java a um tempo considerável e tô querendo abrir mão de algumas coisas pra começar negócio próprio em algo mais futurista."
    },
    {
        "id": "1922271301038702648",
        "user": "Kanak",
        "text": "Starting coding\n- May to-do list\n1. CS50 - introduction to computer science \n2. CS50- introduction to programming with python\n3. python",
        "created_at": "Tue May 13 12:42:46 +0000 2025",
        "created_at_datetime": "2025-05-13T12:42:46+00:00",
        "media": [],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "Starting coding\n- May to-do list\n1. CS50 - introduction to computer science \n2. CS50- introduction to programming with python\n3. python"
    },
    {
        "id": "1922271271821205867",
        "user": "Kaizen || Commissioner",
        "text": "Open \n📣: Lf clients\nLf commissioner \n\nAffordable service \n\n- English write ups (reaction paper,  essays, speech among others)\n- Thesis/ Research \n-Chemistry\n-Statistics\n-Physics\n-Math,Calculus\n-Accounting \n-CAD,  Matlab,  Python https://t.co/fFTTHhrPH5",
        "created_at": "Tue May 13 12:42:39 +0000 2025",
        "created_at_datetime": "2025-05-13T12:42:39+00:00",
        "media": [
            {
                "large": {
                    "faces": []
                },
                "medium": {
                    "faces": []
                },
                "small": {
                    "faces": []
                },
                "orig": {
                    "faces": []
                }
            }
        ],
        "hashtags": [],
        "thumbnail_title": None,
        "thumbnail_url": None,
        "posts_urls": [],
        "full_text": "Open \n📣: Lf clients\nLf commissioner \n\nAffordable service \n\n- English write ups (reaction paper,  essays, speech among others)\n- Thesis/ Research \n-Chemistry\n-Statistics\n-Physics\n-Math,Calculus\n-Accounting \n-CAD,  Matlab,  Python https://t.co/fFTTHhrPH5"
    }
]

# Input schema
class TitlesInput(BaseModel):
    titles: List[str]

class TweetOut(BaseModel):
    user: str
    text: str
    created_at: str

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

    temporal_markers = {
    # Immediate/Real-Time Events (Expanded 2x)
    "now", "currently", "at the moment", "immediately", "as we speak",
    "right now", "today", "just now", "this instant", "momentarily",
    "ongoing", "underway", "in progress", "breaking", "happening now",
    "live", "real-time", "ongoing situation", "right away", "on the ground",
    "this hour", "unfolding", "ongoing crisis", "still developing", "developing",
    "in real time", "emergency ongoing", "as it happens", "live update",
    "live footage", "urgent", "flash update", "instantaneous", "at present",
    "this very minute", "just begun", "actively occurring", "being reported now",
    "freshly detected", "this second", "right this moment", "hot off the press",
    "newly emerged", "just unfolding", "crisis in motion", "disaster unfolding",
    "catastrophe happening", "emergency unfolding", "breaking development",
    "rapidly unfolding", "just erupted", "just exploded", "just collapsed",
    "just broke out", "just hit", "just struck", "just triggered", "just activated",

    # Ongoing/Developing Events (Expanded 2x)
    "persisting", "continuous", "prolonged", "sustained", "not yet contained",
    "worsening", "intensifying", "escalating", "rapidly spreading", "out of control",
    "expanding", "raging", "unabated", "growing", "increasing", "still raging",
    "still burning", "still flooding", "still erupting", "still spreading",
    "continuing crisis", "prolonged emergency", "extended disaster", "unrelenting",
    "unceasing", "unending", "unchecked", "uncontrolled", "unmitigated",
    "uncontained", "unmanaged", "unresolved", "protracted", "lingering",
    "persistent", "chronic", "sustained crisis", "long-lasting", "multi-phase",
    "multi-stage", "second wave", "third wave", "renewed", "reignited",
    "re-escalating", "flaring up", "resurging", "re-emerging", "recurring",
    "cyclical", "widespread", "far-reaching", "expansive", "pervasive",
    }
    
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

@app.get("/twikit-x")
async def get_tweets(
    query: str = Query(..., description="Search term"),
    filter_type: str = Query("Latest", description="Filter type, e.g. Latest, Top")
):
    bot = create_default_bot()
    try:
        tweets = await bot.run(query, filter_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    result = []

    for t in tweets:
        # Safely extract media
        media_data = []
        if t.media:
            for item in t.media:
                if hasattr(item, "features"):
                    media_data.append(item.features)
                elif hasattr(item, "video_info"):
                    media_data.append(item.video_info)

        result.append({
            "id": t.id,
            "user": t.user.name,
            "text": t.text,
            "created_at": str(t.created_at),
            "created_at_datetime": t.created_at_datetime.isoformat() if t.created_at_datetime else None,
            "media": media_data,
            "hashtags": t.hashtags,
            "thumbnail_title": t.thumbnail_title,
            "thumbnail_url": t.thumbnail_url,
            "posts_urls": t.urls,
            "full_text": t.full_text,
        })

    return result