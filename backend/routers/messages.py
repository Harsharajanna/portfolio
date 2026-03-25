"""
Messages router — POST /api/messages (public), GET /api/messages (admin), PATCH /api/messages/{id}/read (admin)
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Message
from schemas import MessageCreate, MessageOut
from auth import get_current_admin
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List

router = APIRouter()

NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "harshar9177@gmail.com")
NOTIFY_PHONE = os.environ.get("NOTIFY_PHONE", "8722831505")
SMTP_HOST    = os.environ.get("SMTP_HOST", "")
SMTP_PORT    = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER    = os.environ.get("SMTP_USER", "")
SMTP_PASS    = os.environ.get("SMTP_PASS", "")


def send_notification_email(msg: Message):
    """Send an email notification when a new message arrives. Best-effort only."""
    if not SMTP_HOST or not SMTP_USER or not SMTP_PASS:
        print("[messages] SMTP not configured — skipping email notification")
        return
    try:
        body = f"""New portfolio contact message received!

From   : {msg.name}
Email  : {msg.email}
Phone  : {NOTIFY_PHONE}
Subject: {msg.subject}

---
{msg.message}
---

Log in to your admin panel to view and reply.
"""
        em = MIMEMultipart("alternative")
        em["Subject"] = f"[Portfolio] New message from {msg.name}"
        em["From"]    = SMTP_USER
        em["To"]      = NOTIFY_EMAIL
        em.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, NOTIFY_EMAIL, em.as_string())
        print(f"[messages] Email notification sent to {NOTIFY_EMAIL}")
    except Exception as e:
        print(f"[messages] Email notification failed: {e}")


@router.post("/", response_model=MessageOut, status_code=201)
def create_message(payload: MessageCreate, db: Session = Depends(get_db)):
    msg = Message(**payload.dict())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    send_notification_email(msg)
    return msg


@router.get("/", response_model=List[MessageOut])
def get_messages(db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    return db.query(Message).order_by(Message.created_at.desc()).all()


@router.patch("/{msg_id}/read")
def mark_read(msg_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    msg = db.query(Message).filter(Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    return {"ok": True}


@router.delete("/{msg_id}")
def delete_message(msg_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    msg = db.query(Message).filter(Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"ok": True}
