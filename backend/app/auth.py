from passlib.context import CryptContext

contex = CryptContext(schemes=["argon2"],deprecated="auto")

def hash_password(password:str) ->str:
    return contex.hash(password)


