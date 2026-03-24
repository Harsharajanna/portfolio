"""
SQLAlchemy ORM models.
Tables: admin_users, experiences, projects, certificates, messages
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id       = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Experience(Base):
    __tablename__ = "experiences"
    id       = Column(Integer, primary_key=True, index=True)
    role     = Column(String, nullable=False)
    company  = Column(String, nullable=False)
    date     = Column(String, nullable=False)
    desc     = Column(Text, nullable=False)
    tags     = Column(Text, default="")   # comma-separated
    sort_order = Column(Integer, default=0)


class Project(Base):
    __tablename__ = "projects"
    id       = Column(Integer, primary_key=True, index=True)
    title    = Column(String, nullable=False)
    desc     = Column(Text, nullable=False)
    icon     = Column(String, default="fas fa-code")
    badge    = Column(String, default="")
    features = Column(Text, default="")  # newline-separated
    tech     = Column(Text, default="")  # comma-separated
    github   = Column(String, default="")
    demo     = Column(String, default="")
    featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)


class Certificate(Base):
    __tablename__ = "certificates"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, nullable=False)
    issuer      = Column(String, nullable=False)
    platform    = Column(String, default="Coursera")
    year        = Column(String, default="")
    icon        = Column(String, default="fas fa-certificate")
    color       = Column(String, default="#f59e0b")
    verify_url  = Column(String, default="")
    tags        = Column(Text, default="")   # comma-separated
    description = Column(Text, default="")
    sort_order  = Column(Integer, default=0)


class Message(Base):
    __tablename__ = "messages"
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, nullable=False)
    email      = Column(String, nullable=False)
    subject    = Column(String, nullable=False)
    message    = Column(Text, nullable=False)
    is_read    = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
