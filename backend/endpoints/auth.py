from flask import Flask, request, jsonify, make_response, current_app
from flask_mail import Message
from flask_restx import fields, Resource, Namespace
from  itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity
from models.user import User
from exts import mail



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
        "confirmation": fields.String(),
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
                return make_response(jsonify({"message": f"{field} is required"}), 400)

        # Check if username already exists
        username = data.get('username')
        db_user = User.query.filter_by(username=username).first()
        if db_user:
            return make_response(jsonify({"message": f"Username with {username} already exists"}), 400)

        # Chek if password and the confirmation are matching
        password = data.get('password')
        confirmation = data.get('confirmation')
        if password != confirmation:
            return make_response(jsonify({"message": "Passwords do not match"}), 400)

        
        # Create the user
        new_user = User(
            first_name = data.get("first_name"),
            last_name = data.get("last_name"),
            username = data.get("username"),
            password = generate_password_hash(data.get("password")),
            email = data.get("email"),
        )
        new_user.save()
        return make_response(jsonify({"message": f"User {username} created successfully!"}), 201)

@auth_ns.route("/user")
class ProfileResource(Resource):

    @auth_ns.marshal_with(signup_model)
    @jwt_required()
    def get(self):
        """Get User by id"""
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first_or_404()
        return user, 200

    @jwt_required()
    def put(self):
        """Updates User by id"""
        user_id = get_jwt_identity()
        user_to_update = User.query.filter_by(id=user_id).first_or_404()
        data = request.get_json()
        user_to_update.update(data.get("currency"))
        user_to_update.save()
        return make_response(jsonify({"message": "Your currency has been changed successfully"}), 200)

    @jwt_required()
    def delete(self):
        """Deletes a User"""
        user_id = get_jwt_identity()
        user_to_delete = User.query.filter_by(id=user_id).first_or_404()
        user_to_delete.delete()
        return make_response(jsonify({"message": "User deleted successfully"}), 200)

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
                return make_response(jsonify({"message": f"{field} is required"}), 400)

        # Query the database for the user name
        db_user = User.query.filter_by(username=username).first()

        # Check if the password is correct and log the user in
        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.id)
            refresh_token = create_refresh_token(identity=db_user.id)

            return make_response(jsonify({"access_token": access_token, "refresh_token": refresh_token, "username": username}), 201)
      
        return make_response(jsonify({"message": "Invalid username or password"}), 401)

@auth_ns.route("/reset-password")    
class ResetPasswordResource(Resource):
    """Resets user password"""
    def post(self):
        """Sends password reset email"""
        # Get the user email
        data = request.get_json()
        email = data.get("email")

        # Check if the user exits
        user = User.query.filter_by(email=email).first()
        if not user:
            return make_response(jsonify({"message": "Email not found!"}), 404)

        # Serialize the email and generate a token
        serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        reset_token = serializer.dumps(email, salt=current_app.config['SECRET_KEY'])

        # Create a reset link
        reset_link = f"http://localhost:3000/reset-password/{reset_token}"

        # Send the email
        msg = Message(
            subject="Reset Your Password",
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=[email],
            body=f"Use the following token to reset your password: {reset_link}"
        )
 
        mail.send(msg)

        return make_response(jsonify({"message": "Password reset email sent"}), 200)

@auth_ns.route("/reset-password/<token>", methods=['POST'])
class ResetPasswordWithTokenResource(Resource):
    """Handles password reset using token"""
    def post(self, token):
        #Deserialize the the token and access the email
        serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        email = serializer.loads(token, salt=current_app.config['SECRET_KEY'], max_age=1800)

        # Hash the newly created password
        password = generate_password_hash(request.json.get('password'))

        # Check if the user exits using the email
        user = User.query.filter_by(email=email).first()

        # Update teh user password
        if user:
            user.update(user.currency, password)
            user.save()
            return make_response(jsonify({"message": "Password has been reset successfully!"}), 200)
            return make_response(jsonify({"message": "User not found"}), 404)



@auth_ns.route("/refresh")
class Refreshesource(Resource):
    """Refreshes the access token"""
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user, fresh=False)
        return make_response(jsonify({"access_token": new_access_token}), 200)

@auth_ns.route("/logout")
class LogoutResource(Resource):
    """Logs out a User"""
    jwt_blocklist = set()

    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        self.jwt_blocklist.add(jti)
        return make_response(jsonify({"message": "Successfully logged out"}), 201)