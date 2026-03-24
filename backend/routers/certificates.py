"""Certificates CRUD router."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, auth as auth_utils
from schemas import CertificateCreate, CertificateOut

router = APIRouter()


@router.get("/", response_model=List[CertificateOut])
def list_certificates(db: Session = Depends(get_db)):
    return db.query(models.Certificate).order_by(models.Certificate.sort_order.desc()).all()


@router.post("/", response_model=CertificateOut)
def create_certificate(
    payload: CertificateCreate,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(auth_utils.get_current_admin),
):
    item = models.Certificate(**payload.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=CertificateOut)
def update_certificate(
    item_id: int,
    payload: CertificateCreate,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(auth_utils.get_current_admin),
):
    item = db.query(models.Certificate).filter(models.Certificate.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in payload.dict().items():
        setattr(item, k, v)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_certificate(
    item_id: int,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(auth_utils.get_current_admin),
):
    item = db.query(models.Certificate).filter(models.Certificate.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"ok": True}
