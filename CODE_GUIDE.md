# 📚 Harsha R — Portfolio Code Guide

Complete guide to understanding, running, and deploying this project.

---

## Project Structure

```
portfolio/
├── frontend/                   # React (Vite) frontend
│   ├── src/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx  # Admin panel – manage content + read messages
│   │   │   └── AdminLogin.jsx      # Login page for admin
│   │   ├── assets/                 # Images, PDFs, fonts
│   │   ├── components/             # All page sections (Hero, About, Skills, …)
│   │   ├── pages/                  # Resume page
│   │   ├── App.jsx                 # Root – fetches API data, mounts all sections
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # All styles (design tokens, components)
│   ├── index.html              # HTML entry point
│   ├── vercel.json             # Vercel SPA routing config
│   ├── .env.example            # Frontend env vars template
│   ├── vite.config.js          # Vite config
│   └── package.json            # Frontend dependencies
│
├── backend/                    # FastAPI backend
│   ├── routers/
│   │   ├── auth.py             # POST /api/auth/login, GET /api/auth/me
│   │   ├── experience.py       # CRUD /api/experience/
│   │   ├── projects.py         # CRUD /api/projects/
│   │   ├── certificates.py     # CRUD /api/certificates/
│   │   └── messages.py         # POST /api/messages/ (public), GET/PATCH/DELETE (admin)
│   ├── main.py                 # FastAPI app + CORS + router registration
│   ├── models.py               # SQLAlchemy ORM models
│   ├── schemas.py              # Pydantic request/response schemas
│   ├── database.py             # SQLite DB setup
│   ├── auth.py                 # JWT token helpers
│   ├── requirements.txt        # Python dependencies
│   ├── Procfile                # Render start command
│   └── .env.example            # Copy to .env and fill in values
│
├── .github/workflows/ci.yml    # GitHub Actions — build + dependency check
└── CODE_GUIDE.md               # This file
```

---

## Local Development

### 1. Frontend

```bash
cd portfolio/frontend
npm install
npm run dev          # starts at http://localhost:5173
```

### 2. Backend

```bash
cd portfolio/backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs → http://localhost:8000/docs

### 3. Admin Panel

1. Create an admin account (first run — use the `/api/auth/register` endpoint via the Swagger UI at `/docs`).
2. Go to `http://localhost:5173/admin-login` and log in.
3. Manage Experience, Projects, Certificates, and view Contact Messages from the sidebar.

---

## Environment Variables

### Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Deployed backend URL (e.g. `https://your-app.onrender.com`) |

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `SECRET_KEY` | JWT signing secret (use a long random string) |
| `DATABASE_URL` | SQLite path (default: `sqlite:///./portfolio.db`) |
| `SMTP_HOST` | SMTP server for email notifications |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | SMTP login email |
| `SMTP_PASS` | SMTP app password |
| `NOTIFY_EMAIL` | Where to send contact-message alerts (`harshar9177@gmail.com`) |
| `NOTIFY_PHONE` | Your phone number shown in notification emails (`8722831505`) |

---

## Deployment

### Frontend → Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo.
3. **Root directory:** `frontend`
4. **Framework:** Vite (auto-detected)
5. **Environment variables:** Add `VITE_API_URL` = your Render backend URL.
6. Deploy → Vercel builds with `npm run build` and serves `dist/`.

`vercel.json` already handles SPA routing so all React Router paths work.

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service** → connect your repo.
2. **Root directory:** `backend`
3. **Build command:** `pip install -r requirements.txt`
4. **Start command:** (from `Procfile`) `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment variables:** Add all variables from `backend/.env.example`.
6. Set `SECRET_KEY` to a long random string.
7. Deploy → the API is live. Copy the URL and set it as `VITE_API_URL` in Vercel.

### Connecting Frontend ↔ Backend

After both services are deployed:
- In **Vercel** → Settings → Environment Variables → set `VITE_API_URL=https://your-backend.onrender.com`
- Trigger a re-deploy on Vercel (Deployments → Redeploy).
- The contact form and admin panel will now use the live backend.

---

## GitHub Actions (CI/CD)

`.github/workflows/ci.yml` runs on every push/PR to `main`:

| Job | What it does |
|---|---|
| **frontend** | `npm ci` → `npm run build` (confirms no build errors) |
| **backend** | `pip install -r requirements.txt` → `python -c "import main"` |

To add auto-deploy: in Vercel and Render, enable **"Deploy on push to main"** — both platforms handle this natively when connected to GitHub.

To use `VITE_API_URL` in CI builds: add it as a **GitHub Secret** (`Settings → Secrets → Actions → New secret → VITE_API_URL`).

---

## Contact Message Flow

```
Visitor fills form → POST /api/messages/ → saved to DB → email notification sent (if SMTP configured)
                                                    ↓
                        Admin logs in → /admin-dashboard → Messages tab → reads & replies
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Vanilla CSS |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Auth | JWT (python-jose) + bcrypt |
| Deployment | Vercel (frontend) + Render (backend) |
| CI/CD | GitHub Actions |
