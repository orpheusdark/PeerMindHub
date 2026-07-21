import os
import random
from datetime import datetime, timedelta, timezone
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models
from core.security import get_password_hash

def days_ago(days):
    return datetime.now(timezone.utc) - timedelta(days=days)

def hours_ago(hours):
    return datetime.now(timezone.utc) - timedelta(hours=hours)

def mins_ago(mins):
    return datetime.now(timezone.utc) - timedelta(minutes=mins)

def seed_db():
    print("Dropping and recreating all tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Seeding Users...")
        # 1. Main Demo User
        main_user = models.User(
            name="Testing User",
            email="testing@demo.com",
            hashed_password=get_password_hash("password123"),
            bio="Preparing for semester exams and placements.",
            university="DAIICT",
            course="B.Tech Computer Science",
            year="3rd Year",
            interests="Coding, Guitar, Reading",
            created_at=days_ago(120)
        )
        db.add(main_user)
        db.commit()
        db.refresh(main_user)
        
        # 2. Generate 35 Fictional Indian Students
        student_data = [
            ("Aarav Mehta", "M", "VIT", "B.Tech CS", "3rd Year", "Burnt out Leetcoder. Living on caffeine."),
            ("Rohan Patel", "M", "Nirma University", "B.Tech IT", "4th Year", "Placement season is destroying me."),
            ("Ananya Shah", "F", "Manipal", "B.A. Psychology", "2nd Year", "Psych student trying to analyze myself."),
            ("Sneha Iyer", "F", "Amity", "BBA", "1st Year", "Hostel life is so chaotic."),
            ("Harsh Trivedi", "M", "DAIICT", "B.Tech ECE", "3rd Year", "Is ECE even worth it anymore?"),
            ("Yash Desai", "M", "CHARUSAT", "B.Tech CS", "2nd Year", "Building startups, failing classes."),
            ("Dev Patel", "M", "Parul University", "B.Tech Mechanical", "4th Year", "Core branch struggles are real."),
            ("Priyanshi Sharma", "F", "PDEU", "B.Tech CS", "3rd Year", "Just trying to survive 75% attendance."),
            ("Krishna Joshi", "M", "LDRP", "BCA", "2nd Year", "Frontend dev. CSS is making me cry."),
            ("Aditya Singh", "M", "SRM", "B.Tech CS", "3rd Year", "DSA every day keeps the anxiety away (false)."),
            ("Kunal Verma", "M", "Christ University", "B.Com", "1st Year", "Bangalore traffic is my biggest enemy."),
            ("Simran Kaur", "F", "LPU", "B.Tech IT", "2nd Year", "Hackathon enthusiast."),
            ("Siddharth Menon", "M", "VIT", "B.Tech CS", "4th Year", "Finally placed. AMA."),
            ("Diya Kapoor", "F", "Manipal", "B.Tech ECE", "3rd Year", "Hostel food is a crime against humanity."),
            ("Meera Reddy", "F", "Amity", "B.A. English", "2nd Year", "Romanticizing college life until exams hit."),
            ("Aryan Rao", "M", "Nirma University", "B.Tech CS", "1st Year", "Should I start competitive programming?"),
            ("Kavya Singh", "F", "SRM", "B.Tech Biotech", "4th Year", "Research papers and panic attacks."),
            ("Arjun Kulkarni", "M", "Pune College", "B.Tech Mech", "3rd Year", "ATKT warrior."),
            ("Neha Joshi", "F", "Delhi Tech", "B.Tech CS", "2nd Year", "Imposter syndrome hitting hard today."),
            ("Ishita Nair", "F", "Christ University", "BBA", "3rd Year", "Presentations give me social anxiety."),
            ("Karan Malhotra", "M", "VIT", "B.Tech CS", "4th Year", "Looking for off-campus opportunities."),
            ("Ritika Jain", "F", "DAIICT", "B.Tech IT", "3rd Year", "Why is everyone getting internships except me?"),
            ("Tanya Gupta", "F", "Manipal", "B.Arch", "2nd Year", "I haven't slept in 48 hours. Studio lyf."),
            ("Vihaan Das", "M", "LPU", "B.Tech CS", "1st Year", "College is nothing like the movies."),
            ("Zara Khan", "F", "Parul University", "B.Pharm", "3rd Year", "Too much syllabus, too little time."),
            ("Kabir Singh", "M", "SRM", "B.Tech ECE", "2nd Year", "CGPA is just a number (crying inside)."),
            ("Riya Sen", "F", "Amity", "B.Des", "4th Year", "Portfolio panic!"),
            ("Varun Dhawan", "M", "CHARUSAT", "BCA", "1st Year", "Is it too late to change my major?"),
            ("Pooja Bhatia", "F", "PDEU", "B.A. Economics", "2nd Year", "Math is destroying my mental peace."),
            ("Rishi Kumar", "M", "VIT", "B.Tech Civil", "3rd Year", "Civil engg here. No placements. Help."),
            ("Sanya Malhotra", "F", "LPU", "B.Sc Physics", "1st Year", "Homesick. I miss my mom's food."),
            ("Rahul Dravid", "M", "Manipal", "B.Tech CS", "4th Year", "Done with college drama. Just want to graduate."),
            ("Akash Varma", "M", "DAIICT", "B.Tech IT", "2nd Year", "My roommate is a nightmare."),
            ("Nisha Agarwal", "F", "Christ University", "B.Com", "3rd Year", "Finance bro culture is toxic."),
            ("Omkar Naik", "M", "Pune College", "B.Tech CS", "1st Year", "Failed my first mid-sem. Is it over?")
        ]
        
        users = [main_user]
        for name, gender, uni, course, year, bio in student_data:
            email = f"{name.split()[0].lower()}.{name.split()[-1].lower()}@demo.com"
            user = models.User(
                name=name,
                email=email,
                hashed_password=get_password_hash("password123"),
                bio=bio,
                university=uni,
                course=course,
                year=year,
                created_at=days_ago(random.randint(60, 200))
            )
            db.add(user)
            users.append(user)
        
        db.commit()
        for u in users:
            db.refresh(u)
            
        print("Seeding Community Posts...")
        
        post_data = [
            {
                "title": "I solved 400 LC questions and still got rejected.",
                "content": "I honestly don't know what I'm doing anymore. I've been grinding Leetcode since 2nd year. Solved 400+ questions. Yesterday was the Amazon OA and I literally blanked out on the second question. Everyone around me is getting internships and I'm just sitting here feeling like an absolute failure. Is it even worth it? I think I'm just burnt out. 😭",
                "category": "stress",
                "tags": "placements, leetcode, burnout",
                "author": "Aarav Mehta",
                "views": 2945, "likes": 203, "time_offset": hours_ago(12)
            },
            {
                "title": "My attendance is literally dead 😭",
                "content": "My attendance is at 62% right now. The college says minimum 75% is required or I'll get a backlog. I've been so depressed lately I just couldn't get out of bed for morning classes. Has anyone survived with 60%? Will medical certificates work? Panicking rn.",
                "category": "anxiety",
                "tags": "attendance, college, panic",
                "author": "Priyanshi Sharma",
                "views": 842, "likes": 94, "time_offset": days_ago(2)
            },
            {
                "title": "Homesickness is killing me",
                "content": "I haven't been home in 5 months. The hostel food is terrible, my roommates are loud, and I just miss my own bed and my mom's cooking. I cried in the bathroom today. How do you guys deal with this? Does it get better?",
                "category": "depression",
                "tags": "hostel, homesick, lonely",
                "author": "Sanya Malhotra",
                "views": 432, "likes": 56, "time_offset": days_ago(5)
            },
            {
                "title": "Deleted LinkedIn for a month. Best decision ever.",
                "content": "If you're feeling anxious, DELETE LINKEDIN. Seriously. Seeing everyone post 'I am thrilled to announce...' was destroying my self-esteem. I took a 30 day detox and my mental health is so much better. Stop comparing your behind-the-scenes with someone else's highlight reel.",
                "category": "anxiety",
                "tags": "linkedin, mental-health, advice",
                "author": "Siddharth Menon",
                "views": 1530, "likes": 342, "time_offset": days_ago(10)
            },
            {
                "title": "Roommate problems: He plays Valo at 3 AM",
                "content": "Guys I need advice. My roommate plays Valorant till 3 AM screaming in the mic. I have morning classes at 8 AM. I've tried talking to him nicely but he just says 'bro adjust karle'. I am sleep deprived and constantly irritated.",
                "category": "stress",
                "tags": "hostel, roommates, sleep",
                "author": "Akash Varma",
                "views": 612, "likes": 45, "time_offset": hours_ago(8)
            },
            {
                "title": "Imposter syndrome in CS",
                "content": "I am in 2nd year CS and I feel like I know nothing. Everyone in my class is building full stack apps, doing ML, winning hackathons, and I am struggling to center a div. Am I in the wrong field?",
                "category": "depression",
                "tags": "cs, imposter-syndrome, coding",
                "author": "Neha Joshi",
                "views": 1102, "likes": 120, "time_offset": days_ago(3)
            },
            {
                "title": "How to handle parents' expectations?",
                "content": "My parents want me to get a 10 LPA+ job minimum. They keep comparing me to my cousin who got into Google. They don't understand that the market is terrible right now. Every time they call, it's just 'job laga?'. The pressure is suffocating.",
                "category": "stress",
                "tags": "parents, pressure, jobs",
                "author": "Rohan Patel",
                "views": 1823, "likes": 215, "time_offset": days_ago(1)
            },
            {
                "title": "Failed my first internal viva",
                "content": "I just completely blanked in front of the external examiner. He literally laughed and asked if I even attended classes. I feel so humiliated. I want to drop out.",
                "category": "anxiety",
                "tags": "viva, exams, failure",
                "author": "Omkar Naik",
                "views": 320, "likes": 28, "time_offset": hours_ago(2)
            },
            {
                "title": "Burnout recovery - My journey",
                "content": "A few months ago I was so burnt out I couldn't look at a screen. I stopped coding, stopped studying. I started taking small walks, eating properly, and talking to a counselor here on this platform. If you're burnt out, please stop pushing yourself. Take a break. Your brain needs rest just like a muscle.",
                "category": "depression",
                "tags": "burnout, recovery, health",
                "author": "Ananya Shah",
                "views": 750, "likes": 189, "time_offset": days_ago(15)
            },
            {
                "title": "Is it okay to have no friends in 3rd year?",
                "content": "I lost touch with my first year friend group. Now in 3rd year, everyone has their solid cliques. I sit alone in the canteen and library. It feels so isolating. Am I the only one?",
                "category": "depression",
                "tags": "lonely, friends, college",
                "author": "Kavya Singh",
                "views": 940, "likes": 145, "time_offset": days_ago(7)
            },
            {
                "title": "Fear of public speaking ruining my grades",
                "content": "We have mandatory presentations and my social anxiety goes crazy. My hands shake, my voice cracks, and I forget everything. My professor gave me a C just because of my presentation skills even though my project was the best.",
                "category": "anxiety",
                "tags": "presentations, social-anxiety",
                "author": "Ishita Nair",
                "views": 415, "likes": 67, "time_offset": days_ago(4)
            },
            {
                "title": "Any off-campus placement tips?",
                "content": "Campus placements are completely dead this year. Companies are coming for 3-4 LPA max with bonds. Has anyone successfully cracked a good off-campus role recently? I am cold emailing but no replies.",
                "category": "stress",
                "tags": "placements, off-campus, jobs",
                "author": "Karan Malhotra",
                "views": 2100, "likes": 156, "time_offset": hours_ago(20)
            },
            {
                "title": "I don't understand anything in ECE",
                "content": "Signals and Systems is going over my head. Microprocessors makes no sense. I took ECE because my parents said 'it has scope'. I just want to code. Will this get better or am I doomed?",
                "category": "stress",
                "tags": "ece, engineering, academics",
                "author": "Harsh Trivedi",
                "views": 530, "likes": 42, "time_offset": days_ago(6)
            },
            {
                "title": "Coping with a breakup during exams",
                "content": "My girlfriend of 2 years broke up with me yesterday. End sems start next week. I can't focus on anything. Every time I open a book I just start crying. How do I survive these exams?",
                "category": "depression",
                "tags": "breakup, exams, focus",
                "author": "Testing User",
                "views": 1205, "likes": 198, "time_offset": days_ago(2)
            },
            {
                "title": "Hackathon pressure is toxic",
                "content": "Why is college culture just about grinding 24/7? Hackathons on weekends, assignments on weekdays. We are humans, not machines. I skipped a hackathon this weekend to just sleep and my teammates called me 'lazy'.",
                "category": "stress",
                "tags": "hackathons, toxic, rest",
                "author": "Simran Kaur",
                "views": 890, "likes": 134, "time_offset": days_ago(8)
            },
            {
                "title": "Should I change my major?",
                "content": "I'm in BCA first year and I absolutely hate it. I wanted to do Design but my parents forced me into IT. Is it too late to switch? Will I waste a year?",
                "category": "anxiety",
                "tags": "career, major, confusion",
                "author": "Varun Dhawan",
                "views": 240, "likes": 12, "time_offset": hours_ago(5)
            },
            {
                "title": "The CGPA trap",
                "content": "Seniors always said 'CGPA doesn't matter, skills do'. Bro, companies are putting 8.5 CGPA cutoffs. I have 7.8 with great projects and I am not even allowed to sit for the OA. It's so unfair.",
                "category": "stress",
                "tags": "cgpa, placements, unfair",
                "author": "Kabir Singh",
                "views": 2840, "likes": 412, "time_offset": days_ago(1)
            },
            {
                "title": "How to get medical certificates for attendance?",
                "content": "Asking for a friend. Need a 2-week medical certificate to cover my short attendance. Are there doctors who give it easily? My HOD is very strict.",
                "category": "anxiety",
                "tags": "attendance, hacks, college",
                "author": "Testing User",
                "views": 1500, "likes": 88, "time_offset": days_ago(12)
            },
            {
                "title": "I failed DSA",
                "content": "Got my results today. F in Data Structures. I feel like my career is over before it even started. How will I ever clear interviews if I can't even pass the college exam?",
                "category": "depression",
                "tags": "failure, dsa, academics",
                "author": "Aditya Singh",
                "views": 670, "likes": 75, "time_offset": days_ago(9)
            },
            {
                "title": "Just a reminder: You are more than your grades",
                "content": "Hey everyone. Seeing a lot of stressful posts lately. Just wanted to remind you that 10 years from now, nobody will ask about your CGPA or your backlog. Take a deep breath. Drink water. You got this. ❤️",
                "category": "stress",
                "tags": "motivation, positive, mental-health",
                "author": "Sneha Iyer",
                "views": 3200, "likes": 580, "time_offset": days_ago(1)
            }
        ]
        
        db_posts = []
        user_map = {u.name: u for u in users}
        
        for pdata in post_data:
            author = user_map.get(pdata["author"], main_user)
            post = models.CommunityPost(
                user_id=author.id,
                title=pdata["title"],
                content=pdata["content"],
                category=pdata["category"],
                tags=pdata["tags"],
                views=pdata["views"],
                likes=pdata["likes"],
                created_at=pdata["time_offset"]
            )
            db.add(post)
            db_posts.append(post)
            
        db.commit()
        for p in db_posts:
            db.refresh(p)
            
        print("Seeding Comments & Replies...")
        
        # We will generate programmatic comments to mimic real conversations
        # For each post, we'll add 8-10 comments, some nested.
        
        comment_templates = [
            "Bro same 😭",
            "I was in the exact same situation during my third semester. It gets better, trust me.",
            "Honestly, placement season is brutal right now. Don't take it personally.",
            "My attendance was 62% last semester too. Go talk to your HOD and cry a little, it works sometimes.",
            "I also failed DSA once. Now I'm working as an SDE. Marks != Skills.",
            "Don't compare yourself with LinkedIn. It's all fake flexing.",
            "Take a break man. Go watch a movie or sleep for 12 hours.",
            "I literally feel this in my soul.",
            "Have you tried talking to the campus counselor?",
            "If anyone wants to vent, my DMs are open. We're in this together.",
            "CFBR",
            "Honestly I just stopped caring. Whatever happens, happens.",
            "This is so relatable it hurts.",
            "Wait, you guys are studying?",
            "Skill issue 💀 (jk bro, stay strong)",
            "I deleted LinkedIn 6 months ago. So much peace.",
            "Just grind NeetCode 150. Forget the rest.",
            "I think you should reconsider your branch if you hate it that much.",
            "Hostel food is basically slow poison.",
            "Go home for a week. Tell them you're sick. You need a break.",
            "Don't panic. Medical certificates usually work if you get them from a govt hospital.",
            "I have 3 backlogs and I'm still chilling. Just clear them next sem.",
            "Nobody cares about CGPA off-campus. Just build good projects."
        ]
        
        for post in db_posts:
            num_comments = random.randint(6, 12)
            
            # Select random users to comment
            commenters = random.sample(users, num_comments)
            
            parent_comments = []
            
            for i in range(num_comments):
                c_user = commenters[i]
                c_time = post.created_at + timedelta(minutes=random.randint(10, 600))
                
                # 30% chance to be a reply to an existing comment
                if parent_comments and random.random() < 0.3:
                    parent = random.choice(parent_comments)
                    
                    reply_text = random.choice([
                        "Exactly!",
                        "I disagree completely.",
                        "Bro how did you manage that?",
                        "Thanks for the tip!",
                        "Can I DM you about this?",
                        "This! 💯",
                        "Are you from VIT too?"
                    ])
                    
                    reply = models.Comment(
                        post_id=post.id,
                        user_id=c_user.id,
                        parent_id=parent.id,
                        content=reply_text,
                        created_at=c_time
                    )
                    db.add(reply)
                else:
                    # Parent comment
                    text = random.choice(comment_templates)
                    
                    comment = models.Comment(
                        post_id=post.id,
                        user_id=c_user.id,
                        content=text,
                        created_at=c_time
                    )
                    db.add(comment)
                    db.commit() # commit immediately to get ID for parent
                    db.refresh(comment)
                    parent_comments.append(comment)
                    
        db.commit()
        
        print("Seeding Bookmarks & Notifications...")
        
        # Add some bookmarks for the main user
        bookmarked_posts = random.sample(db_posts, 5)
        for p in bookmarked_posts:
            bm = models.Bookmark(
                user_id=main_user.id,
                post_id=p.id,
                created_at=days_ago(random.randint(1, 10))
            )
            db.add(bm)
            
        # Add some notifications
        notifs = [
            ("New Reply", "Aarav Mehta replied to your comment on 'The CGPA trap'"),
            ("New Like", "Your post 'Coping with a breakup during exams' got 10 new likes"),
            ("Trending", "Hot discussion in Placement Stress: 'I solved 400 LC questions...'"),
            ("System", "Welcome to PeerMindHub! Complete your profile to connect with peers.")
        ]
        
        for title, msg in notifs:
            n = models.Notification(
                user_id=main_user.id,
                title=title,
                message=msg,
                created_at=days_ago(random.randint(0, 3))
            )
            db.add(n)
            
        db.commit()
        print("Database seeded successfully with rich BIOTHON 2026 data!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
