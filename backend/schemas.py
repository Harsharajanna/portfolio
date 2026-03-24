"""Pydantic schemas for request/response validation."""
from pydantic import BaseModel
from typing import Optional, List


# ── Auth ──────────────────────────────────────────────
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── Experience ─────────────────────────────────────────
class ExperienceBase(BaseModel):
    role: str
    company: str
    date: str
    desc: str
    tags: Optional[str] = ""
    sort_order: Optional[int] = 0

class ExperienceCreate(ExperienceBase): pass

class ExperienceOut(ExperienceBase):
    id: int
    class Config: from_attributes = True


# ── Project ────────────────────────────────────────────
class ProjectBase(BaseModel):
    title: str
    desc: str
    icon: Optional[str] = "fas fa-code"
    badge: Optional[str] = ""
    features: Optional[str] = ""
    tech: Optional[str] = ""
    github: Optional[str] = ""
    demo: Optional[str] = ""
    featured: Optional[bool] = False
    sort_order: Optional[int] = 0

class ProjectCreate(ProjectBase): pass

class ProjectOut(ProjectBase):
    id: int
    class Config: from_attributes = True


# ── Certificate ────────────────────────────────────────
class CertificateBase(BaseModel):
    title: str
    issuer: str
    platform: Optional[str] = "Coursera"
    year: Optional[str] = ""
    icon: Optional[str] = "fas fa-certificate"
    color: Optional[str] = "#f59e0b"
    verify_url: Optional[str] = ""
    tags: Optional[str] = ""
    description: Optional[str] = ""
    sort_order: Optional[int] = 0

class CertificateCreate(CertificateBase): pass

class CertificateOut(CertificateBase):
    id: int
    class Config: from_attributes = True


# ── Message ────────────────────────────────────────────
class MessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class MessageOut(MessageCreate):
    id: int
    is_read: bool = False
    created_at: Optional[str] = None
    class Config: from_attributes = True

