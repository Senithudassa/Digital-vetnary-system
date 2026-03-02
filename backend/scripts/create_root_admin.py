import sys
import os

# Ensure we can import the FastAPI app's modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.firebase import firebase_auth
from app.core.logging import logger

def make_root_admin(email: str):
    """
    ONE-TIME SETUP SCRIPT:
    Grants 'main_admin' privileges to a specific Firebase user by email.
    
    Usage:
    python3 scripts/create_root_admin.py "your.email@example.com"
    """
    try:
        # Fetch the user from Firebase by email
        user = firebase_auth.get_user_by_email(email)
        
        # Assign the custom claim directly bypassing the API
        firebase_auth.set_custom_user_claims(user.uid, {"role": "main_admin"})
        
        print(f"\n[SUCCESS] Granted 'main_admin' role to: {user.email} (UID: {user.uid})")
        print("This user can now access the Main Admin Web Portal and the /api/v1/auth/assign-role endpoint.\n")
        
    except firebase_auth.UserNotFoundError:
        print(f"\n[ERROR] User with email '{email}' not found in Firebase.")
        print("Please sign up first on the frontend (/register or /login) before running this script.\n")
    except Exception as e:
        logger.error(f"Failed to assign root admin claim: {e}")
        print(f"\n[ERROR] An unexpected error occurred: {e}\n")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("\nUsage: python3 scripts/create_root_admin.py <email_address>\n")
        sys.exit(1)
        
    target_email = sys.argv[1]
    make_root_admin(target_email)
