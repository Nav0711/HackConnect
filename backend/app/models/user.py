from pydantic import BaseModel, Field
from typing import List, Optional

# 1. The Schema (Matches your Appwrite Columns exactly)
class UserBase(BaseModel):
    username: str             # Matches 'username' column
    account_id: str           # Matches 'account_id' column
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    github_url: Optional[str] = None
    skills: List[str] = []    # Matches 'skills' column
    xp: int = 0               # Matches 'xp' column
    reputation_score: float = 0.0  # Matches 'reputation_score' column

# 2. Incoming Data (What Frontend sends after Login)
class UserLogin(UserBase):
    email: Optional[str] = None # We receive email, but we don't save it if the DB doesn't have a column for it
    id: str  # The Appwrite Auth ID ($id)

# 3. Outgoing Data (What we send back)
class UserResponse(UserBase):
    id: str
    created_at: str
    updated_at: str