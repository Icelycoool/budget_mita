from flask import request, jsonify, make_response
from datetime import datetime
from flask_restx import fields, Resource, Namespace
from flask_jwt_extended import jwt_required
from models.income import Income
from models.wallet import Wallet


income_ns = Namespace("income", description="Income Management")


income_model = income_ns.model(
    "Income",
    {
        "id": fields.Integer(),
        "amount": fields.Float(),
        "category": fields.String(),
        "date_received": fields.Date(),
        "wallet_id": fields.Integer()
    }
)


@income_ns.route("/")
class IncomeResource(Resource):

    @income_ns.expect(income_model)
    @jwt_required()
    def post(self):
        """Create a new income"""
        data = request.get_json()
        date_received_str = data.get('date_received')
        date_received = datetime.strptime(date_received_str, '%Y-%m-%d').date()

        wallet_id = data.get("wallet_id")
        wallet = Wallet.query.get(wallet_id)

        new_income = Income(
            amount=data.get("amount"),
            category=data.get("category"),
            date_received=date_received,
            wallet_id=data.get("wallet_id")
        )
        

        new_income.save()

        update_balance = wallet.balance + new_income.amount
        wallet.update(wallet.name, update_balance)

        return make_response(jsonify({"message": "Successfully added income"}), 201)


    @income_ns.marshal_list_with(income_model)
    @jwt_required()
    def get(self):
        """Gets all incomes"""
        income = Income.query.all()
        return income

@income_ns.route("/<int:id>")
class IncomeResource(Resource):

    @income_ns.marshal_with(income_model)
    @jwt_required()
    def get(self, id):
        """Get an income by id"""
        income = Income.query.get_or_404(id)
        return income

    @jwt_required()
    def put(self, id):
        """Updates an income by id"""
        income_to_update = Income.query.get_or_404(id)
        data = request.get_json()
        date_received_str = data.get('date_received')
        date_received = datetime.strptime(date_received_str, '%Y-%m-%d').date()

        initial_income = income_to_update.amount
        new_income = data.get('amount')
        wallet_id = income_to_update.wallet_id
        wallet = Wallet.query.get_or_404(wallet_id)

        if initial_income > new_income:
            change = initial_income - new_income
            updated_wallet_balance = wallet.balance - change
            wallet.update(wallet.name, updated_wallet_balance)

        if initial_income < new_income:
            change = new_income - initial_income
            updated_wallet_balance = wallet.balance + change
            wallet.update(wallet.name, updated_wallet_balance)

        income_to_update.update(data.get("amount"), data.get("category"), date_received)
        return jsonify({"message": "Successfully updated income"})

    @jwt_required()
    def delete(self, id):
        """Delete an income by id"""
        income_to_delete = Income.query.get_or_404(id)
        wallet_id = income_to_delete.wallet_id
        income_amount = income_to_delete.amount
        wallet = Wallet.query.get_or_404(wallet_id)
        wallet.update(wallet.name, wallet.balance-income_amount)
        income_to_delete.delete()
        return jsonify({"message": "Income has been deleted successfully"})