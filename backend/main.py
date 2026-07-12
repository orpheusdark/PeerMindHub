from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import os
import google.generativeai as genai
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from database import engine, Base, get_db
import models
import schemas
from core.security import (
    verify_password, get_password_hash, create_access_token, 
    oauth2_scheme, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
)
from jose import JWTError, jwt
from datetime import timedelta

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="FleetAI Backend MVP", version="1.0.0")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "PeerMindHub API is running successfully!"}

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for demo purposes, adjust for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI & Sentiment Tools
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
vader_analyzer = SentimentIntensityAnalyzer()

# --- Dependencies ---
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user


# --- Auth Routes ---
class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = get_password_hash(user.password)
    new_user = models.User(name=user.name, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/login", response_model=schemas.Token)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# --- User Profile Routes ---
@app.get("/users/me", response_model=schemas.UserOut)
def get_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.put("/users/me", response_model=schemas.UserOut)
def update_profile(profile_data: schemas.UserProfileUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    for key, value in profile_data.model_dump(exclude_unset=True).items():
        setattr(current_user, key, value)
    db.commit()
    db.refresh(current_user)
    return current_user


# --- Mood Logs ---
@app.post("/moods", response_model=schemas.MoodLogOut)
def create_mood(mood_data: schemas.MoodLogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_mood = models.MoodLog(**mood_data.model_dump(), user_id=current_user.id)
    db.add(new_mood)
    db.commit()
    db.refresh(new_mood)
    return new_mood

@app.get("/moods", response_model=list[schemas.MoodLogOut])
def get_moods(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.MoodLog).filter(models.MoodLog.user_id == current_user.id).order_by(models.MoodLog.created_at.desc()).all()


# --- Journals ---
@app.post("/journals", response_model=schemas.JournalOut)
def create_journal(journal_data: schemas.JournalCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # VADER Sentiment Analysis
    sentiment_score = 0.0
    sentiment_label = "Neutral"
    if journal_data.content:
        scores = vader_analyzer.polarity_scores(journal_data.content)
        compound = scores['compound']
        sentiment_score = compound
        if compound >= 0.05:
            sentiment_label = "Positive"
        elif compound <= -0.05:
            sentiment_label = "Negative"
            
    new_journal = models.Journal(
        **journal_data.model_dump(), 
        user_id=current_user.id,
        sentiment_score=sentiment_score,
        sentiment_label=sentiment_label
    )
    db.add(new_journal)
    db.commit()
    db.refresh(new_journal)
    return new_journal

@app.get("/journals", response_model=list[schemas.JournalOut])
def get_journals(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Journal).filter(models.Journal.user_id == current_user.id).order_by(models.Journal.created_at.desc()).all()


# --- Community Posts ---
@app.post("/community", response_model=schemas.CommunityPostOut)
def create_post(post_data: schemas.CommunityPostCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_post = models.CommunityPost(**post_data.model_dump(), user_id=current_user.id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    
    # Return with author name
    res = schemas.CommunityPostOut.model_validate(new_post)
    res.author_name = "Anonymous" if new_post.is_anonymous else current_user.name
    return res

@app.get("/community", response_model=list[schemas.CommunityPostOut])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.CommunityPost).order_by(models.CommunityPost.created_at.desc()).all()
    results = []
    for p in posts:
        out = schemas.CommunityPostOut.model_validate(p)
        out.author_name = "Anonymous" if p.is_anonymous else p.user.name
        results.append(out)
    return results


# --- AI Assistant ---
@app.post("/ai/chat")
def ai_chat(chat: schemas.ChatMessage, current_user: models.User = Depends(get_current_user)):
    if not GEMINI_API_KEY:
        return {"response": "AI Assistant is currently offline (No API Key). Please try again later."}
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        system_prompt = (
            "You are FleetAI's wellness assistant. You provide empathetic support, mental wellness guidance, "
            "and coping strategies. NEVER provide a medical diagnosis. Always encourage professional help "
            "when detecting severe distress or emergencies. Keep responses concise and supportive."
        )
        
        prompt = f"System: {system_prompt}\nUser ({current_user.name}): {chat.message}\nAssistant:"
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"I'm sorry, I encountered an error: {str(e)}"}
