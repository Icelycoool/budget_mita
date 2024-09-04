from flask import Flask
from flask_restx import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from endpoints.auth import auth_ns
from endpoints.wallets import wallets_ns
from endpoints.income import income_ns
from endpoints.expenses import expenses_ns
from endpoints.budget import budget_ns
from exts import db
from models.wallet import Wallet
from models.user import User
from models.income import Income
from models.expenses import Expense
from models.budget import Budget



def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)

    JWTManager(app)

    api = Api(app, doc="/docs")
    api.add_namespace(auth_ns)
    api.add_namespace(wallets_ns)
    api.add_namespace(income_ns)
    api.add_namespace(expenses_ns)
    api.add_namespace(budget_ns)


    @api.route("/welcome")
    class WelcomeResource(Resource):
        def get(self):
            return {"message": "Welcome to the Budget Mita API!"}

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "user": User,
            "wallet": Wallet,
            "income": Income,
            "expense": Expense,
            "budget": Budget,
        }

    return app