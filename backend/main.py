"""
FastAPI backend entry point.
Run: uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, experience, projects, certificates, messages
import models  # noqa: ensure tables are created

# Create all DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Harsha Portfolio API", version="1.0.0")

# Allow the React dev server + production origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,         prefix="/api/auth",         tags=["Auth"])
app.include_router(experience.router,   prefix="/api/experience",   tags=["Experience"])
app.include_router(projects.router,     prefix="/api/projects",     tags=["Projects"])
app.include_router(certificates.router, prefix="/api/certificates", tags=["Certificates"])
app.include_router(messages.router,     prefix="/api/messages",     tags=["Messages"])


@app.get("/")
def root():
    return {"message": "Harsha Portfolio API is running"}
