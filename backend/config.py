from decouple import config
import os


BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY = config("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = config("SQLALCHEMY_TRACK_MODIFICATIONS", cast=bool)

    # Flask Mail configurations
    MAIL_SERVER = config('MAIL_SERVER')
    MAIL_PORT = config('MAIL_PORT', cast=int)
    MAIL_USE_TLS = config('MAIL_USE_TLS', cast=bool)
    MAIL_USE_SSL = config('MAIL_USE_SSL', cast=bool)
    MAIL_USERNAME = config('MAIL_USERNAME')
    MAIL_PASSWORD = config('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = config('MAIL_DEFAULT_SENDER')

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR, "dev.db")
    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
    SQLALCHEMY_ECHO = False
    TESTING = True
