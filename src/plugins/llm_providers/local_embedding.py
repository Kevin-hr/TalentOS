"""
Local Embedding Provider / 本地嵌入模型提供商

Uses sentence-transformers to run embedding models locally.
Optimized for China usage (using mirror for downloads).
"""

import os
from typing import List
from src.interfaces.illm_provider import ILLMProvider, LLMResponse
from src.core.exceptions import LLMAPIError

# Set HF mirror for China
os.environ["HF_ENDPOINT"] = "https://hf-mirror.com"

class LocalEmbeddingProvider(ILLMProvider):
    """
    Local embedding provider using SentenceTransformers.
    Wrapper to fit ILLMProvider interface, though only embed() is implemented.
    """
    
    PROVIDER_NAME = "local_embedding"
    # SOTA small model for Chinese, works well for English too
    DEFAULT_MODEL = "BAAI/bge-small-zh-v1.5" 

    def __init__(self, model_name: str = None, **kwargs):
        """
        Initialize local embedding model.
        
        Args:
            model_name: HuggingFace model ID
        """
        self.model_name = model_name or self.DEFAULT_MODEL
        self._model = None
        self._load_model()

    def _load_model(self):
        """Lazy load the model."""
        try:
            from sentence_transformers import SentenceTransformer
            print(f"Loading local embedding model: {self.model_name}...")
            self._model = SentenceTransformer(self.model_name)
            print("Model loaded successfully.")
        except Exception as e:
            print(f"Failed to load local embedding model: {e}")
            self._model = None

    @property
    def provider_name(self) -> str:
        return self.PROVIDER_NAME

    @property
    def supported_models(self) -> list:
        return [self.model_name]

    def chat(self, messages: list, **kwargs) -> LLMResponse:
        raise NotImplementedError("LocalEmbeddingProvider only supports embedding, not chat.")

    def chat_stream(self, messages: list, **kwargs):
        raise NotImplementedError("LocalEmbeddingProvider only supports embedding, not chat.")

    def embed(self, text: str) -> List[float]:
        """
        Generate embedding for text.
        """
        if not self._model:
            # Try reloading
            self._load_model()
            if not self._model:
                raise LLMAPIError("Local embedding model not loaded.")

        try:
            # sentence-transformers returns numpy array, convert to list
            embedding = self._model.encode(text, normalize_embeddings=True)
            return embedding.tolist()
        except Exception as e:
            raise LLMAPIError(f"Embedding generation failed: {e}")

    def is_available(self) -> bool:
        return self._model is not None

    def health_check(self) -> bool:
        try:
            self.embed("test")
            return True
        except Exception:
            return False
