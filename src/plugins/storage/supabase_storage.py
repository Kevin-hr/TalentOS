"""
Supabase Storage Plugin / Supabase 存储插件

Implementation of IStorage using Supabase (PostgreSQL + PostgREST).
"""

import json
from typing import Dict, Optional, Any
from datetime import datetime, timedelta
from supabase import create_client, Client

from src.interfaces.istorage import IStorage, StorageItem
from src.core.exceptions import StorageError

class SupabaseStorage(IStorage):
    """
    Supabase-based storage implementation.
    Requires a 'storage_cache' table in Supabase:
    - key: text (primary key)
    - value: jsonb
    - expires_at: timestamp with time zone
    - created_at: timestamp with time zone
    - metadata: jsonb
    """

    def __init__(self, url: str, key: str, table_name: str = "storage_cache", **kwargs):
        """
        Initialize Supabase client.

        Args:
            url: Supabase project URL
            key: Supabase API key (anon or service_role)
            table_name: Table name for storage
        """
        if not url or not key:
            raise StorageError("Supabase URL and Key are required.")
        
        try:
            self._client: Client = create_client(url, key)
            self._table_name = table_name
        except Exception as e:
            raise StorageError(f"Failed to initialize Supabase client: {e}")

    @property
    def storage_name(self) -> str:
        return "supabase"

    def save(self, key: str, value: Any, ttl: Optional[int] = None, metadata: Optional[Dict] = None) -> bool:
        """Save a value to Supabase."""
        expires_at = None
        if ttl:
            expires_at = (datetime.now() + timedelta(seconds=ttl)).isoformat()
        
        data = {
            "key": key,
            "value": value,
            "expires_at": expires_at,
            "created_at": datetime.now().isoformat(),
            "metadata": metadata or {}
        }

        try:
            # upsert: insert or update if key exists
            self._client.table(self._table_name).upsert(data).execute()
            return True
        except Exception as e:
            print(f"Supabase Save Error: {e}")
            return False

    def load(self, key: str) -> Optional[Any]:
        """Load a value from Supabase, checking for expiration."""
        try:
            response = self._client.table(self._table_name).select("*").eq("key", key).execute()
            if not response.data:
                return None
            
            item_data = response.data[0]
            expires_at = item_data.get("expires_at")
            
            if expires_at:
                expires_dt = datetime.fromisoformat(expires_at.replace('Z', '+00:00'))
                if datetime.now().astimezone() > expires_dt:
                    self.delete(key)
                    return None
            
            return item_data.get("value")
        except Exception as e:
            print(f"Supabase Load Error: {e}")
            return None

    def delete(self, key: str) -> bool:
        """Delete a key from Supabase."""
        try:
            self._client.table(self._table_name).delete().eq("key", key).execute()
            return True
        except Exception as e:
            print(f"Supabase Delete Error: {e}")
            return False

    def exists(self, key: str) -> bool:
        """Check if key exists and is not expired."""
        return self.load(key) is not None

    def clear(self) -> bool:
        """Clear all data in the storage table."""
        try:
            # Note: This requires a filter in Supabase client to allow delete all, 
            # or just filter for non-null key.
            self._client.table(self._table_name).delete().neq("key", "").execute()
            return True
        except Exception as e:
            print(f"Supabase Clear Error: {e}")
            return False
