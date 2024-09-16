from datetime import datetime
from exts import db
from . import wallet
"""Expenses Module"""


class Expense(db.Model):
    """
    Defines expenses model

    Attributes:
        id: Unique identifier for the expense
        amount: Amount of the expense
        category: Category of the expense
        date_spent: Date when the expense was made
        wallet_id: Wallet ID of the wallet the expense belongs to
        wallet: Wallet object of the wallet the expense belongs to

    Methods:
        __str__(self): Returns a string representation of the expense
        save(self): Saves the expense to the database
        update(self, amount, category, wallet): Updates the expense in the database
        delete(self): Deletes the expense from the database
    """
    __tablename__ = "expenses"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    amount = db.Column(db.Float(), nullable=False, default=0.00)
    category = db.Column(db.String(), nullable=False)
    date_spent = db.Column(db.Date, nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey("wallet.id"), nullable=False)
    wallet = db.relationship("Wallet", backref=db.backref("expenses", lazy=True))

    def __str__(self):
        """Returns a string representation of the income"""
        return f"<Income of Amount: {self.amount} Category: {self.category} Date Received: {self.date_received}>"

    def save(self):
        """Saves the expense to the database"""
        db.session.add(self)
        db.session.commit()

    def update(self, amount, category, date_spent):
        """Updates expense information"""
        self.amount = amount
        self.category = category
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes an expense from the database"""
        db.session.delete(self)
        db.session.commit()