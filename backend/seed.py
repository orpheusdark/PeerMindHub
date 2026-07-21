import os
import random
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models
from core.security import get_password_hash

# Helper to generate dates
def days_ago(days):
    return datetime.now(timezone.utc) - timedelta(days=days)

def seed_db():
    print("Dropping and recreating all tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Seeding Users...")
        # 1. Main Demo User
        rahul = models.User(
            name="Testing User",
            email="testing@demo.com",
            hashed_password=get_password_hash("password123"),
            bio="Preparing for semester exams and placements.",
            university="Fictional Engineering University",
            course="B.Tech Computer Science",
            year="2nd Year",
            interests="Coding, Guitar, Reading",
            created_at=days_ago(35)
        )
        db.add(rahul)
        
        # 2. Other Demo Users
        names = [
            "Aarav Mehta", "Priya Shah", "Rohan Patel", "Sneha Iyer", "Ananya Desai", 
            "Harsh Trivedi", "Ishita Nair", "Kunal Verma", "Neha Joshi", "Arjun Kulkarni",
            "Kavya Singh", "Aryan Rao", "Siddharth Menon", "Diya Kapoor", "Meera Reddy"
        ]
        courses = ["B.Tech CS", "B.Com", "B.A. Psychology", "B.Sc Physics", "BBA"]
        universities = ["Delhi Tech", "Mumbai University", "Bangalore Institute", "Pune College"]
        
        demo_users = []
        for i, name in enumerate(names):
            user = models.User(
                name=name,
                email=f"{name.split()[0].lower()}@demo.com",
                hashed_password=get_password_hash("password123"),
                bio=f"Student at {random.choice(universities)}.",
                university=random.choice(universities),
                course=random.choice(courses),
                year=random.choice(["1st Year", "2nd Year", "3rd Year", "4th Year"]),
                created_at=days_ago(random.randint(40, 100))
            )
            db.add(user)
            demo_users.append(user)
            
        db.commit()
        db.refresh(rahul)
        for u in demo_users:
            db.refresh(u)
            
        print("Seeding Rahul's 30-Day Journey (Moods & Journals)...")
        # Week 1: Happy, Motivated
        # Week 2: Stress increasing
        # Week 3: Poor sleep, Exam pressure, Anxiety
        # Week 4: Uses FleetAI, Improvement begins
        
        for day in range(30, 0, -1):
            mood = "Neutral"
            intensity = 5
            note = ""
            
            if day > 23: # Week 1
                mood = "Happy"
                intensity = random.randint(7, 9)
                note = "Feeling good, keeping up with classes."
            elif day > 16: # Week 2
                mood = "Stressed"
                intensity = random.randint(6, 8)
                note = "Too many assignments piling up."
            elif day > 9: # Week 3
                mood = "Anxious"
                intensity = random.randint(8, 10)
                note = "Couldn't sleep. Placements are terrifying."
            else: # Week 4
                mood = "Hopeful"
                intensity = random.randint(6, 8)
                note = "Followed the meditation routine. Feeling slightly better."
                
            mood_log = models.MoodLog(
                user_id=rahul.id,
                mood=mood,
                intensity=intensity,
                note=note,
                created_at=days_ago(day)
            )
            db.add(mood_log)
            
        # Journals for Rahul
        journals = [
            (28, "Good start to the semester", "I feel like I finally have a grip on my subjects this time. Met some new friends.", "Positive", 0.8, "Keep up the great momentum!"),
            (21, "Feeling overwhelmed", "Three assignments due this week. I don't know how I'll finish everything. I'm skipping meals.", "Negative", -0.6, "Make sure to prioritize your physical health. Take a 15-minute break."),
            (14, "I can't do this", "I had a panic attack yesterday. The placement news is making me feel like a failure before I even start.", "Negative", -0.9, "I hear you, and it's okay to feel overwhelmed. Consider checking our resources on placement anxiety."),
            (10, "Trying something new", "I talked to a senior today. They told me everyone feels this way. I tried the 5-4-3-2-1 breathing method.", "Neutral", 0.1, "Connecting with others is a great step! Keep practicing mindfulness."),
            (3, "Small wins", "I slept 7 hours last night. First time in weeks. I made a study schedule and I'm sticking to it.", "Positive", 0.7, "Amazing progress! Consistency with sleep and scheduling works wonders.")
        ]
        
        for j in journals:
            db.add(models.Journal(
                user_id=rahul.id,
                title=j[1],
                content=j[2],
                sentiment_label=j[3],
                sentiment_score=j[4],
                ai_recommendation=j[5],
                created_at=days_ago(j[0])
            ))
            
        print("Seeding Community Posts & Comments...")
        topics = [
            ("Exam Anxiety", "Is anyone else feeling completely frozen when trying to study for the DBMS final?", "Exams", "anxiety,exams"),
            ("Internship Rejections", "I just got my 5th rejection. Feeling like I'm not good enough for this industry.", "Career", "placements,rejections,burnout"),
            ("Late Night Study", "What are your tips for staying awake without drinking 5 cups of coffee?", "Study Tips", "sleep,productivity"),
            ("Homesickness", "It's my first month in the hostel and I miss home so much. I cry almost every night.", "Mental Health", "loneliness,hostel"),
            ("Meditation helps", "I started using the 10-minute guided meditation on this app. It actually lowered my heart rate before the viva.", "Recovery", "mindfulness,success")
        ]
        
        posts = []
        for i, t in enumerate(topics * 4): # Create 20 posts
            author = random.choice(demo_users)
            post = models.CommunityPost(
                user_id=author.id,
                title=t[0],
                content=t[1],
                category=t[2],
                tags=t[3],
                likes=random.randint(2, 50),
                views=random.randint(20, 200),
                is_anonymous=(random.random() > 0.7),
                created_at=days_ago(random.randint(1, 30))
            )
            db.add(post)
            posts.append(post)
            
        db.commit()
        for p in posts:
            db.refresh(p)
            
        # Add Comments
        print("Adding comments...")
        for p in posts:
            for _ in range(random.randint(1, 5)):
                comment_author = random.choice(demo_users)
                comment = models.Comment(
                    post_id=p.id,
                    user_id=comment_author.id,
                    content=random.choice([
                        "I totally relate to this. You're not alone.",
                        "Have you tried breaking the syllabus into smaller 30-min chunks? It helped me.",
                        "I went through something similar last semester. It gets better, just hang in there.",
                        "Thanks for sharing. This makes me feel less lonely.",
                        "If it gets too overwhelming, maybe check the campus counselor? They actually helped me."
                    ]),
                    created_at=p.created_at + timedelta(hours=random.randint(1, 48))
                )
                db.add(comment)
                db.commit()
                db.refresh(comment)
                
                # Reply occasionally
                if random.random() > 0.5:
                    reply = models.Comment(
                        post_id=p.id,
                        user_id=p.user_id, # Author replying
                        parent_id=comment.id,
                        content="Thank you, I'll definitely try that approach.",
                        created_at=comment.created_at + timedelta(hours=random.randint(1, 5))
                    )
                    db.add(reply)
                    
        print("Seeding Resources...")
        cats = ["Stress", "Sleep", "Burnout", "Meditation", "Exam Anxiety"]
        for c in cats:
            cat = models.ResourceCategory(name=c, description=f"Resources for {c}")
            db.add(cat)
            db.commit()
            db.refresh(cat)
            
            for i in range(3):
                db.add(models.Resource(
                    category_id=cat.id,
                    title=f"How to manage {c} effectively",
                    description="A comprehensive guide with actionable steps.",
                    type=random.choice(["Article", "Video", "Exercise"])
                ))
                
        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
