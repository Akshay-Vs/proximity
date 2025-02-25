from llama_cpp import Llama
from llama_cpp_agent import LlamaCppAgent, MessagesFormatterType
from llama_cpp_agent.providers import LlamaCppPythonProvider

sys_prompt = """
Task: Generate a concise, informative, and engaging TL;DR news summary for a web-scraped article, ensuring accuracy, clarity, and relevance.

Requirements:

    The summary should be between 250 and 300 characters in length, providing a clear and concise overview of the article's main points.
    The summary should be free of spelling, grammatical, and punctuation errors, ensuring a professional tone.
    The summary should include the most critical information, highlighting the article's key takeaways, and avoiding unnecessary details.
    The summary should be written in a neutral tone, avoiding bias, opinion, or emotional language.
    The summary should include relevant keywords and phrases to facilitate search engine optimization (SEO).
    There should be an array of relevant tags that can be used to categorize the article, with a minimum of one tag and a maximum of three tags.
    Tags should be concise, descriptive, and relevant to the article's content, facilitating easy discovery, filtering, and  should not exceed 3 indexes.
    Only respond with valid JSON data in the following structure:

Example Input:

{
  "headline": "<headline>",
  "article_text": "<article_text>"
}

Example Output:

{
  "headline": "Breaking News: [Headline]",
  "summary": "Summary of the article in 250-300 characters, highlighting key takeaways and main points",
  "tags": ["tag1", "tag2", "tag3"]
}

Article to summarize:
"""


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
            debug_output=False,
        )

    async def generate_response(self, prompt):
        """
        Generate a response using the LlamaCppAgent.
        :param prompt: The user query or prompt string.
        :return: An asynchronous generator of responses.
        """
        print(f"Generating response...")

        response = self.agent.get_chat_response(
            prompt,
            returns_streaming_generator=True,
            llm_sampling_settings=self.settings,
        )

        for chunk in response:
            yield chunk  # Convert sync generator to async
