from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker
from config import settings

async_engine = create_async_engine(settings.DB_URL)

async_session = async_sessionmaker(async_engine,autocommit=False, autoflush=False)
