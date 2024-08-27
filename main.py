from flask import Flask
from flask_restx import Api
from flask_jwt_extended import JWTManager
from auth import auth_ns
from wallets import wallets_ns
from income import income_ns
from expenses import expenses_ns
from exts import db
from flask_migrate import Migrate
from models.wallet import Wallet
from models.user import User
from models.income import Income
from models.expenses import Expense



def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    migrate = Migrate(app, db)

    JWTManager(app)

    api = Api(app, doc="/docs")
    api.add_namespace(auth_ns)
    api.add_namespace(wallets_ns)
    api.add_namespace(income_ns)
    api.add_namespace(expenses_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "user": User,
            "wallet": Wallet,
            "income": Income,
            "expense": Expense,
        }

    return app