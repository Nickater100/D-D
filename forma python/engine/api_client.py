import requests
import json
import os

BASE_URL = "https://www.dnd5eapi.co/api/"
CACHE_DIR = "data/cache/"

class DNDApiClient:
    def __init__(self):
        if not os.path.exists(CACHE_DIR):
            os.makedirs(CACHE_DIR)

    def get_resource(self, resource_type, index):
        """
        Fetches a resource (e.g., 'spells', 'monsters') by index.
        Uses local cache if available.
        """
        cache_file = os.path.join(CACHE_DIR, f"{resource_type}_{index}.json")
        
        # Check cache
        if os.path.exists(cache_file):
            with open(cache_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        
        # Fetch from API
        url = f"{BASE_URL}{resource_type}/{index}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            
            # Save to cache
            with open(cache_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            
            return data
        except Exception as e:
            print(f"Error fetching {resource_type}/{index}: {e}")
            return None

    def search_resources(self, resource_type, name_query=""):
        """
        Lists all resources of a type and optionally filters by name locally.
        """
        # Note: In a real app, we might want to cache the full list too.
        url = f"{BASE_URL}{resource_type}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            all_list = response.json().get('results', [])
            
            if name_query:
                return [item for item in all_list if name_query.lower() in item['name'].lower()]
            return all_list
        except Exception as e:
            print(f"Error listing {resource_type}: {e}")
            return []

# Singleton instance
api_client = DNDApiClient()
