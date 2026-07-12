from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Users
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    university: Optional[str] = None
    course: Optional[str] = None
    year: Optional[str] = None

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    bio: Optional[str] = None
    university: Optional[str] = None
    course: Optional[str] = None
    year: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Mood Logs
class MoodLogCreate(BaseModel):
    mood: str
    intensity: int
    note: Optional[str] = None

class MoodLogOut(MoodLogCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Journals
class JournalCreate(BaseModel):
    title: str
    content: str
    mood: Optional[str] = None
    is_private: Optional[bool] = True

class JournalOut(JournalCreate):
    id: int
    user_id: int
    sentiment_score: Optional[float] = None
    sentiment_label: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Community Posts
class CommunityPostCreate(BaseModel):
    title: str
    content: str
    category: str
    is_anonymous: Optional[bool] = False

class CommunityPostOut(CommunityPostCreate):
    id: int
    user_id: int
    likes: int
    created_at: datetime
    # We might want to attach author name if not anonymous
    author_name: Optional[str] = None

    class Config:
        from_attributes = True

# AI Assistant
class ChatMessage(BaseModel):
    message: str
