from datetime import datetime
from sqlalchemy.orm import relationship
from .user import User
from exts import db
"""Wallet Module"""

class Wallet(db.Model):
    """
    Defines wallet model

    Attributes:
        id (int): Unique identifier for the wallet
        name (str): Name of the wallet
        balance (float): Current balance in the wallet
        created_at (date): Date when the wallet was created
        user_id (int): Foreign key to the user who owns the wallet
        user (User): Relationship to the user who owns the wallet

    Methods:
        __str__: The string representation of the wallet
        save(): Save the wallet to the database
        delete(): Delete the wallet from the database
        update(name, balance): Update the name and balance of the wallet
    """
    __tablename__ = "wallet"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=False)
    balance = db.Column(db.Float(), default=0.00)
    created_at = db.Column(db.Date(), default=datetime.today().date)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user = db.relationship('User', backref='wallets')


    def __str__(self):
        """String representation of the wallet"""
        return f"<Wallet: {self.id} - {self.name} Create At: {self.created_at} Balance: {self.balance}>"

    def save(self):
        """Saves the wallet to the database"""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the wallet from the database"""
        db.session.delete(self)
        db.session.commit()

    def update(self, name, balance):
        """Updates the name and balance of the wallet"""
        self.name = name
        self.balance = balance
        db.session.commit()