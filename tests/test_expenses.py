import unittest
from main import create_app
from config import TestConfig
from exts import db


class TestExpenses(unittest.TestCase):
    def  setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)
        with self.app.app_context():
            db.create_all()

            self.client.post("/auth/signup", json = {
                "first_name": "test",
                "last_name": "user",
                "username": "test_user",
                "password": "test123",
                "confirmation": "test123",
                "email": "user@test.com"
            })

            response = self.client.post("/auth/login", json = {
                "username": "test_user",
                "password": "test123"
            })

            self.access_token = response.get_json()["access_token"]

            self.client.post("/wallets/", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
                "name": "Test Wallet",
                "balance": 1000.00,
                "user_id": 1
            })

    # Test addition of an expense
    def test_add_expense(self):
        response = self.client.post("/expenses/", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
            "category": "Rent",
            "amount": 500,
            "date_spent": "2022-01-01",
            "wallet_id": 1
        })

        self.assertEqual(response.status_code, 201)
        self.assertIn("Successfully added expense", response.get_json()["message"])

    # Test getting all expenses
    def test_get_expenses(self):
        response = self.client.get("/expenses/", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
    
    # Test getting an expense by id
    def test_get_expense_by_id(self):
        self.test_add_expense()
        response = self.client.get("/expenses/1", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)

    # Updating an expense by id
    def test_update_expense(self):
        self.test_add_expense()
        response = self.client.put("/expenses/1", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
            "category": "Rent",
            "amount": 600,
            "date_spent": "2022-01-01",
            "wallet_id": 1
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn("Successfully updated expense", response.get_json()["message"])

    # Deleting an expense by id
    def test_delete_expense(self):
        self.test_add_expense()
        response = self.client.delete("/expenses/1", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("Expense has been deleted successfully", response.get_json()["message"])

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()