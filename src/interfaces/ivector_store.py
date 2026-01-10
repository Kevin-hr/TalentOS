"""
IVectorStore Interface / 向量存储接口

Abstract base class for vector store plugins.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from dataclasses import dataclass

@dataclass
class VectorDocument:
    """Document to be stored in vector database."""
    id: str
    content: str
    metadata: Dict[str, Any]
    embedding: Optional[List[float]] = None

@dataclass
class SearchResult:
    """Result of a semantic search."""
    document: VectorDocument
    score: float

class IVectorStore(ABC):
    """
    Abstract base class for Vector Stores.
    
    All Vector Store plugins must implement these methods:
    - add_documents(): Add documents to the store
    - search(): Search for similar documents
    - delete(): Delete a document
    - persist(): Save to disk (if applicable)
    """

    @abstractmethod
    def add_documents(self, documents: List[VectorDocument]) -> bool:
        """
        Add documents to the vector store.
        
        Args:
            documents: List of VectorDocument objects
            
        Returns:
            bool: True if successful
        """
        pass

    @abstractmethod
    def search(self, query_embedding: List[float], limit: int = 5) -> List[SearchResult]:
        """
        Search for similar documents using a query embedding.
        
        Args:
            query_embedding: The embedding vector of the query
            limit: Maximum number of results to return
            
        Returns:
            List of SearchResult objects
        """
        pass
        
    @abstractmethod
    def delete(self, document_id: str) -> bool:
        """
        Delete a document by ID.
        
        Args:
            document_id: The ID of the document to delete
            
        Returns:
            bool: True if successful
        """
        pass

    @abstractmethod
    def persist(self) -> bool:
        """
        Persist the store to disk (if applicable).
        """
        pass
