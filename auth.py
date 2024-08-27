from flask import Flask, request, jsonify
from flask_restx import fields, Resource, Namespace
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required
from models.user import User



auth_ns=Namespace("auth", description="User Authentication")


signup_model = auth_ns.model(
    "Signup",
    {
        "id": fields.Integer(),
        "first_name": fields.String(),
        "last_name": fields.String(),
        "username": fields.String(),
        "email": fields.String(),
        "created_at": fields.DateTime(),
        "password": fields.String(),
        "currency": fields.String(),
        "verified": fields.Boolean()
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "username": fields.String(),
        "password": fields.String()
    }
)

@auth_ns.route("/signup")
class SignupResource(Resource):

    @auth_ns.expect(signup_model)
    def post(self):
        """Creates a new User"""
        data = request.get_json()

        # Check if all the required fields are present
        required_fields = ['first_name', 'last_name', 'username', 'password', 'confirmation', 'email']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"message": f"{field} is required"})

        # Check if username already exists
        username = data.get('username')
        db_user = User.query.filter_by(username=username).first()
        if db_user:
            return jsonify({"message": f"Username with {username} already exists"})

        # Chek if password and the confirmation are matching
        password = data.get('password')
        confirmation = data.get('confirmation')
        if password != confirmation:
            return jsonify({"message": "Passwords do not match"})

        
        # Create the user
        new_user = User(
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            username = data.get("username"),
            password = generate_password_hash(data.get("password")),
            email = data.get("email"),
        )
        new_user.save()
        return jsonify({"message": f"User {username} created successfully!"})

@auth_ns.route("/profile/<int:id>")
class ProfileResource(Resource):

    @auth_ns.marshal_with(signup_model)
    @jwt_required()
    def get(self, id):
        """Get User by id"""
        user = User.query.get_or_404(id)
        return user, 200

    @jwt_required()
    def put(self, id):
        """Updates User by id"""
        user_to_update = User.query.get_or_404(id)
        data = request.get_json()
        user_to_update.update(data.get("currency"))
        user_to_update.save()
        return jsonify({"message": f"You currency has been set to {currency}"})

    @jwt_required()
    def delete(self, id):
        """Deletes a User"""
        user_to_delete = User.query.get_or_404(id)
        user_to_delete.delete()
        return jsonify({"message": "User deleted successfully"})

@auth_ns.route("/login")
class LoginResource(Resource):
    """Logs a User in"""
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        
        # Require the user information
        required_fields = ["username", "password"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"message": f"{field} is required"})

        # Query the database for the user name
        db_user = User.query.filter_by(username=username).first()

        # Check if the password is correct and log the user in
        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            return jsonify({"access_token": access_token, "refresh_token": refresh_token})
            

@auth_ns.route("/logout")
class LogoutResource(Resource):
    """Logs out a User"""
    def post(self):
        pass