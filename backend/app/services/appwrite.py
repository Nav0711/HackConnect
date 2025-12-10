from appwrite.client import Client
from appwrite.services.tables_db import TablesDB  # <--- MUST BE TablesDB
from app.core.config import settings

def get_appwrite_client():
    client = Client()
    client.set_endpoint(settings.APPWRITE_ENDPOINT)
    client.set_project(settings.APPWRITE_PROJECT_ID)
    client.set_key(settings.APPWRITE_API_KEY)
    return client

def get_db_service():
    client = get_appwrite_client()
    # This enables the new '.list_rows()' command
    return TablesDB(client)