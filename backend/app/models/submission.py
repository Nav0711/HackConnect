from pydantic import BaseModel, Field
from typing import List, Optional

class SubmissionCreate(BaseModel):
    hackathon_id: str
    team_id: str
    project_title: str
    description: str
    repo_links: List[str] = []
    demo_video_url: str

class SubmissionResponse(BaseModel):
    
    id: str
    hackathon_id: str
    team_id: str
    project_title: str
    description: str
    repo_links: List[str]
    demo_video_url: str
    created_at: str
    # Enriched Data (Optional)
    team_name: Optional[str] = None