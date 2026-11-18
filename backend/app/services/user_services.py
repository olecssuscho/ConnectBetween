from models.users import UserDB
from auth import hash_password
from sqlalchemy.ext.asyncio import AsyncSession

async def register_services(user:UserDB,db:AsyncSession):
    data = user.model_dump()
    data["password"] = hash_password(data["password"])
    user_db = UserDB(**data)
    db.add(user_db)
    db.commit()
    return f"User: {user_db.first_name} is created"