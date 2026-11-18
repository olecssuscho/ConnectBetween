from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column

class Base(DeclarativeBase):
    pass

class UserDB(Base):

    __tablename__ = "Users"

    id : Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    first_name : Mapped[str] = mapped_column(nullable=False)
    last_name : Mapped[str] = mapped_column(nullable=False)
    email : Mapped[str] = mapped_column(String(50))
    password : Mapped[str] = mapped_column(nullable=False) 
