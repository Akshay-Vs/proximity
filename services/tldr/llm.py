from llama_cpp import Llama
from llama_cpp_agent import LlamaCppAgent, MessagesFormatterType
from llama_cpp_agent.providers import LlamaCppPythonProvider
import subprocess


class LLM:
    def __init__(
        self,
        model_path,
        temperature=0.7,
        max_tokens=512,
        context_window=2048,
        n_gpu_layers=0,
        n_batch=1,
        system_prompt="You are a helpful assistant.",
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
        self.settings.stream = True

        # Initialize the agent
        self.agent = LlamaCppAgent(
            self.provider,
            system_prompt=system_prompt,
            predefined_messages_formatter_type=MessagesFormatterType.LLAMA_3,
            debug_output=False,
        )

        # System prompt for the agent
        self.system_prompt = system_prompt

        # Check and configure CUDA
        self._setup_cuda()

        # Print the model information
        print(f"Model: {self.llm.model_path}")
        print(f"Context Window: {self.llm.n_ctx}")
        print(f"Max Tokens: {self.llm.n_batch}")
        print(f"Temperature: {self.settings.temperature}")
        print(f"Max Tokens: {self.settings.max_tokens}")
        print(f"System Prompt: {self.system_prompt}")
        print(f"Provider: {self.provider}")
        print(f"Agent: {self.agent}")
        print(f"Settings: {self.settings}")
        print(f"LLM: {self.llm}")

    def _setup_cuda(self):
        try:
            subprocess.run(
                ["CMAKE_ARGS=-DGGML_CUDA=on"], shell=True, check=True
            )
            print("CUDA is installed and configured.")
        except subprocess.CalledProcessError:
            print("Error configuring CUDA. Ensure CUDA is installed properly.")

    def generate_response(self, prompt):
        """
        Generate a response using the LlamaCppAgent.
        :param prompt: The user query or prompt string.
        :return: A streaming generator of responses.
        """
        print(f"Generating response...")
        return self.agent.get_chat_response(
            prompt, returns_streaming_generator=True, print_output=False, llm_sampling_settings=self.settings,
        )

    def format_response(self, response):
        """
        Format the streaming response into a single string.
        :param response: The streaming response from the agent.
        :return: A formatted string combining all message content.
        """
        print(f"Formatting response...")
        result = ""

        for chunk in response:
            result += chunk
            print(chunk, end="")

        return result
