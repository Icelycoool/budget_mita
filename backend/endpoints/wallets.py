from flask import request, jsonify
from flask_restx import fields, Resource, Namespace
from flask_jwt_extended import jwt_required
from models.wallet import Wallet

wallets_ns = Namespace("wallets", description="Wallets Management")



wallet_model = wallets_ns.model(
    "Wallet",
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "balance": fields.Float(),
        "created_at": fields.DateTime()
    }
)


@wallets_ns.route("/")
class WalletsResource(Resource):

    @wallets_ns.marshal_list_with(wallet_model)
    @jwt_required()
    def get(self):
        """Get all the wallets"""
        wallets = Wallet.query.all()
        return wallets


    @wallets_ns.marshal_with(wallet_model)
    @wallets_ns.expect(wallet_model)
    @jwt_required()
    def post(self):
        """Create a new wallet"""
        data = request.get_json()
        new_wallet = Wallet(
            name = data.get("name"),
            balance = data.get("balance"),
            user_id = data.get("user_id")
        )
        new_wallet.save()
        return new_wallet, 201

@wallets_ns.route("/<int:id>")
class WalletsResource(Resource):

    @wallets_ns.marshal_with(wallet_model)
    @jwt_required()
    def get(self, id):
        """Get a wallet by name"""
        wallet = Wallet.query.get_or_404(id)
        return wallet, 200
    
    @jwt_required()
    def put(self, id):
        """Update an existing wallet"""
        wallet_to_update = Wallet.query.get_or_404(id)
        data = request.get_json()
        wallet_to_update.update(data.get("name"), data.get("balance"))
        return jsonify({"message": f"Your wallet information has been successfully updated"})

    @jwt_required()
    def delete(self, id):
        """Delete an existing wallet"""
        wallet_to_delete = Wallet.query.get_or_404(id)
        wallet_to_delete.delete()
        return jsonify({"message": f"Your wallet has been deleted successfully"})