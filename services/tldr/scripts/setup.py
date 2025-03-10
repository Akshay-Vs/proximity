import os
import sys
import subprocess

# Install Hugging Face CLI if it's not installed
subprocess.check_call([sys.executable, "-m", "pip", "install", "huggingface_hub[cli]"])

# make models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# Download the model using Hugging Face CLI
model_name = "bartowski/Llama-3.2-1B-Instruct-GGUF"
model_file = "Llama-3.2-1B-Instruct-Q4_K_M.gguf"
download_dir = "./models"

subprocess.run(
    [
        "huggingface-cli",
        "download",
        model_name,
        "--include",
        model_file,
        "--local-dir",
        download_dir,
    ]
)

print("Setup completed successfully.")
