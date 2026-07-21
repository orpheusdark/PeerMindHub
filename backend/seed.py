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
        
        # User personas: coding, wellness, hostel, academics, placements, general
        student_data = [
            ("Aarav Mehta", "M", "VIT", "B.Tech CS", "3rd Year", "placements", "Grinding Leetcode. Living on caffeine."),
            ("Sneha Iyer", "F", "Amity", "B.A. Psychology", "2nd Year", "wellness", "Mental wellness advocate. Here to listen."),
            ("Harsh Trivedi", "M", "DAIICT", "B.Tech ECE", "3rd Year", "hostel", "Hostel stories and survival tips."),
            ("Yash Desai", "M", "CHARUSAT", "B.Tech CS", "2nd Year", "coding", "Competitive programmer. CP is love."),
            ("Priya Shah", "F", "Nirma University", "B.Tech IT", "4th Year", "academics", "Sharing study schedules and notes."),
            ("Rohan Patel", "M", "Parul University", "B.Tech Mechanical", "4th Year", "coding", "Hackathon enthusiast."),
            ("Ananya Desai", "F", "Manipal", "BBA", "2nd Year", "general", "Just trying to survive college."),
            ("Dev Patel", "M", "PDEU", "B.Tech CS", "3rd Year", "placements", "Looking for off-campus opportunities."),
            ("Priyanshi Sharma", "F", "LDRP", "BCA", "2nd Year", "academics", "Attendance is my biggest enemy."),
            ("Krishna Joshi", "M", "SRM", "B.Tech CS", "3rd Year", "coding", "Frontend dev. CSS is making me cry."),
            ("Aditya Singh", "M", "Christ University", "B.Com", "1st Year", "hostel", "Hostel food reviewer."),
            ("Kunal Verma", "M", "LPU", "B.Tech IT", "2nd Year", "academics", "ATKT warrior."),
            ("Simran Kaur", "F", "VIT", "B.Tech CS", "4th Year", "placements", "Finally placed. AMA."),
            ("Siddharth Menon", "M", "Manipal", "B.Tech ECE", "3rd Year", "wellness", "Took a break from social media."),
            ("Diya Kapoor", "F", "Amity", "B.A. English", "2nd Year", "general", "Romanticizing college life."),
            ("Meera Reddy", "F", "Nirma University", "B.Tech CS", "1st Year", "coding", "Should I start CP?"),
            ("Aryan Rao", "M", "SRM", "B.Tech Biotech", "4th Year", "academics", "Research papers and panic attacks."),
            ("Kavya Singh", "F", "Pune College", "B.Tech Mech", "3rd Year", "wellness", "Imposter syndrome hitting hard."),
            ("Arjun Kulkarni", "M", "Delhi Tech", "B.Tech CS", "2nd Year", "placements", "Failed my Google OA."),
            ("Neha Joshi", "F", "Christ University", "BBA", "3rd Year", "general", "Presentations give me social anxiety."),
            ("Ishita Nair", "F", "VIT", "B.Tech CS", "4th Year", "placements", "Cold emailing CEOs."),
            ("Karan Malhotra", "M", "DAIICT", "B.Tech IT", "3rd Year", "wellness", "Why is everyone getting internships except me?"),
            ("Ritika Jain", "F", "Manipal", "B.Arch", "2nd Year", "academics", "I haven't slept in 48 hours. Studio lyf."),
            ("Tanya Gupta", "F", "LPU", "B.Tech CS", "1st Year", "hostel", "College is nothing like the movies."),
            ("Vihaan Das", "M", "Parul University", "B.Pharm", "3rd Year", "academics", "Too much syllabus, too little time."),
            ("Zara Khan", "F", "SRM", "B.Tech ECE", "2nd Year", "wellness", "CGPA is just a number (crying inside)."),
            ("Kabir Singh", "M", "Amity", "B.Des", "4th Year", "general", "Portfolio panic!"),
            ("Riya Sen", "F", "CHARUSAT", "BCA", "1st Year", "academics", "Is it too late to change my major?"),
            ("Varun Dhawan", "M", "PDEU", "B.A. Economics", "2nd Year", "academics", "Math is destroying my mental peace."),
            ("Pooja Bhatia", "F", "VIT", "B.Tech Civil", "3rd Year", "placements", "Civil engg here. No placements. Help."),
            ("Rishi Kumar", "M", "LPU", "B.Sc Physics", "1st Year", "hostel", "Homesick. I miss my mom's food."),
            ("Sanya Malhotra", "F", "Manipal", "B.Tech CS", "4th Year", "general", "Done with college drama."),
            ("Rahul Dravid", "M", "DAIICT", "B.Tech IT", "2nd Year", "hostel", "My roommate is a nightmare."),
            ("Akash Varma", "M", "Christ University", "B.Com", "3rd Year", "wellness", "Finance bro culture is toxic."),
            ("Nisha Agarwal", "F", "Pune College", "B.Tech CS", "1st Year", "academics", "Failed my first mid-sem."),
            ("Omkar Naik", "M", "VIT", "B.Tech CS", "2nd Year", "coding", "Just built a React Native app.")
        ]
        
        users = [main_user]
        user_personas = {}
        for name, gender, uni, course, year, persona, bio in student_data:
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
            # Find the persona assigned in our mock data, default to general
            persona = next((d[5] for d in student_data if d[0] == u.name), "general")
            user_personas[u.id] = persona
            
        print("Seeding Community Posts & Comments...")
        
        posts_data = [
            # PLACEMENTS
            {
                "title": "Rejected after 4 rounds at Google.",
                "content": "I cleared the OA, two technical rounds, and the Googlyness round. Today I got the automated rejection email. I prepared for 6 months. I feel completely empty right now. Should I even bother applying off-campus?",
                "category": "placements", "tags": "rejections, google, interview", "author": "Arjun Kulkarni",
                "views": 2945, "likes": 210, "time_offset": hours_ago(12),
                "comments": [
                    ("placements", "I also got rejected after the second technical round last month. It honestly felt terrible for a few days. Ask the recruiter for feedback!"),
                    ("placements", "Bro same 😂 Well, not Google, but Amazon. It hurts but you have the skills if you made it that far."),
                    ("wellness", "Take a few days off. Don't look at Leetcode. You're burnt out and grieving the opportunity."),
                    ("coding", "Which graphs question did they ask in Round 2? Was it DP?"),
                    ("placements", "Off-campus is tough right now but with Google on your resume (even as interview) startups will shortlist you easily.")
                ]
            },
            {
                "title": "Is 6 LPA good for a fresher in Bangalore?",
                "content": "I got a PPO from my internship but it's 6 LPA. My friends are holding out for 10+ LPA packages. But the market is so bad I'm scared to reject it. Can you survive in Bangalore on this?",
                "category": "placements", "tags": "ppo, salary, bangalore", "author": "Simran Kaur",
                "views": 1823, "likes": 57, "time_offset": days_ago(2),
                "comments": [
                    ("placements", "Accept it. A bird in the hand is worth two in the bush. Market is brutal right now."),
                    ("hostel", "6 LPA in BLR? You'll be spending 15k just on a PG in Koramangala or HSR."),
                    ("general", "Don't compare with your friends. 6 LPA is a great start. I know seniors who started at 3.5 and are at 20 now."),
                    ("academics", "I rejected a 5 LPA offer to focus on GATE. Regretting it every single day."),
                    ("placements", "Accept the offer and keep looking off-campus. You can always back out later (ethically questionable but everyone does it).")
                ]
            },
            
            # ACADEMICS
            {
                "title": "My attendance is 62%. Will medical certificates work?",
                "content": "The college says minimum 75% is required or I'll get a backlog. Has anyone survived with 60%? Are HODs actually strict about this or is it just a scare tactic?",
                "category": "academics", "tags": "attendance, college, panic", "author": "Priyanshi Sharma",
                "views": 842, "likes": 94, "time_offset": days_ago(1),
                "comments": [
                    ("academics", "I had attendance shortage too last semester. Went to the HOD with my parents and a medical certificate. He approved it but shouted a lot."),
                    ("hostel", "Just proxy bro. Why didn't you ask your roommates?"),
                    ("academics", "Depends on your university. VIT is super strict. Others might let it slide if your internal marks are good."),
                    ("general", "I thought I was the only one. Waking up at 8 AM is torture."),
                    ("wellness", "If you missed classes due to mental health, please talk to the counselor. They can actually intervene on your behalf.")
                ]
            },
            {
                "title": "How to clear backlogs without losing your mind?",
                "content": "I failed Engineering Drawing and M2 in my first year. Now I'm in 3rd year and the ATKT exams are clashing with my regular mid-sems. I'm completely overwhelmed.",
                "category": "academics", "tags": "backlogs, exams, engineering", "author": "Kunal Verma",
                "views": 530, "likes": 42, "time_offset": days_ago(4),
                "comments": [
                    ("academics", "M2 is a nightmare. I cleared it after 3 attempts. Just practice previous year papers. They repeat 80% of the questions."),
                    ("academics", "Focus on the regular mid-sems first. ATKT can be cleared by just attempting all questions and drawing neat diagrams."),
                    ("wellness", "Please don't panic. Almost 40% of the batch gets a backlog at some point. It won't ruin your career."),
                    ("general", "This happened to me during placements. I had an active backlog. It was stressful but I cleared it."),
                    ("academics", "Use YouTube. Gajendra Purohit for Math. Literally saved my degree.")
                ]
            },
            
            # WELLNESS
            {
                "title": "Deleted LinkedIn for a month. Best decision ever.",
                "content": "Seeing everyone post 'I am thrilled to announce...' was destroying my self-esteem. I took a 30 day detox. I realized nobody actually cares about those posts. Stop comparing your behind-the-scenes with someone else's highlight reel.",
                "category": "wellness", "tags": "linkedin, mental-health, advice", "author": "Siddharth Menon",
                "views": 1530, "likes": 342, "time_offset": days_ago(10),
                "comments": [
                    ("wellness", "This advice actually worked for me. I deactivated my account last week."),
                    ("placements", "I agree, but unfortunately recruiters do check LinkedIn. It's a necessary evil."),
                    ("wellness", "I thought I was the only one feeling insecure scrolling through it. The humble bragging is insane."),
                    ("general", "Bro same 😂 'I am humbled to drink water today...'"),
                    ("academics", "It's so toxic. Just use it for jobs and close the tab. Don't read the feed.")
                ]
            },
            {
                "title": "Is it okay to have no friends in 3rd year?",
                "content": "I lost touch with my first year friend group. Now everyone has their solid cliques. I sit alone in the canteen and library. It feels so isolating. Does anyone else relate?",
                "category": "wellness", "tags": "lonely, friends, college", "author": "Kavya Singh",
                "views": 940, "likes": 145, "time_offset": days_ago(5),
                "comments": [
                    ("wellness", "I am exactly in the same situation. I just put my headphones on and pretend I'm busy. It hurts sometimes."),
                    ("student-life", "Join a club! It's the easiest way to meet people with similar interests in 3rd year."),
                    ("hostel", "Being alone is better than being with toxic friends. Trust me, my hostel group was awful."),
                    ("wellness", "We're in this together. DMs are open if you ever want to chat."),
                    ("general", "Same. College isn't always like the movies. It's okay to just focus on yourself.")
                ]
            },

            # HOSTEL
            {
                "title": "My roommate plays Valorant till 3 AM screaming.",
                "content": "Guys I need advice. He screams in the mic. I have morning classes at 8 AM. I've tried talking to him nicely but he just says 'bro adjust karle'. I am sleep deprived.",
                "category": "hostel", "tags": "hostel, roommates, sleep", "author": "Rahul Dravid",
                "views": 612, "likes": 88, "time_offset": hours_ago(8),
                "comments": [
                    ("hostel", "My roommate is exactly like this. I had to complain to the warden to change my room."),
                    ("general", "Buy good earplugs. Or disconnect the WiFi router at 1 AM. 😂"),
                    ("hostel", "Talk to the warden. Don't 'adjust'. It's your room too and your sleep is important."),
                    ("coding", "Tell him if he's hard stuck in Silver he should just sleep instead of ruining yours."),
                    ("wellness", "Lack of sleep will ruin your mental health. Please take strict action.")
                ]
            },
            {
                "title": "Homesickness is killing me. Miss my mom's food.",
                "content": "It's my first month in the hostel. The mess food is terrible (dal looks like yellow water). I cry almost every night. How do you guys deal with this?",
                "category": "hostel", "tags": "hostel, homesick, food", "author": "Rishi Kumar",
                "views": 432, "likes": 56, "time_offset": days_ago(12),
                "comments": [
                    ("hostel", "The first month is the hardest. You'll get used to the terrible food. Find a good local Maggi spot."),
                    ("wellness", "It's completely normal to cry. Allow yourself to feel it. Call your parents every evening."),
                    ("hostel", "Learn to make instant oats and keep a stock of cup noodles. Mess food never gets better."),
                    ("student-life", "Hang out with friends in the common room. Distraction helps a lot with homesickness."),
                    ("general", "Bro same 😭 I went home last weekend just to eat paneer.")
                ]
            },

            # CODING
            {
                "title": "I solved 400 LC questions and still blanked in OA",
                "content": "I've been grinding Leetcode since 2nd year. Yesterday was an OA and I literally blanked out on a simple sliding window problem. Am I just not meant for coding?",
                "category": "coding", "tags": "leetcode, oa, burnout", "author": "Aarav Mehta",
                "views": 2100, "likes": 203, "time_offset": days_ago(1),
                "comments": [
                    ("coding", "It's performance anxiety, not a skill issue. You know the concepts. Doing it under a timer is different."),
                    ("placements", "Don't beat yourself up. OAs are getting ridiculously hard. Companies are asking CP level questions."),
                    ("coding", "Start giving virtual contests on Codeforces or LC. It builds the timer pressure habit."),
                    ("wellness", "You are burnt out. 400 questions is a lot. Take a one week break completely away from the keyboard."),
                    ("coding", "Which company OA was this? Amazon?")
                ]
            },
            {
                "title": "Is open source actually helpful for jobs?",
                "content": "Everyone on Twitter says 'contribute to open source'. But the codebases are massive and I can't even figure out how to setup the local environment. Does it actually help in getting a job?",
                "category": "coding", "tags": "open-source, jobs, github", "author": "Omkar Naik",
                "views": 850, "likes": 75, "time_offset": days_ago(6),
                "comments": [
                    ("coding", "Yes! I got my internship through an open source contribution. Don't start with big repos like React. Start with smaller tools you actually use."),
                    ("placements", "It sets your resume apart from the 1000s of 'Netflix Clone' projects."),
                    ("coding", "The environment setup is the hardest part. Once you fix a small typo or documentation issue, you get the confidence to fix bugs."),
                    ("general", "I tried GSoC once. Got completely overwhelmed and quit. Mad respect to people who do it."),
                    ("coding", "Look for 'good first issue' labels on GitHub. Maintainers are usually very helpful.")
                ]
            },

            # STUDENT LIFE
            {
                "title": "How do you guys manage time for hobbies?",
                "content": "Between 9 to 5 classes, assignments, and preparing for placements, I literally have zero time for playing guitar. My days are just a blur. Anyone found a balance?",
                "category": "student-life", "tags": "time-management, hobbies", "author": "Testing User",
                "views": 540, "likes": 65, "time_offset": days_ago(3),
                "comments": [
                    ("student-life", "You don't find time, you make time. Block 30 minutes before sleeping just for guitar. No phone, no studies."),
                    ("academics", "I usually finish assignments during boring lectures. Frees up my evening."),
                    ("wellness", "Don't sacrifice your hobbies. They are what keep you sane during the placement grind."),
                    ("hostel", "We started a jam session in the hostel common room every Sunday. It forces me to play."),
                    ("general", "I thought I was the only one. My guitar is just catching dust in the corner.")
                ]
            },
            {
                "title": "College festivals are overrated.",
                "content": "Unpopular opinion: College fests are just crowded, noisy, and way too expensive. I'd rather stay in my room and watch Netflix. Anyone else skipping the upcoming fest?",
                "category": "student-life", "tags": "fests, introvert, college", "author": "Diya Kapoor",
                "views": 1100, "likes": 180, "time_offset": days_ago(8),
                "comments": [
                    ("general", "This! 💯 The food stalls overcharge for everything and the EDM nights are just sweaty mosh pits."),
                    ("student-life", "I disagree completely. Fests are where you make the best memories. You'll miss this when you graduate."),
                    ("hostel", "I only go for the free merchandise at the sponsor booths. 😂"),
                    ("wellness", "As an introvert, large crowds give me panic attacks. I skip them every year."),
                    ("academics", "I use fest days to catch up on my sleep and backlogs. Campus is empty, library is peaceful.")
                ]
            }
        ]
        
        posts_data.extend([
            {
                "title": "Resume review thread for SDE roles",
                "content": "Drop your anonymized resumes here. I'm a senior who recently bagged an offer from Microsoft. I will review as many as I can today.",
                "category": "placements", "tags": "resume, review, sde", "author": "Arjun Kulkarni",
                "views": 4500, "likes": 512, "time_offset": hours_ago(5),
                "comments": [
                    ("placements", "Thanks for doing this! Here's mine: [Link]"),
                    ("coding", "Can you check my projects section? Not sure if it's too detailed."),
                    ("placements", "Is a 1-page resume strictly required for 2+ YOE?"),
                    ("general", "Following this thread for tips.")
                ]
            },
            {
                "title": "Tips for scoring high in internal vivas?",
                "content": "I always study well but freeze during viva voce when the external examiner cross questions. How do you maintain confidence?",
                "category": "academics", "tags": "viva, exams, tips", "author": "Sneha Iyer",
                "views": 620, "likes": 45, "time_offset": days_ago(3),
                "comments": [
                    ("academics", "Just answer confidently. Even if you're wrong, say it with confidence."),
                    ("wellness", "Take a deep breath before answering. It's okay to say 'I don't know the exact answer but I can try'."),
                    ("academics", "Memorize the first 3 lines of every definition perfectly.")
                ]
            },
            {
                "title": "Feeling constantly burnt out.",
                "content": "Does anyone else wake up feeling exhausted even after 8 hours of sleep? I feel like I'm running on empty every single day.",
                "category": "wellness", "tags": "burnout, sleep, health", "author": "Kavya Singh",
                "views": 1200, "likes": 230, "time_offset": hours_ago(20),
                "comments": [
                    ("wellness", "Get your Vitamin D and B12 checked! It's a common issue for hostelers."),
                    ("general", "Same. The constant grind culture is toxic."),
                    ("wellness", "Try taking a complete break on Sundays. No laptop, no books.")
                ]
            },
            {
                "title": "Best midnight snacks for hostel?",
                "content": "Getting bored of Maggi every night. What are some easy to make snacks that don't require a stove?",
                "category": "hostel", "tags": "food, snacks, midnight", "author": "Rahul Dravid",
                "views": 340, "likes": 65, "time_offset": days_ago(1),
                "comments": [
                    ("hostel", "Peanut butter sandwich with bananas. Elite."),
                    ("student-life", "We literally make cold coffee in a shaker with milk powder."),
                    ("hostel", "Bhel puri packets! Just add onions and tomatoes.")
                ]
            },
            {
                "title": "Anyone doing Web3 development?",
                "content": "Is Web3 dead or is it still worth learning? I see fewer jobs for Solidity devs now compared to 2022.",
                "category": "coding", "tags": "web3, crypto, jobs", "author": "Omkar Naik",
                "views": 890, "likes": 42, "time_offset": days_ago(8),
                "comments": [
                    ("coding", "AI is the new Web3 bro. Pivot to AI."),
                    ("coding", "It's not dead, just stabilized. Still good money if you are actually good at it."),
                    ("placements", "Better to stick to full stack for on-campus placements. Very few Web3 companies visit.")
                ]
            },
            {
                "title": "Join our music club jamming session!",
                "content": "We're organizing an acoustic jamming session near the amphi this Friday at 6 PM. Bring your instruments! All are welcome.",
                "category": "student-life", "tags": "music, club, event", "author": "Diya Kapoor",
                "views": 560, "likes": 120, "time_offset": hours_ago(2),
                "comments": [
                    ("student-life", "Can I join if I don't know how to play but just want to listen?"),
                    ("student-life", "Yes! Audience is heavily appreciated."),
                    ("general", "Finally something fun happening on campus!")
                ]
            }
        ])

        
        user_list = [u for u in users]
        
        # Helper to get users by persona
        def get_users_by_persona(p):
            # fallback to general if none found
            matched = [u for u in user_list if user_personas[u.id] == p]
            if not matched:
                return [random.choice(user_list)]
            return matched

        for pdata in posts_data:
            author = next((u for u in user_list if u.name == pdata["author"]), main_user)
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
            db.commit()
            db.refresh(post)
            
            # Generate comments based on the defined context logic
            parent_comments = []
            for persona_req, text in pdata["comments"]:
                c_user = random.choice(get_users_by_persona(persona_req))
                c_time = post.created_at + timedelta(minutes=random.randint(10, 600))
                
                # Random chance to make it a nested reply
                if parent_comments and random.random() < 0.3:
                    parent = random.choice(parent_comments)
                    reply = models.Comment(
                        post_id=post.id,
                        user_id=c_user.id,
                        parent_id=parent.id,
                        content=text,
                        created_at=c_time
                    )
                    db.add(reply)
                else:
                    comment = models.Comment(
                        post_id=post.id,
                        user_id=c_user.id,
                        content=text,
                        created_at=c_time
                    )
                    db.add(comment)
                    db.commit()
                    db.refresh(comment)
                    parent_comments.append(comment)
                    
        db.commit()
        
        print("Seeding Bookmarks & Notifications...")
        
        # Add some notifications
        notifs = [
            ("New Reply", "Aarav Mehta replied to your comment on 'How do you guys manage time for hobbies?'"),
            ("Trending", "Hot discussion in Placements: 'Rejected after 4 rounds at Google.'"),
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
        print("Database seeded successfully with rich context-aware BIOTHON 2026 data!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
