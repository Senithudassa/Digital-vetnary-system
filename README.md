# VetNary System

A veterinary ecosystem for Sri Lanka — turning the traditional physical vet book into a secure, AI-powered digital platform. Modelled on the Uber two-sided marketplace concept.

## Roles
- Main Admin
- Minor Admin
- Vet Doctor
- Vet Assistant
- Customer (Mobile App)

## Tech Stack
- Frontend (Clinic/Admin): Next.js with shadcn/ui
- Mobile App (Customer): React Native (Expo) with Neobrutalism UI
- Backend: Python (FastAPI)
- Database & Auth: Firebase
- AI: TensorFlow (Skin Checker) & Google Gemini (Chatbot)

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Web
```bash
cd web
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```
