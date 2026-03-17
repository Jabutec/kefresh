# KeFresh 💈

> South Africa's first culturally-aware beauty marketplace.
> Discover, book and pay for hair, barber and beauty services near you.

## The Vision

KeFresh connects clients with salons, barbers and stylists across South Africa.
Built for the kasi barber, the natural hair studio and the nail tech —
not just the Sandton spa.

---

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend  | Next.js API Routes                          |
| Database | PostgreSQL (Prisma Cloud)                   |
| ORM      | Prisma 7                                    |
| Auth     | Custom (bcryptjs)                           |
| Payments | Yoco (coming Sprint 3)                      |
| Hosting  | AWS Cape Town (coming Sprint 3)             |

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm v10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOURUSERNAME/kefresh.git

# Navigate into the project
cd kefresh

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL to .env

# Start the database proxy (keep this running in a separate terminal)
npx prisma dev

# Run database migrations
npx prisma migrate dev

# Seed the database with test data
npx tsx prisma/seed.ts

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
kefresh/
├── src/
│   └── app/
│       ├── page.tsx              # Landing page / feed
│       ├── login/
│       │   └── page.tsx          # Login page
│       ├── signup/
│       │   └── page.tsx          # Signup page
│       ├── salon/
│       │   └── [id]/
│       │       └── page.tsx      # Individual salon page
│       ├── booking/
│       │   └── [id]/
│       │       └── page.tsx      # Booking page
│       ├── confirmation/
│       │   └── page.tsx          # Booking confirmation
│       └── api/
│           ├── salons/
│           │   ├── route.ts      # GET, POST /api/salons
│           │   └── [id]/
│           │       └── route.ts  # GET /api/salons/[id]
│           ├── auth/
│           │   ├── signup/
│           │   │   └── route.ts  # POST /api/auth/signup
│           │   └── login/
│           │       └── route.ts  # POST /api/auth/login
│           └── bookings/
│               └── route.ts      # GET, POST /api/bookings
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Test data
│   └── migrations/               # Migration history
└── public/                       # Static assets
```

---

## Database Schema

```
Users        — clients and pros
Salons       — salon profiles
Services     — what each salon offers
Bookings     — appointments
Cards        — salon portfolio images
```

---

## API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | /api/salons      | Fetch all salons |
| POST   | /api/salons      | Create a salon   |
| GET    | /api/salons/[id] | Fetch one salon  |
| POST   | /api/auth/signup | Create account   |
| POST   | /api/auth/login  | Login            |
| GET    | /api/bookings    | Fetch bookings   |
| POST   | /api/bookings    | Create booking   |

---

## Sprint Progress

```
Sprint 1 ✅  UI — all pages built
Sprint 2 ✅  Backend — database, auth, bookings API
Sprint 3 🔲  Launch — deploy, campus beta, Yoco payments
Sprint 4 🔲  Shop — dropshipping marketplace
Sprint 5 🔲  Scale — analytics, reviews, notifications
```

---

## Environment Variables

```
DATABASE_URL=           # Prisma PostgreSQL connection string
```

---

## Founded

March 2026 — Johannesburg, South Africa 🇿🇦

Built by Jabulani Mokoena — solo founder, IT graduate, builder.
