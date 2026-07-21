from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    bio = Column(String, nullable=True)
    university = Column(String, nullable=True)
    course = Column(String, nullable=True)
    year = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    interests = Column(String, nullable=True) # Comma separated
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    mood_logs = relationship("MoodLog", back_populates="user")
    journals = relationship("Journal", back_populates="user")
    posts = relationship("CommunityPost", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    bookmarks = relationship("Bookmark", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class MoodLog(Base):
    __tablename__ = "mood_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mood = Column(String)  # e.g., 'Happy', 'Anxious'
    intensity = Column(Integer) # 1-10
    note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="mood_logs")

class Journal(Base):
    __tablename__ = "journals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    content = Column(Text)
    mood = Column(String, nullable=True)
    sentiment_score = Column(Float, nullable=True)
    sentiment_label = Column(String, nullable=True) # Positive, Neutral, Negative
    ai_recommendation = Column(Text, nullable=True)
    is_private = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="journals")

class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    content = Column(Text)
    category = Column(String) # e.g. Stress, Anxiety
    tags = Column(String, nullable=True) # Comma separated tags
    is_anonymous = Column(Boolean, default=False)
    likes = Column(Integer, default=0)
    views = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    bookmarks = relationship("Bookmark", back_populates="post")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("community_posts.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    parent_id = Column(Integer, ForeignKey("comments.id"), nullable=True)
    content = Column(Text)
    is_anonymous = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    post = relationship("CommunityPost", back_populates="comments")
    user = relationship("User", back_populates="comments")
    parent = relationship("Comment", remote_side=[id], back_populates="replies")
    replies = relationship("Comment", back_populates="parent")

class ResourceCategory(Base):
    __tablename__ = "resource_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    description = Column(Text, nullable=True)
    resources = relationship("Resource", back_populates="category")

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("resource_categories.id"))
    title = Column(String)
    description = Column(Text)
    content_url = Column(String, nullable=True)
    type = Column(String) # e.g., 'Article', 'Video', 'Exercise'
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    category = relationship("ResourceCategory", back_populates="resources")
    bookmarks = relationship("Bookmark", back_populates="resource")

class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("community_posts.id"), nullable=True)
    resource_id = Column(Integer, ForeignKey("resources.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="bookmarks")
    post = relationship("CommunityPost", back_populates="bookmarks")
    resource = relationship("Resource", back_populates="bookmarks")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="notifications")
