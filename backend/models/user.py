from datetime import datetime
from exts import db
"""User Module"""


class User(db.Model):
    """
    Defines user model

    Attributes:
        id (int): User's unique identifier
        first_name (str): User's first name
        last_name (str): User's last name
        username (str): User's username
        password (str): User's password
        email (str): User's email
        currency (str): User's preferred currency (default is KES)
        verified (bool): Indicates whether the user has verified their email address
        created_at (date): User's registration date

    Methods:
        save(): Saves the user to the database
        update(): Updates the user's details
        delete(): Deletes the user from the database
    """
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(225), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.Text(), nullable=False)
    currency = db.Column(db.String(3), default="KES")
    verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.Date(), default=datetime.today().date)
    wallets = db.relationship('Wallet', backref=db.backref("owner", lazy=True),cascade="all, delete-orphan")

    def __str__(self):
        return f"<User: {self.id} - {self.username} -Email: {self.email} - Joined:{self.created_at}>"

    def save(self):
        """Saves the user to the database"""
        db.session.add(self)
        db.session.commit()

    def update(self, currency):
        """Update the user's details"""
        self.currency = currency
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete the user from the database"""
        db.session.delete(self)
        db.session.commit()