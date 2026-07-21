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
    avatar_url: Optional[str] = None
    interests: Optional[str] = None

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    bio: Optional[str] = None
    university: Optional[str] = None
    course: Optional[str] = None
    year: Optional[str] = None
    avatar_url: Optional[str] = None
    interests: Optional[str] = None
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
    ai_recommendation: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Community Posts
class CommunityPostCreate(BaseModel):
    title: str
    content: str
    category: str
    tags: Optional[str] = None
    is_anonymous: Optional[bool] = False

class CommunityPostOut(CommunityPostCreate):
    id: int
    user_id: int
    likes: int
    views: int
    created_at: datetime
    # We might want to attach author name if not anonymous
    author_name: Optional[str] = None

    class Config:
        from_attributes = True

# AI Assistant
class ChatMessage(BaseModel):
    message: str

# Comments
class CommentCreate(BaseModel):
    content: str
    parent_id: Optional[int] = None
    is_anonymous: Optional[bool] = False

class CommentOut(CommentCreate):
    id: int
    post_id: int
    user_id: int
    created_at: datetime
    author_name: Optional[str] = None
    
    class Config:
        from_attributes = True

# Resources
class ResourceCategoryOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

class ResourceOut(BaseModel):
    id: int
    category_id: int
    title: str
    description: str
    content_url: Optional[str] = None
    type: str
    created_at: datetime
    category: Optional[ResourceCategoryOut] = None

    class Config:
        from_attributes = True

# Bookmarks
class BookmarkCreate(BaseModel):
    post_id: Optional[int] = None
    resource_id: Optional[int] = None

class BookmarkOut(BookmarkCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Notifications
class NotificationOut(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

