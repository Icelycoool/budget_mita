from flask import request, jsonify, make_response
from datetime import datetime
from flask_restx import fields, Resource, Namespace
from flask_jwt_extended import jwt_required
from models.expenses import Expense
from models.wallet import Wallet


expenses_ns = Namespace("expenses", description="Expenses Management")


expenses_model = expenses_ns.model(
    "Expense",
    {
        "id": fields.Integer(),
        "amount": fields.Float(),
        "category": fields.String(),
        "date_spent": fields.Date(),
        "wallet_id": fields.Integer()
    }
)


@expenses_ns.route("/")
class ExpensesResource(Resource):

    @expenses_ns.expect(expenses_model)
    @jwt_required()
    def post(self):
        """Create a new expenses"""
        data = request.get_json()
        date_spent_str = data.get('date_spent')
        date_spent = datetime.strptime(date_spent_str, '%Y-%m-%d').date()

        wallet_id = data.get("wallet_id")
        wallet = Wallet.query.get_or_404(wallet_id)

        new_expense = Expense(
            amount=data.get("amount"),
            category=data.get("category"),
            date_spent=date_spent,
            wallet_id=data.get("wallet_id")
        )
        
        wallet.update(wallet.name, wallet.balance-new_expense.amount)
        new_expense.save()
        return make_response (jsonify({"message": "Successfully added expense"}), 201)


    @expenses_ns.marshal_list_with(expenses_model)
    @jwt_required()
    def get(self):
        """Gets all expensess"""
        expenses = Expense.query.all()
        return expenses

@expenses_ns.route("/<int:id>")
class ExpensesResource(Resource):

    @expenses_ns.marshal_with(expenses_model)
    @jwt_required()
    def get(self, id):
        """Get an expenses by id"""
        expense = Expense.query.get_or_404(id)
        return expense

    @jwt_required()
    def put(self, id):
        """Updates an expenses by id"""
        expense_to_update = Expense.query.get_or_404(id)
        data = request.get_json()
        date_spent_str = data.get('date_spent')
        date_spent = datetime.strptime(date_spent_str, '%Y-%m-%d').date()

        new_amount = data.get("amount")
        wallet_id = expense_to_update.wallet_id
        wallet = Wallet.query.get_or_404(wallet_id)

        if expense_to_update.amount > new_amount:
            change = expense_to_update.amount - new_amount
            wallet.update(wallet.name, wallet.balance+change)

        if expense_to_update.amount < new_amount:
            change = new_amount - expense_to_update.amount
            wallet.update(wallet.name, wallet.balance-change)
            
        expense_to_update.update(data.get("amount"), data.get("category"), date_spent)
        return jsonify({"message": "Successfully updated expense"})

    @jwt_required()
    def delete(self, id):
        """Delete an expenses by id"""
        expense_to_delete = Expense.query.get_or_404(id)
        wallet_id = expense_to_delete.wallet_id
        wallet = Wallet.query.get_or_404(wallet_id)
        wallet.update(wallet.name, wallet.balance+expense_to_delete.amount)
        expense_to_delete.delete()
        return jsonify({"message": "Expense has been deleted successfully"})