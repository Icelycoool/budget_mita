from datetime import datetime
from exts import db
from . import user
"""Budget module"""


class Budget(db.Model):
    """
    Defines budget model
    
    Attributes:
        id(int): Budget id
        name(str): Budget name
        amount(float): Budget amount
        start_date(datetime): Start date of the budget
        end_date(datetime): End date of the budget
        user_id(int): Foreign key to the user who owns the budget
        user(User): Relationship to the user who owns the budget

    Methods:
        save(): Saves the budget to the database
        update(amount, start_date, end_date): Updates the budget details
        delete(): Deletes the budget from the database
    """
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float(), default=0.00)
    start_date = db.Column(db.DateTime(), nullable=False)
    end_date = db.Column(db.DateTime(), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey(user.User.id), nullable=False)
    user = db.relationship("User", backref=db.backref("budget", lazy=True))

    def __str__(self):
        """Returns a string representation of the budget"""
        return f"<Budget: {self.name} Start Date: {self.start_date} End Date: {self.end_date}>"

    def save(self):
        """Saves the budget to the database"""
        db.session.add(self)
        db.session.commit()

    def update(self, name, amount, start_date, end_date):
        """Updates the budget details"""
        self.amount = amount
        self.start_date = start_date
        self.end_date = end_date
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Deletes the budget from the database"""
        db.session.delete(self)
        db.session.commit()
