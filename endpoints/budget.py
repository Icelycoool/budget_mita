from flask import request, jsonify, make_response
from datetime import datetime
from flask_restx import fields, Resource, Namespace
from flask_jwt_extended import jwt_required
from models.budget import Budget


budget_ns = Namespace("budget", description="Budgets Management Namespace")

budget_model = budget_ns.model(
    "Budget",
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "amount": fields.Float(),
        "start_date": fields.DateTime(),
        "end_date": fields.DateTime(),
        "user_id": fields.Integer(),
    }
)

@budget_ns.route("/")
class BudgetResource(Resource):
    @budget_ns.marshal_with(budget_model)
    @budget_ns.expect(budget_model)
    @jwt_required()
    def post(self):
        """Create a new budget"""
        data = request.get_json()
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d')
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d')
        new_budget = Budget(
            name = data.get('name'),
            amount = data.get('amount'),
            start_date = start_date,
            end_date = end_date,
            user_id = data.get('user_id')
        )
        new_budget.save()
        return new_budget, 201

    @budget_ns.marshal_list_with(budget_model)
    @jwt_required()
    def get(self):
        """Get all the budgets"""
        budgets = Budget.query.all()
        return budgets

@budget_ns.route("/<int:id>")
class BudgetResource(Resource):
    @budget_ns.marshal_with(budget_model)
    @jwt_required()
    def get(self, id):
        """Get a budget by id"""
        budget = Budget.query.get_or_404(id)
        return budget

    @jwt_required()
    def put(self, id):
        """Update a budget by id"""
        budget_to_update = Budget.query.get_or_404(id)
        data = request.get_json()
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d')
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d')
        budget_to_update.update(
            name = data.get('name'),
            amount = data.get('amount'),
            start_date = start_date,
            end_date = end_date
        )
        return make_response(jsonify({"message": "Budget updated successfully"}), 201)

    @jwt_required()
    def delete(self, id):
        """Delete a budget by id"""
        budget_to_delete = Budget.query.get_or_404(id)
        budget_to_delete.delete()
        return make_response(jsonify({"message": "Budget deleted successfully"}), 201)