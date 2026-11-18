from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import users

app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=settings.FRONTEND_URLS,allow_methods=["*"],allow_headers=["*"])
app.include_router(users.router)

@app.get("/")
async def greet():
    return "Hello new members from backend"
