# PeerMindHub (Part of BIOTHON 2026 Presentation under FleetAI)
## AI Powered Student Mental Wellness Platform

PeerMindHub is a comprehensive, production-ready MVP for BIOTHON 2026 (presented under the FleetAI initiative). It provides a secure, anonymous, and AI-powered mental wellness platform for students.

## Features
- **Dashboard**: Track your mental wellness journey.
- **Mood Tracker**: Log your mood and visualize trends.
- **Private Journals**: Document your thoughts with AI-powered sentiment analysis (VADER).
- **Community Forums**: Connect anonymously with peers in a safe environment.
- **Resource Directory**: Verified mental health resources.
- **AI Assistant**: Gemini-powered conversational assistant for empathetic support.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: FastAPI, Python, SQLite (SQLAlchemy)
- **AI**: Google Generative AI (Gemini), VADER Sentiment Analysis
- **Authentication**: JWT, bcrypt

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+
- Google Gemini API Key

### Backend Setup
1. `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Set env var: `GEMINI_API_KEY=your_key`
6. Run: `uvicorn main:app --reload`

### Frontend Setup
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`
