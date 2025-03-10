from jsonschema import validate

input_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "content": {"type": "string"},
        "imageUrl": {"type": "string"},
        "date": {"type": "string"},
        "scrapedAt": {"type": "string"},
        "sourceName": {"type": "string"},
        "sourceUrl": {"type": "string"},
    },
    "required": ["title", "content"],
}
