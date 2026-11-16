from pydantic_settings import BaseSettings,SettingsConfigDict

class Settings(BaseSettings):
    FRONTEND_URLS:list[str]

    model_config = SettingsConfigDict(env_file=r"D:\ProjeckPy\ConnectBetween\backend\.env",env_file_encoding="utf-8")

settings = Settings()