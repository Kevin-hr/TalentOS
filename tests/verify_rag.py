import sys
import os
import asyncio

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.core.engine import TalentOSEngine

def main():
    print("Initializing Engine...")
    try:
        engine = TalentOSEngine()
    except Exception as e:
        print(f"Failed to initialize engine: {e}")
        return

    # Monkeypatch embed for testing
    def mock_embed(text):
        # Deterministic dummy embedding based on text hash
        import hashlib
        import numpy as np
        hash_val = int(hashlib.md5(text.encode()).hexdigest(), 16)
        np.random.seed(hash_val % 2**32)
        return np.random.rand(1536).tolist()

    if engine._llm_provider:
        engine._llm_provider.embed = mock_embed
        print("Mocked embedding function injected for testing.")

    # check if vector store is enabled
    health = engine.health_check()
    if not health["vector_store"]["enabled"]:
        print("Vector store is NOT enabled.")
        return

    print("Vector store is enabled.")

    # 1. Index Documents
    print("\n--- Indexing Documents ---")
    
    candidates = [
        {
            "text": "Senior Python Developer with 5 years of experience in Django, FastAPI, and Machine Learning. Expert in RAG and Vector Databases.",
            "metadata": {"name": "Alice", "role": "Python Dev"}
        },
        {
            "text": "Experienced Project Manager with PMP certification. Skilled in Agile, Scrum, and team leadership. Background in Marketing.",
            "metadata": {"name": "Bob", "role": "Project Manager"}
        },
        {
            "text": "Junior Java Developer. Fresh graduate with knowledge of Spring Boot and SQL. Eager to learn.",
            "metadata": {"name": "Charlie", "role": "Java Dev"}
        }
    ]

    for c in candidates:
        print(f"Indexing {c['metadata']['name']}...")
        success = engine.index_resume(c["text"], metadata=c["metadata"])
        if success:
            print("  Success")
        else:
            print("  Failed")

    # 2. Search
    query = "looking for a python expert with ml experience"
    print(f"\n--- Searching for: '{query}' ---")
    
    results = engine.search_candidates(query, limit=2)
    
    for i, res in enumerate(results):
        print(f"{i+1}. {res['metadata']['name']} (Score: {res['score']:.4f})")
        print(f"   Preview: {res['preview']}")
        
    # Validation
    if results and results[0]['metadata']['name'] == 'Alice':
        print("\n[PASS] Search returned the correct candidate first.")
    else:
        print("\n[FAIL] Search did NOT return the expected candidate first.")

if __name__ == "__main__":
    main()
