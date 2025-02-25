from .llm import LLM


def load_llm(model_path):
    return LLM(
        model_path=model_path,
        temperature=0.3,
        max_tokens=512,
        context_window=4096,  # Reduced for better performance
        n_gpu_layers=-1,
        n_batch=512,
    )
