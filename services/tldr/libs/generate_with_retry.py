from typing import Any, Optional
from jsonschema import Draft7Validator
import json
import logging

from schema.output_schema import output_schema
from errors.validation_error import ValidationError
from errors.invalid_json_error import InvalidJSONError

# Constants
MAX_DEFAULT_RETRIES = 3
ERROR_TEMPLATE = """
Error: Invalid JSON Response

We Couldn't generate a summary because the response wasn't in the correct JSON format. To fix this, please make sure your response exactly matches the expected format below:

Expected JSON format:
{
  "title": "SEO-friendly headline of the article",
  "summary": "Summary of the article",
  "tags": ["tag1", "tag2", "tag3"]
}

Critical Format Requirement:
    Your response MUST be a single, self-contained JSON object, **DO NOT** include any additional text, comments, or multiple JSON objects in the response. other format will break the system and be rejected.


Article to Summarize:
"""

logger = logging.getLogger(__name__)


async def validate_response(response: dict) -> None:
    """Validate the response against the schema."""
    output_validator = Draft7Validator(output_schema)
    validation_errors = list(output_validator.iter_errors(response))

    if validation_errors:
        logger.error(f"Validation errors: {validation_errors}")
        raise ValidationError(json.dumps(validation_errors))


async def parse_response(chunks: list[str]) -> dict:
    """Parse the response chunks into JSON."""
    try:
        full_response = json.loads("".join(chunks))
        logger.info("Response parsed successfully")
        return full_response
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing JSON: {e}")
        print("chunks: ", "".join(chunks))
        raise InvalidJSONError("Invalid JSON format") from e


async def generate_with_retry(
    model: Any,
    prompt: str,
    max_retries: int = MAX_DEFAULT_RETRIES,
    current_attempt: int = 0,
) -> Optional[dict]:
    """
    Asynchronously generates a response using the provided model and retries if validation errors occur.

    Args:
        model: The model used to generate the response.
        prompt: The input prompt for the model.
        max_retries: The maximum number of retries allowed.
        current_attempt: The current retry count.

    Returns:
        The generated response if successful, or None if the maximum number of retries is reached.

    Raises:
        Exception: If an error occurs during the generation process.
    """

    if current_attempt > max_retries:
        logger.warning(f"Max retries reached ({max_retries})")
        return None

    try:
        logger.info(
            f"Generating response (attempt {current_attempt + 1}/{max_retries + 1})..."
        )

        # Get complete response
        response_text = await model.generate_response("Article to Summarize: " + prompt)

        if isinstance(response_text, bytes):
            response_text = response_text.decode("utf-8")

        logger.info(f"Raw response: {response_text}")

        # Parse and validate response
        response = await parse_response([response_text])
        await validate_response(response)

        logger.info("Response validation successful")
        return response

    except (InvalidJSONError, ValidationError) as e:
        logger.error(f"Error generating response: {e}")
        print(f"Retrying ({current_attempt + 1}/{max_retries})...")

        error_prompt = ERROR_TEMPLATE + prompt
        print(error_prompt)

        return await generate_with_retry(
            model, error_prompt, max_retries, current_attempt + 1
        )

    except Exception as e:
        logger.error(f"Error generating response: {e}")
        raise e
