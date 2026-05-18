# QNA API — Code Challenge Milestone 2

A RESTful API for a Simple Q&A Forum application built with **NestJS**, **PostgreSQL**, **Prisma ORM**, and **JWT Authentication**.

---

## Tech Stack

- **Framework:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT (JSON Web Token) + Passport.js
- **Password Hashing:** bcrypt
- **API Documentation:** Swagger UI (`/api/docs`)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/egaherawati10/qna-api.git
cd qna-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
PORT=3001
```

### 4. Run database migration

```bash
npx prisma migrate dev
```

### 5. (Optional) Seed the database

```bash
npx prisma db seed
```

### 6. Start the server

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

Server will run on: `http://localhost:3001`

---

## API Documentation (Swagger)

Once the server is running, open:

```
http://localhost:3001/api/docs
```

Click **Authorize** and paste your JWT token (obtained from `POST /api/auth/login`) to access protected endpoints.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/:id` | View a user's public profile | ❌ |

### Threads

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/threads` | List all threads | ❌ |
| POST | `/api/threads` | Create a new thread | ✅ |
| GET | `/api/threads/my-threads` | List my threads | ✅ |
| GET | `/api/threads/:id` | Get thread detail | ❌ |
| PUT | `/api/threads/:id` | Update a thread (owner only) | ✅ |
| DELETE | `/api/threads/:id` | Delete a thread (owner only) | ✅ |

---

## Error Responses

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad Request — validation error |
| 401 | Unauthorized — missing or invalid JWT |
| 403 | Forbidden — not the resource owner |
| 404 | Not Found — resource doesn't exist |
| 409 | Conflict — email/username already taken |
| 500 | Internal Server Error |

---

## Screenshots

### POST `/api/auth/register`

Register new account
![Register new account](public/assets/register/pre-register.png)

Register success
![Register success response](public/assets/register/register-response.png)

Re-register with same email
![Re-register with same email error response](public/assets/register/same-email-error.png)

### POST `/api/auth/login`

Successfully logged in
![Login successful](public/assets/login/login-response.png)

Invalid credentials
![Invalid credentials response](public/assets/login/invalid-credential-response.png)

GET `/api/users/:id`

User found
![User found](public/assets/usersId/get-usersId.png)

User not found
![User not found](public/assets/usersId/user-not-found.png)

### GET `/api/threads`

Get all threads
![Get all threads](public/assets/threads/get-all-threads.png)

All threads
![All threads](public/assets/threads/all-threads.png)

### GET `/api/threads/:id`

Get thread by Id
![Get thread by id](public/assets/threads/get-thread-by-id.png)

### POST `/api/threads`

Post thread
![Post a thread](public/assets/threads/post-thread.png)

### GET `/api/threads/my-thread`

Get my threads
![Get my threads](public/assets/threads/get-my-threads.png)

### PUT `/api/threads/:id`

Update others' thread
![Update others' thread](public/assets/threads/update-others-thread.png)

Update my thread
![Update my own thread](public/assets/threads/update-my-thread.png)

### DELETE `/api/threads/:id`

Delete others' thread
![Delete others' thread](public/assets/threads/delete-others-thread.png)

Delete my thread
![Delete my own thread](public/assets/threads/delete-my-thread.png)