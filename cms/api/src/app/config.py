from starlette.config import Config
import databases

config = Config(".env")

TESTING = config("TESTING", cast=bool, default=False)

VITE_AUTH_REGISTRATION_ENABLED = config("VITE_AUTH_REGISTRATION_ENABLED", default="true")

AUTH_REGISTRATION_ENABLED = VITE_AUTH_REGISTRATION_ENABLED != "false"

DATABASE_URL = config("DATABASE_URL", cast=databases.DatabaseURL)
if TESTING:
    DATABASE_URL = DATABASE_URL.replace(database="test_"+DATABASE_URL.database)

JWT_SECRET = config("JWT_SECRET", default="asdWSW345rEBSDg34dfwSFGG")
JWT_ALG = config("JWT_ALG", default="HS256")
JWT_EXP = config("JWT_EXP", cast=int, default=86400)

CSRF_PROTECT = config("CSRF_PROTECT", default=True)