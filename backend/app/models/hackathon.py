from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# 1. BASE: Shared properties (Things every hackathon has)
class HackathonBase(BaseModel):
    name: str
    description: str
    start_date: datetime
    end_date: datetime
    location: str
    tags: List[str]  # Example: ["AI", "Web3"]
    organizer_id: Optional[str] = None # Added organizer_id
    prize_pool: Optional[str] = None
    registration_link: Optional[str] = None
    image_url: Optional[str] = None    # New fields
    status: str = "draft"
    min_team_size: int = 1
    max_team_size: int = 4
    mode: str = "online"
    tagline: Optional[str] = None
# 2. CREATE: What the Frontend sends us
# (Notice: No ID, no CreatedAt. The DB makes those.)
class HackathonCreate(HackathonBase):
    pass 

# 3. RESPONSE: What we send back to the Frontend
# (We add the ID and system timestamps here)
class HackathonResponse(HackathonBase):
    id: str  # Appwrite ID ($id)
    created_at: datetime # Appwrite Timestamp ($createdAt)
    updated_at: datetime # Appwrite Timestamp ($updatedAt)

    class Config:
        # This tells Pydantic to ignore extra data if Appwrite sends more than we need
        extra = "ignore"