from schemas.users import UserModel
from fastapi import Depends,APIRouter
from depends import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from services.user_services import register_services

router = APIRouter(prefix="/users",tags=["Users"])

@router.post("/register")
async def register(user:UserModel,db:AsyncSession = Depends(get_db)):
    return await register_services(user,db)