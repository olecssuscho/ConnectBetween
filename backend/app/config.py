from pydantic_settings import BaseSettings,SettingsConfigDict

class Settings(BaseSettings):
    FRONTEND_URLS:str
    DB_URL:str
    @property
    def origins(self) ->list[str]:
        return [url.strip() for url in self.FRONTEND_URLS.split(",") if url.strip()]

    model_config = SettingsConfigDict(env_file=r"D:\ProjeckPy\ConnectBetween\backend\.env",env_file_encoding="utf-8")

settings = Settings()