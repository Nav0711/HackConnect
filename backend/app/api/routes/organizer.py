from fastapi import APIRouter, HTTPException
from app.services.appwrite import get_db_service
from app.core.config import settings
from appwrite.query import Query
from appwrite.id import ID
from pydantic import BaseModel
import asyncio
from datetime import datetime

router = APIRouter()

# --- MODELS ---
class AnnouncementCreate(BaseModel):
    title: str
    message: str
    type: str = "info"  # info, warning, success

# --- 1. DASHBOARD ANALYTICS (⚡ Parallel & Fast) ---
@router.get("/{hackathon_id}/stats", summary="Get Dashboard Analytics")
async def get_hackathon_stats(hackathon_id: str):
    """
    Optimization: Runs 4 counting queries simultaneously.
    """
    try:
        db = get_db_service()
        
        # Prepare 4 parallel queries
        queries = [
            # 1. Total Registrants
            asyncio.to_thread(
                db.list_documents,
                database_id=settings.APPWRITE_DATABASE_ID,
                collection_id=settings.COLLECTION_USERS, 
                queries=[Query.limit(1)]
            ),
            # 2. Teams Formed
            asyncio.to_thread(
                db.list_documents,
                database_id=settings.APPWRITE_DATABASE_ID,
                collection_id=settings.COLLECTION_TEAMS,
                queries=[Query.equal('hackathon_id', hackathon_id), Query.limit(1)]
            ),
            # 3. Submissions Received
            asyncio.to_thread(
                db.list_documents,
                database_id=settings.APPWRITE_DATABASE_ID,
                collection_id=settings.COLLECTION_SUBMISSIONS,
                queries=[Query.equal('hackathon_id', hackathon_id), Query.limit(1)]
            ),
            # 4. Looking for Team (Placeholder logic)
            asyncio.to_thread(
                db.list_documents,
                database_id=settings.APPWRITE_DATABASE_ID,
                collection_id=settings.COLLECTION_USERS,
                queries=[Query.limit(1)] 
            )
        ]

        # Execute all at once
        results = await asyncio.gather(*queries, return_exceptions=True)
        
        # Safely extract totals
        stats = []
        for res in results:
            if isinstance(res, Exception):
                stats.append(0)
            else:
                stats.append(res['total'])

        return {
            "success": True,
            "total_registrants": stats[0],
            "teams_formed": stats[1],
            "submissions_received": stats[2],
            "looking_for_team": stats[3]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --- 2. BROADCAST ANNOUNCEMENT ---
@router.post("/{hackathon_id}/announce", summary="Broadcast to Participants")
async def create_announcement(hackathon_id: str, data: AnnouncementCreate):
    try:
        db = get_db_service()
        
        result = await asyncio.to_thread(
            db.create_document,
            database_id=settings.APPWRITE_DATABASE_ID,
            collection_id=settings.COLLECTION_ANNOUNCEMENTS, 
            document_id=ID.unique(),
            data={
                "hackathon_id": hackathon_id,
                "title": data.title,
                "message": data.message,
                "type": data.type,
                "timestamp": datetime.now().isoformat()
            }
        )
        
        return {"success": True, "message": "Announcement broadcasted"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))