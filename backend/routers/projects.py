"""Projects CRUD router."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, auth as auth_utils
from schemas import ProjectCreate, ProjectOut

router = APIRouter()


@router.get("/", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).order_by(models.Project.sort_order.desc()).all()


@router.post("/", response_model=ProjectOut)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(auth_utils.get_current_admin),
):
    item = models.Project(**payload.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=ProjectOut)
def update_project(
    item_id: int,
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(auth_utils.get_current_admin),
):
    item = db.query(models.Project).filter(models.Project.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in payload.dict().items():
        setattr(item, k, v)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_project(
    item_id: int,
    db: Session = Depends(get_db),
    _: models.AdminUser = Depends(auth_utils.get_current_admin),
):
    item = db.query(models.Project).filter(models.Project.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"ok": True}
