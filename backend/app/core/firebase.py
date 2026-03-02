import firebase_admin
from firebase_admin import credentials, auth, firestore
from app.core.config import settings
from app.core.logging import logger
import os
import json

def initialize_firebase():
    """
    Initializes the Firebase Admin SDK securely.
    Ensures it only initializes once during the application lifecycle.
    """
    if not firebase_admin._apps:
        try:
            # Check if the service account file exists
            cred_path = settings.FIREBASE_CREDENTIALS_PATH
            if os.path.exists(cred_path):
                logger.info("Initializing Firebase Admin SDK using local service account JSON.")
                cred = credentials.Certificate(cred_path)
            else:
                # If running in production (e.g., Google Cloud), fallback to Application Default Credentials
                logger.info("Service account JSON not found. Falling back to Application Default Credentials.")
                cred = credentials.ApplicationDefault()
            
            # Initialize with the project ID from env
            firebase_admin.initialize_app(cred, {
                'projectId': settings.FIREBASE_PROJECT_ID,
                'storageBucket': settings.FIREBASE_STORAGE_BUCKET,
            })
            
            logger.info("Firebase Admin SDK successfully initialized.")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase Admin SDK: {e}")
            raise RuntimeError("Database configuration failed. Zero Trust halt.")

# Run initialization upon module import
initialize_firebase()

# Export explicitly typed Firebase service clients for use across the application
db = firestore.client()
firebase_auth = auth
