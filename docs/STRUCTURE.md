# HackConnect - Complete Project Structure

## 📋 Full Directory Tree

```
HackConnect/                          # Root monorepo
│
├── frontend/                         # Next.js 15 Frontend Application
│   ├── src/
│   │   ├── app/                      # Next.js App Router (v15)
│   │   │   ├── (auth)/               # Auth route group
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── (main)/               # Main app route group
│   │   │   │   ├── dashboard/
│   │   │   │   ├── explore/
│   │   │   │   ├── teams/
│   │   │   │   ├── chat/
│   │   │   │   └── profile/
│   │   │   ├── layout.tsx            # Root layout
│   │   │   ├── page.tsx              # Landing page
│   │   │   └── globals.css           # Global styles
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                   # Shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...               # Other Shadcn components
│   │   │   ├── layout/               # Layout components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   └── features/             # Feature-specific components
│   │   │       ├── HackathonCard.tsx
│   │   │       ├── TeamCard.tsx
│   │   │       ├── ChatMessage.tsx
│   │   │       └── UserProfile.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── appwrite/             # Appwrite configuration
│   │   │   │   ├── client.ts         # Appwrite client setup
│   │   │   │   ├── auth.ts           # Auth helpers
│   │   │   │   ├── database.ts       # Database helpers
│   │   │   │   └── realtime.ts       # Realtime subscriptions
│   │   │   └── utils.ts              # cn() and other utilities
│   │   │
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useRealtime.ts
│   │   │   └── useHackathons.ts
│   │   │
│   │   ├── types/                    # TypeScript definitions
│   │   │   ├── user.ts
│   │   │   ├── hackathon.ts
│   │   │   ├── team.ts
│   │   │   └── message.ts
│   │   │
│   │   ├── styles/                   # Additional styles
│   │   │   └── themes.css
│   │   │
│   │   └── utils/                    # Helper functions
│   │       ├── date.ts
│   │       └── validation.ts
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── hero-bg.jpg
│   │   │   └── logo.png
│   │   └── icons/
│   │       └── favicon.ico
│   │
│   ├── .env.local                    # Environment variables
│   ├── .env.example                  # Example env file
│   ├── .eslintrc.json                # ESLint config
│   ├── .gitignore
│   ├── next.config.js                # Next.js config
│   ├── package.json
│   ├── postcss.config.js             # PostCSS config
│   ├── tailwind.config.ts            # Tailwind config
│   ├── tsconfig.json                 # TypeScript config
│   └── README.md
│
├── backend/                          # FastAPI Backend Service
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/               # API endpoints
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py           # Auth endpoints
│   │   │   │   ├── hackathons.py     # Hackathon CRUD
│   │   │   │   ├── teams.py          # Team management
│   │   │   │   ├── matching.py       # Dream Team matching
│   │   │   │   └── ai.py             # Gemini AI endpoints
│   │   │   └── deps.py               # Shared dependencies
│   │   │
│   │   ├── services/                 # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── appwrite.py           # Appwrite SDK service
│   │   │   ├── matching.py           # Matching algorithm
│   │   │   └── gemini.py             # Gemini AI service
│   │   │
│   │   ├── models/                   # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── user.py               # User models
│   │   │   ├── hackathon.py          # Hackathon models
│   │   │   ├── team.py               # Team models
│   │   │   └── message.py            # Message models
│   │   │
│   │   ├── core/                     # Core configuration
│   │   │   ├── __init__.py
│   │   │   ├── config.py             # Settings & env vars
│   │   │   └── security.py           # Security utilities
│   │   │
│   │   ├── utils/                    # Helper utilities
│   │   │   ├── __init__.py
│   │   │   └── helpers.py
│   │   │
│   │   ├── __init__.py
│   │   └── main.py                   # FastAPI app entry
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_routes/
│   │   │   ├── test_auth.py
│   │   │   ├── test_hackathons.py
│   │   │   └── test_teams.py
│   │   └── test_services/
│   │       ├── test_matching.py
│   │       └── test_gemini.py
│   │
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Example env file
│   ├── .gitignore
│   ├── requirements.txt              # Python dependencies
│   ├── pytest.ini                    # Pytest config
│   └── README.md
│
├── docs/                             # Project documentation
│   ├── STRUCTURE.md                  # This file
│   ├── API.md                        # API documentation
│   ├── APPWRITE_SCHEMA.md            # Database schema
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── TEAM_WORKFLOW.md              # Team collaboration guide
│
├── scripts/                          # Utility scripts
│   ├── seed-data.py                  # Seed dummy data
│   ├── setup-appwrite.py             # Appwrite initialization
│   └── deploy.sh                     # Deployment script
│
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml           # Frontend CI/CD
│       └── backend-ci.yml            # Backend CI/CD
│
├── .gitignore                        # Global gitignore
├── LICENSE
├── prd.md                            # Product Requirements
└── README.md                         # Main README
```

## 🎯 Key Principles

### Monorepo Benefits
1. **Single Source of Truth**: All code in one repository
2. **Shared Types**: TypeScript types can be shared (future enhancement)
3. **Atomic Commits**: Frontend + Backend changes in one commit
4. **Simplified CI/CD**: One repo, coordinated deployments

### Frontend Organization
- **App Router**: Next.js 15 file-based routing
- **Route Groups**: `(auth)` and `(main)` for logical separation
- **Component Structure**: UI primitives separate from feature components
- **Type Safety**: Centralized TypeScript definitions

### Backend Organization
- **Layered Architecture**: Routes → Services → Models
- **Separation of Concerns**: API logic separate from business logic
- **Testability**: Each layer independently testable
- **Scalability**: Easy to add new routes and services

## 🔄 Workflow

### Development
```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload
```

### Deployment
- **Frontend**: Vercel (automatic from `main` branch, `/frontend` directory)
- **Backend**: Render (automatic from `main` branch, `/backend` directory)

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
APPWRITE_ENDPOINT=
APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
GEMINI_API_KEY=
DATABASE_ID=
```
