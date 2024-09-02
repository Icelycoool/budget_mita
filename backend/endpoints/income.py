from flask import request, jsonify, make_response
from datetime import datetime
from flask_restx import fields, Resource, Namespace
from flask_jwt_extended import jwt_required
from models.income import Income


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

        new_income = Income(
            amount=data.get("amount"),
            category=data.get("category"),
            date_received=date_received,
            wallet_id=data.get("wallet_id")
        )
        
        new_income.save()
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
        income_to_update.update(data.get("amount"), data.get("category"), date_received)
        return jsonify({"message": "Successfully updated income"})

    @jwt_required()
    def delete(self, id):
        """Delete an income by id"""
        income_to_delete = Income.query.get_or_404(id)
        income_to_delete.delete()
        return jsonify({"message": "Income has been deleted successfully"})