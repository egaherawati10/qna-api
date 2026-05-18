# 🗣️ Simple Q&A Forum API

A RESTful API for a Simple Q&A Forum application where users can ask questions and participate in discussions. Built as part of a 2-day backend code challenge.

---

## 📋 Objective

Build a secure RESTful API that allows users to register, log in, create discussion threads, and manage their own content. The system enforces authentication and authorization — users can only update or delete threads they created themselves.

---

## ✨ Features

- **User Management** — Registration, login with JWT token generation, and public profile viewing
- **CRUD Threads** — Create, read, update, and delete discussion threads
- **Authorization** — Users can only modify or delete their own threads
- **Validation & Error Handling** — Handles empty inputs, invalid email formats, and unauthorized access with proper HTTP status codes (`400`, `401`, `403`, `404`, `500`)
- **Database Relations** — One-to-many relationship between `users` and `threads`

---

## 🛠️ Tech Stack

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL (hosted on [Supabase](https://supabase.com))
- **ORM:** Prisma
- **Auth:** JWT (JSON Web Tokens) via `@nestjs/jwt` & `passport-jwt`
- **Validation:** `class-validator` & `class-transformer`
- **Config:** Environment variables via `.env`

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+) and npm
- A [Supabase](https://supabase.com) account with a PostgreSQL project set up

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then fill in your Supabase credentials and JWT secret

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the development server
npm run start:dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

# Supabase PostgreSQL connection (Prisma format)
DATABASE_URL="postgresql://postgres:your_db_password@your-supabase-host.supabase.co:5432/postgres?schema=public"

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

---

## 📡 API Endpoints

### User & Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/api/auth/register` | Register a new user (password is hashed in DB) | ❌ |
| `POST` | `/api/auth/login` | Log in and receive a JWT token | ❌ |
| `GET` | `/api/users/:id` | View a user's public profile by ID | ❌ |

### Thread Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/api/threads` | Create a new thread/question | ✅ |
| `GET` | `/api/threads` | List all threads from all users | ❌ |
| `GET` | `/api/threads/my-threads` | List threads of the logged-in user | ✅ |
| `GET` | `/api/threads/:id` | View details of a specific thread | ❌ |
| `PUT` | `/api/threads/:id` | Update a thread *(creator only)* | ✅ |
| `DELETE` | `/api/threads/:id` | Delete a thread *(creator only)* | ✅ |

> **Protected routes** require a `Bearer` token in the `Authorization` header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

---

## 📂 Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database schema & models
│   └── migrations/         # Auto-generated migration files
├── src/
│   ├── auth/               # Auth module (register, login, JWT strategy)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   └── dto/
│   ├── users/              # Users module (profile)
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   ├── threads/            # Threads module (CRUD)
│   │   ├── threads.controller.ts
│   │   ├── threads.service.ts
│   │   ├── threads.module.ts
│   │   └── dto/
│   ├── prisma/             # Prisma service (shared DB client)
│   │   └── prisma.service.ts
│   └── main.ts             # App entry point (Swagger setup)
├── .env.example
├── package.json
└── README.md
```

---

## 📬 Deliverables

- [x] Public GitHub repository with complete source code
- [x] API documentation via Swagger UI / OpenAPI (screenshots included)
  - Endpoint URL and HTTP method
  - Required request bodies, headers, and parameters
  - Expected responses for success (`200`, `201`) and error states (`400`, `401`, `404`)

---

## 📄 License

This project was built as part of a timed code challenge. Feel free to use it as a reference.