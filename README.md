# VetNary System

A veterinary ecosystem for Sri Lanka — turning the traditional physical vet book into a secure, AI-powered digital platform. Modeled on the Uber two-sided marketplace concept: **clinics** (supply) and **pet owners** (demand) connected through a shared platform.

---

## Table of Contents

- [Roles & Access Hierarchy](#roles--access-hierarchy)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Backend (NestJS)](#backend-nestjs)
- [Web Frontend (Next.js)](#web-frontend-nextjs)
- [Mobile App (Expo / React Native)](#mobile-app-expo--react-native)
- [Database Schema (Prisma / PostgreSQL)](#database-schema-prisma--postgresql)
- [Authentication & Security Flow](#authentication--security-flow)
- [Setup Instructions](#setup-instructions)

---

## Roles & Access Hierarchy

| Role           | Platform   | Description                                                        |
|----------------|------------|--------------------------------------------------------------------|
| `MAIN_ADMIN`   | Web        | Full system control, role management, platform monitoring          |
| `MINOR_ADMIN`  | Web        | Customer support, ticket routing                                   |
| `VET`          | Web        | Independent branch management, financials, patient records         |
| `CUSTOMER`     | Mobile     | Pet management, VetBook, clinic discovery, AI skin scanner, chatbot |

---

## Tech Stack

| Layer            | Technology                                |
|------------------|-------------------------------------------|
| Web Frontend     | Next.js, React, shadcn/ui, TailwindCSS    |
| Mobile App       | React Native (Expo Router), Neobrutalism UI |
| Backend API      | Node.js (NestJS, TypeScript)              |
| Database & ORM   | PostgreSQL with Prisma ORM                |
| Auth & Security  | JWT via Passport.js (@nestjs/passport)    |
| AI               | Google Gemini API (`@google/genai`)       |

*Note: The platform architecture has evolved from its initial Python (FastAPI) and Supabase-centric design to a robust NestJS backend with Prisma to provide better type safety and centralized business logic.*

---

## Project Structure

```text
Vetnary-System/
├── vetnary-api/                # NestJS Backend API
│   ├── src/                    # Controllers, Services, Modules
│   ├── prisma/                 # Prisma schema & seed scripts
│   ├── test/                   # E2E & Unit tests
│   ├── API_DOCS.md             # Detailed endpoint documentation
│   └── package.json            # Backend dependencies
│
├── web/                        # Next.js clinic/admin dashboard
│   ├── src/app/                # App router (dashboard, login, etc)
│   ├── src/components/         # UI components & shadcn
│   └── package.json            # Web dependencies
│
├── mobile/                     # Expo / React Native customer app
│   ├── app/                    # Tab navigation & screens
│   ├── components/             # Reusable RN components
│   └── package.json            # Mobile dependencies
│
└── README.md                   # ← You are here
```

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE TIER                         │
│  ┌──────────┐                                               │
│  │ Database │  PostgreSQL                                   │
│  │ (Prisma) │                                               │
│  └────┬─────┘                                               │
└───────┼─────────────────────────────────────────────────────┘
        │
   ┌────┴──────────────┐
   │ NestJS Backend    │
   │ - JWT Auth        │
   │ - AI Integration  │
   │ - Role Guards     │
   └──┬───────────┬────┘
      │           │
┌─────┴──────┐ ┌──┴──────────┐
│  Web App   │ │ Mobile App  │
│ (Next.js)  │ │   (Expo)    │
│            │ │             │
│ Dashboard  │ │ Pets/VetBook│
│ Login/Reg  │ │ Discover    │
│ Admin      │ │ AI Scanner  │
│ Vet Portal │ │ Chatbot     │
└────────────┘ └─────────────┘
```

---

## Backend (NestJS)

The backend (`vetnary-api/`) is built with **NestJS**, a progressive Node.js framework providing a modular and strongly typed architecture.

Key Features:
- **Authentication**: JWT-based authentication using `@nestjs/jwt` and `@nestjs/passport`. Passwords are hashed using `bcrypt`.
- **Validation**: Strict payload validation using `class-validator` and `class-transformer`.
- **Database Access**: Relational data management via `Prisma` ORM connecting to a PostgreSQL database.
- **AI Integration**: Endpoints like `/ai/scan-skin` and `/ai/chat` communicate with the Google Gemini API to analyze images and power the VetBot assistant.
- **Rate Limiting**: Configured using `@nestjs/throttler` to prevent abuse.

Refer to `vetnary-api/API_DOCS.md` for a comprehensive list of all endpoints, expected payloads, and responses.

---

## Web Frontend (Next.js)

The web dashboard (`web/`) serves Clinic Staff and Administrators. It leverages the Next.js App Router for optimized routing and layout nesting.

Key Features:
- **Role-Based Views**: Tailored dashboards for `MAIN_ADMIN`, `MINOR_ADMIN`, and `VET`.
- **Clinic Registration**: Multi-step registration to onboard clinics seamlessly.
- **UI Components**: Built with `shadcn/ui` and `TailwindCSS` for a clean, accessible interface.

---

## Mobile App (Expo / React Native)

The mobile application (`mobile/`) is designed for Customers (Pet Owners). It uses Expo Router for file-based navigation.

Key Features:
- **Pets Management**: Add and manage pet profiles.
- **VetBook**: A centralized timeline combining medical records and vaccination history.
- **Discover**: Locate registered clinics.
- **AI Skin Scanner**: Upload pet skin images for AI-powered disease detection and recommendations.
- **VetBot Chat**: Conversational AI specializing in veterinary medicine and pet health.

---

## Database Schema (Prisma / PostgreSQL)

The data model is defined in `vetnary-api/prisma/schema.prisma`. 

### Key Entities
- **User**: The central identity (Customer, Vet, Admins).
- **Clinic**: Veterinary practices containing Staff, Appointments, and Records.
- **Pet**: Customer-owned animals linking to MedicalRecords and Vaccinations.
- **Appointment & Queue**: Real-world bookings and live clinic queue management.
- **Invoice**: Billing records linked to appointments or walk-ins.
- **SupportTicket**: Admin support system for users and clinics.

---

## Authentication & Security Flow

1. **Registration/Login**: Users authenticate via `/auth/login` and receive a JWT `access_token`.
2. **API Requests**: The client passes the token in the `Authorization: Bearer <token>` header.
3. **Guards (Zero Trust)**: NestJS AuthGuards intercept the request, validate the JWT, and attach the user payload to the request object.
4. **Role Authorization**: Role Guards verify that the user's role matches the required roles for the specific endpoint.

---

## Setup Instructions

### Database Configuration
1. Ensure you have a running PostgreSQL instance.
2. In `vetnary-api/`, copy `.env.example` to `.env` (if available) or create a `.env` file and set your `DATABASE_URL`.

### Backend
```bash
cd vetnary-api
pnpm install
# Push the Prisma schema to the database
npx prisma db push
# Seed the database (optional)
pnpm run prisma:seed
# Start the development server
pnpm run start:dev
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

---

## License

© 2026 VetNary SL. All rights reserved.
