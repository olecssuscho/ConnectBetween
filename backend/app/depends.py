from database import async_session

async def get_db():
    async with async_session() as conn:
        yield conn