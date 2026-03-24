"""Auth router: login and current user."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models, auth as auth_utils
from schemas import LoginRequest, TokenResponse

router = APIRouter()

@router.on_event("startup")
async def startup_seed():
    pass  # seeding happens in main.py


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    # Auto-create default admin if none exists
    auth_utils.ensure_default_admin(db)
    
    user = db.query(models.AdminUser).filter(
        models.AdminUser.username == payload.username
    ).first()
    if not user or not auth_utils.verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = auth_utils.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def me(current_user: models.AdminUser = Depends(auth_utils.get_current_admin)):
    return {"username": current_user.username, "id": current_user.id}
