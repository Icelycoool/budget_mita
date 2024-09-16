from datetime import datetime
from exts import db
from . import wallet
"""Income Module"""


class Income(db.Model):
    """
    Defines income model

    Attributes:
        id (int): Unique identifier for the income
        amount (float): Amount of the income received
        category (str): Category of the income
        date_received (datetime): Date when the income was received
        wallet_id (int): Foreign key referencing the wallet that the income belongs to
        wallet (Wallet): Relationship to the wallet model that the income belongs to

    Methods:
        __str__(self): Returns a string representation of the income
        save(self): Saves the income to the database
        update(self, amount, category, wallet): Updates the income with new values
        delete(self): Deletes the income from the database
    """
    __tablename__ = "income"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    amount = db.Column(db.Float(), nullable=False, default=0.00)
    category = db.Column(db.String(), nullable=False)
    date_received = db.Column(db.Date, nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey("wallet.id"), nullable=False)
    wallet = db.relationship("Wallet", backref=db.backref("income", lazy=True))

    def __str__(self):
        """Returns a string representation of the income"""
        return f"<Income of Amount: {self.amount} Category: {self.category} Date Received: {self.date_received}>"

    def save(self):
        """Saves the income to the database"""
        db.session.add(self)
        db.session.commit()

    def update(self, amount, category, date_received):
        """Updates the income with new values"""
        self.amount = amount
        self.category = category
        self.date_received = date_received
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the income from the database"""
        db.session.delete(self)
        db.session.commit()