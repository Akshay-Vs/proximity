from llama_cpp import Llama
from llama_cpp_agent import LlamaCppAgent, MessagesFormatterType
from llama_cpp_agent.providers import LlamaCppPythonProvider

sys_prompt = """
Task: Create a concise, accurate, and engaging summary of a web-scraped article, ensuring clarity, relevance, and SEO optimization.

Requirements:
    1. Summary Length: Must be between 250 and 300 characters, providing a clear overview of the article's main points.
    2. Error-Free Writing: Ensure the summary is free of spelling, grammatical, and punctuation errors, maintaining a professional tone.
    3. Key Takeaways: Highlight the most critical information, avoiding unnecessary details.
    4. Neutral Tone: Write in a neutral tone, avoiding bias, opinion, or emotional language.
    5. SEO Optimization: Include relevant keywords and phrases to facilitate search engine optimization.
    6. Tags: Provide an array of 1-3 concise, descriptive, and relevant tags to categorize the article, facilitating easy discovery and filtering.

Critical Format Requirement:
    Your response MUST be a single, self-contained JSON object, **DO NOT** include any additional text, comments, or multiple JSON objects in the response. other format will break the system and be rejected.

Example Input:

{
  "title": "<title>",
  "content": "<content>"
}

Example Output:

{
  "title": "SEO-friendly headline of the article",
  "summary": "Summary of the article",
  "tags": ["tag1", "tag2", "tag3"]
}"""


class LLM:
    def __init__(
        self,
        model_path,
        temperature=0.7,
        max_tokens=512,
        context_window=2048,
        n_gpu_layers=0,
        n_batch=1,
    ):

        # Initialize Llama model
        self.llm = Llama(
            model_path=model_path,
            n_gpu_layers=n_gpu_layers,
            n_batch=n_batch,
            n_ctx=context_window,
        )

        # Initialize provider
        self.provider = LlamaCppPythonProvider(self.llm)

        # Configure provider settings
        self.settings = self.provider.get_provider_default_settings()
        self.settings.temperature = temperature
        self.settings.max_tokens = max_tokens
        self.settings.stream = True  # Enable streaming

        # Initialize the agent
        self.agent = LlamaCppAgent(
            self.provider,
            system_prompt=sys_prompt,
            predefined_messages_formatter_type=MessagesFormatterType.LLAMA_3,
            # debug_output=False,
            chat_history=None,
        )

    async def generate_response(self, prompt):
        """
        Generate a response using the LlamaCppAgent and return complete response.
        :param prompt: The user query or prompt string.
        :return: The complete response string.
        """
        print(f"Generating response...")

        try:
            # Store the system prompt
            system_prompt = self.agent.system_prompt

            # Get response
            response = self.agent.get_chat_response(
                prompt,
                returns_streaming_generator=False,  # Disable streaming
                llm_sampling_settings=self.settings,
            )

            return response

        except Exception as e:
            print(f"Error generating response: {e}")
            return ""

        finally:
            # After generating the full response, reset the context
            self.agent.chat_history = self.agent.chat_history.__class__()
            # Add back the system prompt
            self.agent.add_message(role="system", message=system_prompt)
