# HackConnect

A modern hackathon team-finding platform powered by Appwrite, Next.js 15, and FastAPI.

## 🏗️ Monorepo Structure

This is a monorepo containing both frontend and backend services:

```
HackConnect/
├── frontend/              # Next.js 15 + TypeScript + Shadcn/ui
├── backend/               # FastAPI + Python + Appwrite SDK
├── docs/                  # Project documentation
├── scripts/               # Utility scripts
├── .github/               # CI/CD workflows
└── prd.md                 # Product Requirements Document
```

## 🚀 Quick Start

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 👥 Team

- **Ansh** - Architect & Lead (Appwrite setup, matching algorithm, integration)
- **Navdeep** - Frontend Lead (UI screens, Realtime Chat)
- **Harshit** - Backend Lead (FastAPI endpoints, Appwrite Python SDK)
- **Aditya** - Ops & QA (Appwrite Console, seed data, testing)

## 📋 Sprint Timeline

12-day development sprint (See `prd.md` for details):
- **Phase 1 (Days 1-3)**: Foundation & Appwrite Setup
- **Phase 2 (Days 4-6)**: Auth & Discovery
- **Phase 3 (Days 7-9)**: Dream Team & Chat
- **Phase 4 (Days 10-12)**: AI & Polish

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Shadcn/ui, Tailwind CSS
- **Backend**: FastAPI, Python, Appwrite Python SDK
- **BaaS**: Appwrite Cloud (Auth, Database, Storage, Realtime)
- **AI**: Gemini API
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📚 Documentation

See the `docs/` folder for:
- API documentation
- Appwrite schema definitions
- Deployment guides
- Team workflows

## 🔑 Environment Setup

Both frontend and backend require environment variables. See:
- `frontend/.env.example`
- `backend/.env.example`
