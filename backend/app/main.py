from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=[settings.FRONTEND_URL],allow_methods=["*"],allow_headers=["*"])

@app.get("/")
async def greet():
    return "Hello new members from backend"
