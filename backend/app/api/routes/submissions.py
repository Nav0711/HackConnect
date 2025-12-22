from fastapi import APIRouter, HTTPException
from typing import List
from app.services.appwrite import get_db_service
from app.core.config import settings
from app.models.submission import SubmissionCreate
from appwrite.id import ID
from appwrite.query import Query
from fastapi.encoders import jsonable_encoder
import asyncio

router = APIRouter()

# --- 1. CREATE SUBMISSION ---
@router.post("/", summary="Submit Final Project")
async def create_submission(submission: SubmissionCreate):
    try:
        db = get_db_service()
        
        # Prepare data for Appwrite
        data = jsonable_encoder(submission)
        
        # Async write to database
        result = await asyncio.to_thread(
            db.create_document,
            database_id=settings.APPWRITE_DATABASE_ID,
            collection_id=settings.COLLECTION_SUBMISSIONS,
            document_id=ID.unique(),
            data=data
        )
        
        return {"success": True, "message": "Project submitted successfully", "data": result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --- 2. GET SUBMISSIONS (Optimized with Team Names) ---
@router.get("/{hackathon_id}", summary="Get All Submissions for a Hackathon")
async def get_hackathon_submissions(hackathon_id: str):
    """
    Optimization: Fetches submissions AND team details efficiently.
    Prevents the frontend from showing 'Team ID: 123' -> Shows 'Team Name: CodeWizards'
    """
    try:
        db = get_db_service()
        
        # A. Fetch Submissions
        submissions_result = await asyncio.to_thread(
            db.list_documents,
            database_id=settings.APPWRITE_DATABASE_ID,
            collection_id=settings.COLLECTION_SUBMISSIONS,
            queries=[
                Query.equal('hackathon_id', hackathon_id),
                Query.order_desc('$createdAt')
            ]
        )
        
        submissions = submissions_result['documents']
        
        if not submissions:
            return {"success": True, "submissions": []}

        # B. Batch Fetch Teams (The "Enrichment" Step)
        # Extract all unique team IDs from the submissions
        team_ids = list(set(sub['team_id'] for sub in submissions))
        
        if team_ids:
            # Fetch all related teams in ONE query (Database Optimization)
            teams_result = await asyncio.to_thread(
                db.list_documents,
                database_id=settings.APPWRITE_DATABASE_ID,
                collection_id=settings.COLLECTION_TEAMS,
                queries=[
                    Query.equal('$id', team_ids),
                    Query.select(['$id', 'name']) # Fetch only names to save bandwidth
                ]
            )
            
            # Create a lookup map: {'team_id_1': 'Team Alpha', ...}
            team_map = {t['$id']: t['name'] for t in teams_result['documents']}
            
            # C. Merge Data
            for sub in submissions:
                sub['team_name'] = team_map.get(sub['team_id'], "Unknown Team")
        
        return {"success": True, "submissions": submissions}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))