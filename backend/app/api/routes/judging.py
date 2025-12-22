from fastapi import APIRouter, HTTPException
from app.services.appwrite import get_db_service
from app.core.config import settings
from pydantic import BaseModel
from appwrite.id import ID
import asyncio

router = APIRouter()

class ScoreSubmit(BaseModel):
    submission_id: str
    judge_id: str
    technical_score: int
    design_score: int
    utility_score: int
    comment: str = ""

# --- SUBMIT SCORE ---
@router.post("/score", summary="Submit Judging Score")
async def submit_score(score: ScoreSubmit):
    try:
        db = get_db_service()
        
        # Calculate total automatically
        total = score.technical_score + score.design_score + score.utility_score
        
        result = await asyncio.to_thread(
            db.create_document,
            database_id=settings.APPWRITE_DATABASE_ID,
            collection_id=settings.COLLECTION_SCORES, 
            document_id=ID.unique(),
            data={
                "submission_id": score.submission_id,
                "judge_id": score.judge_id,
                "technical": score.technical_score,
                "design": score.design_score,
                "utility": score.utility_score,
                "total": total,
                "comment": score.comment
            }
        )
        
        return {"success": True, "message": "Score submitted", "total": total}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))