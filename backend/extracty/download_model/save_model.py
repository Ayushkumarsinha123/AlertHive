from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os

# Define models and target directories
models_to_save = {
    "garynguyen1174/disaster_tweet_bert": "custom_model/disaster_model",
    "mrm8488/bert-tiny-finetuned-fake-news-detection": "custom_model/fake_news_model"
}

for model_name, local_dir in models_to_save.items():
    print(f"Downloading and saving model: {model_name} to {local_dir}")

    # Create target directory
    os.makedirs(local_dir, exist_ok=True)

    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)

    # Save to local directory
    tokenizer.save_pretrained(local_dir)
    model.save_pretrained(local_dir)

    print(f"✔️ Saved: {model_name} → {local_dir}\n")

print("✅ All models downloaded and saved.")
