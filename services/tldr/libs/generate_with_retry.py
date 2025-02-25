from jsonschema import Draft7Validator
from schema.output_schema import output_schema

import json


async def generate_with_retry(model, prompt, acc=0, max_retries=3):
    """
    Asynchronously generates a response using the provided model and retries if validation errors occur.

    Args:
        model: The model used to generate the response.
        prompt: The input prompt for the model.
        acc: The current retry count (default is 0).
        max_retries: The maximum number of retries allowed (default is 3).

    Returns:
        The generated response if successful, or None if the maximum number of retries is reached.

    Raises:
        Exception: If an error occurs during the generation process.
    """
    if acc > max_retries:
        # If the maximum number of retries is reached, return None
        print(f"Max retries reached {acc}. Returning None.")
        return None

    try:
        print(f"Generating response...")
        generated_response = []

        # stream the response
        async for chunk in model.generate_response(prompt).__aiter__():
            # Decode the chunk if it is in bytes
            if isinstance(chunk, bytes):
                chunk = chunk.decode("utf-8")
            generated_response.append(chunk)

        # Join all chunks into a single response
        full_response = json.loads("".join(generated_response))
        print(f"Response generated successfully", full_response)

        # Initialize the output validator
        output_validator = Draft7Validator(output_schema)

        # Validate the output
        validation_errors = list(output_validator.iter_errors(full_response))
        if validation_errors:
            print(f"Validation errors: {validation_errors}")
            # Create a more concise error prompt to avoid prompt explosion
            error_prompt = f"Validation error occurred. Please fix the following issues: {validation_errors}, Here is the failed json: {full_response}, Here is the full article: {prompt}"
            return await generate_with_retry(model, error_prompt, acc + 1, max_retries)

        print("Validation successful.")
        return full_response

    except Exception as e:
        print(f"Error generating response: {e}")
        if acc < max_retries:
            print(f"Retrying ({acc + 1}/{max_retries})...")
            return await generate_with_retry(model, prompt, acc + 1, max_retries)
        return None
