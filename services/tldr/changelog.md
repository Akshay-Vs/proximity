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
