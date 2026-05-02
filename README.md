# AI Study Assistant

A full-stack web app that helps students summarize notes and generate study questions using AI.

Built with React, Node.js, Express, MongoDB, and Groq AI.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit, RTK Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **AI:** Groq API (LLaMA 3.3)
- **Auth:** JWT

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Groq API key → [console.groq.com](https://console.groq.com)

---

### 1. Clone the repo

```bash
git clone https://github.com/aakashverse/ai-study-assistant.git
cd ai-study-assistant
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside `/frontend`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Features

- JWT-based Signup / Login
- Paste notes and summarize with AI
- Generate 5 study questions from any text
- View and delete past history
- Responsive UI

---

## Deployment

| Part | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

Set environment variables on each platform before deploying.

---

## Folder Structure
ai-study-assistant/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
└── frontend/
└── src/
├── app/
├── components/
├── features/
└── pages/

---

## Author

AKASH YADAV