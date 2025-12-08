# HackConnect Backend

FastAPI service with Appwrite Python SDK and Gemini AI integration.

## 📁 Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── routes/            # API route handlers
│   │   │   ├── auth.py        # Authentication endpoints
│   │   │   ├── hackathons.py  # Hackathon endpoints
│   │   │   ├── teams.py       # Team management
│   │   │   ├── matching.py    # Dream Team matching
│   │   │   └── ai.py          # Gemini AI endpoints
│   │   └── deps.py            # API dependencies
│   ├── services/
│   │   ├── appwrite.py        # Appwrite service layer
│   │   ├── matching.py        # Matching algorithm
│   │   └── gemini.py          # Gemini AI service
│   ├── models/
│   │   ├── user.py            # User schemas
│   │   ├── hackathon.py       # Hackathon schemas
│   │   ├── team.py            # Team schemas
│   │   └── message.py         # Message schemas
│   ├── core/
│   │   ├── config.py          # Configuration settings
│   │   └── security.py        # Security utilities
│   ├── utils/
│   │   └── helpers.py         # Helper functions
│   └── main.py                # FastAPI application entry
├── tests/
│   ├── test_routes/           # Route tests
│   └── test_services/         # Service tests
├── .env                       # Environment variables (create from .env.example)
├── requirements.txt           # Python dependencies
└── README.md
```

## 🎯 Responsibilities

**Harshit (Backend Lead):**
- Build FastAPI endpoints using Appwrite Python SDK
- Implement business logic for teams, hackathons
- Handle complex data operations
- Integrate with frontend via REST API

**Ansh (Architect):**
- Develop matching algorithm
- Appwrite database schema design
- Integration and deployment

## 🚀 Getting Started

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🔌 Key Endpoints

```
POST   /api/auth/login          # User authentication
GET    /api/recommendations      # Get hackathon recommendations
POST   /api/teams/create         # Create new team
POST   /api/teams/join           # Join existing team
GET    /api/matching/dream-team  # Get matching suggestions
POST   /api/ai/summarize         # Generate AI summary
```

## 🛠️ Services

- **Appwrite Service**: Database operations using Python SDK
- **Matching Service**: Algorithm for finding compatible teammates
- **Gemini Service**: AI-powered summaries and insights

## 📦 Dependencies

- `fastapi` - Web framework
- `appwrite` - Appwrite Python SDK
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `google-generativeai` - Gemini API client
