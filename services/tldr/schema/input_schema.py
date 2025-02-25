from jsonschema import validate

input_schema = {
    "type": "object",
    "properties": {
        "headline": {"type": "string"},
        "article_text": {"type": "string"},
    },
    "required": ["headline", "article_text"],
}
