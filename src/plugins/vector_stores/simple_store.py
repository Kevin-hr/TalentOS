import os
import json
import numpy as np
from typing import List, Dict, Any, Optional
from src.interfaces.ivector_store import IVectorStore, VectorDocument, SearchResult

class SimpleVectorStore(IVectorStore):
    """
    A simple, local, file-based vector store using JSON and Numpy.
    Suitable for small datasets (< 10,000 documents).
    """
    
    def __init__(self, storage_path: str = "data/vector_store.json"):
        self.storage_path = storage_path
        self.documents: Dict[str, VectorDocument] = {}
        self.embeddings: Dict[str, np.ndarray] = {}
        self._load()

    def _load(self):
        if os.path.exists(self.storage_path):
            try:
                with open(self.storage_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for doc_data in data:
                        doc = VectorDocument(
                            id=doc_data['id'],
                            content=doc_data['content'],
                            metadata=doc_data['metadata'],
                            embedding=doc_data.get('embedding')
                        )
                        self.documents[doc.id] = doc
                        if doc.embedding:
                            self.embeddings[doc.id] = np.array(doc.embedding)
            except Exception as e:
                print(f"Error loading vector store: {e}")

    def add_documents(self, documents: List[VectorDocument]) -> bool:
        for doc in documents:
            self.documents[doc.id] = doc
            if doc.embedding:
                self.embeddings[doc.id] = np.array(doc.embedding)
        return self.persist()

    def search(self, query_embedding: List[float], limit: int = 5) -> List[SearchResult]:
        if not self.embeddings:
            return []
            
        query_vec = np.array(query_embedding)
        scores = []
        
        # Calculate cosine similarity
        # Cosine Sim = (A . B) / (||A|| * ||B||)
        norm_q = np.linalg.norm(query_vec)
        if norm_q == 0:
            return []
            
        for doc_id, doc_vec in self.embeddings.items():
            norm_d = np.linalg.norm(doc_vec)
            if norm_d == 0:
                score = 0.0
            else:
                score = np.dot(query_vec, doc_vec) / (norm_q * norm_d)
            
            scores.append((doc_id, score))
            
        # Sort by score descending
        scores.sort(key=lambda x: x[1], reverse=True)
        
        # Return top N
        results = []
        for doc_id, score in scores[:limit]:
            results.append(SearchResult(
                document=self.documents[doc_id],
                score=float(score)
            ))
            
        return results

    def delete(self, document_id: str) -> bool:
        if document_id in self.documents:
            del self.documents[document_id]
        if document_id in self.embeddings:
            del self.embeddings[document_id]
        return self.persist()

    def persist(self) -> bool:
        data = []
        for doc in self.documents.values():
            data.append({
                'id': doc.id,
                'content': doc.content,
                'metadata': doc.metadata,
                'embedding': doc.embedding # List[float]
            })
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
        
        try:
            with open(self.storage_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"Error saving vector store: {e}")
            return False
