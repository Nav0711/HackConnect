from fastapi import APIRouter, HTTPException
from app.services.appwrite import get_db_service
from app.core.config import settings
from app.models.user import UserLogin
from fastapi.encoders import jsonable_encoder

router = APIRouter()

@router.post("/login", summary="Sync User after Login")
def login_sync(user: UserLogin):
    """
    Syncs the logged-in user to the 'Users' Database Collection.
    """
    try:
        db = get_db_service()
        
        # 1. Prepare Data for Appwrite
        # We only send fields that actually exist in your Database Schema
        data_to_save = {
            "username": user.username,
            "account_id": user.account_id,
            "bio": user.bio or "",
            "avatar_url": user.avatar_url,
            "github_url": user.github_url,
            "skills": user.skills,
            "xp": user.xp,
            "reputation_score": user.reputation_score
        }

        # Remove None values so Appwrite uses defaults
        data_to_save = {k: v for k, v in data_to_save.items() if v is not None}

        # 2. Try to Save
        try:
            # We use the User's Auth ID as the Document ID ($id)
            # This makes it easy to find them later!
            db.create_row(
                database_id=settings.APPWRITE_DATABASE_ID,
                table_id=settings.COLLECTION_USERS,
                row_id=user.id, 
                data=data_to_save
            )
            return {"success": True, "message": "User profile created", "user": data_to_save}
            
        except Exception as e:
            # If they already exist (409 Conflict), that is fine!
            if "409" in str(e):
                return {"success": True, "message": "User already synced"}
            else:
                print(f"❌ Appwrite Save Error: {e}")
                raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))