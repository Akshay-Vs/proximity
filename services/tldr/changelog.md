## version=1.0.0

**Initial Release**

- Introduced the TLDR Library class
- Llama 3.2-1B Instruct to generate the TLDR
- Exposed generate api route

## version=1.1.0

**Quality Improvements**

- TLDR Library

  - Updated `generate_response` method to be asynchronous, yielding chunks for streaming output.
  - Simplified the system prompt into a global variable (`sys_prompt`) for easier management.
  - Removed unnecessary CUDA setup as it's not essential to the current implementation.
  - Cleaned up initialization and removed redundant debug prints to improve readability.

- FastAPI

  - Moved LLM model initialization to a background startup event to avoid blocking API requests.
  - Added streaming support for response generation to enhance performance with large outputs.
  - Reduced model parameters for better performance: reduced context window and batch size.
  - Improved error handling and response formatting for more consistent error messages.

## version=1.1.1

**Reliability Improvements**

- Improved sys prompt to be more concise and focused on the task.
- Added a new prompt template for the LLM to improve the quality of the generated TLDR.
- Add schema validation for the input and output data to ensure it meets the required format.
- Add retry mechanism for LLM calls to handle transient errors.
- Added a new endpoint to check the health of the service.
- Improved error handling and logging for better debugging and monitoring.
- Improved project structure and organization for better maintainability.
