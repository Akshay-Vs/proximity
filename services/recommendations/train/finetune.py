# Will be used to fine-tune the model on the user's data
# Data will be in the form of a list of dictionaries
# Each dictionary will have the following
# NewsID: int
# NewsTitle: str
# NewsTLDR: str
# ReadingTime: int
# Liked: bool
# Data will be determined later
Data = []

#Hyperparameters

# Number of news articles
# This will be used to set the number of labels in the model
# The model will output a probability distribution over these labels
# The label with the highest probability will be the recommended news article
# The value will be determined later
numNews = None

# pip install transformers

from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from torch.nn.functional import softmax

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
# Load pre-trained BERT model for sequence classification
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=numNews)

prompt = ""

for idx, newsData in enumerate(Data[:-1]):
  prompt_template = """
---

  NewsID: {NewsID}
  NewsTitle: {NewsTitle}
  NewsTLDR: {NewsTLDR}
  ReadingTime: {ReadingTime}
  Liked: {Liked}
  """

  prompt += prompt_template.format(**newsData)

  inputs = tokenizer(prompt, padding=True, truncation=True, return_tensors="pt")
  outputs = model(**inputs)
  predictions = outputs.logits

#   The model will output a probability distribution over the labels
#   The label with the highest probability will be the recommended news article
#   The value will be determined later
  print(softmax(predictions))