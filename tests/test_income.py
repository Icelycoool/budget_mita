import unittest
from main import create_app
from config import TestConfig
from exts import db


class TestIncome(unittest.TestCase):
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

    # Test addition of an income
    def test_add_income(self):
        response = self.client.post("/income/", headers={"Authorization": f"Bearer {self.access_token}"}, json={
            "category": "Salary",
            "amount": 5000,
            "date_received": "2024-09-01",
            "wallet_id": 1
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn("Successfully added income", response.get_json()["message"])

    # Test view all income
    def test_view_income(self):
        response = self.client.get("/income/", headers={"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)

    # Test view income by id
    def test_view_wallet_by_id(self):
        self.test_add_income()
        response = self.client.get("/income/1", headers={"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)

    # Test update of an income
    def test_update_income(self):
        self.test_add_income()
        response = self.client.put("/income/1", headers={"Authorization": f"Bearer {self.access_token}"}, json={
            "category": "Salary",
            "amount": 5500,
            "date_received": "2024-09-01"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Successfully updated income", response.get_json()["message"])

    # Test deletion of an income
    def test_delete_income(self):
        self.test_add_income()
        response = self.client.delete("/income/1", headers={"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("Income has been deleted successfully", response.get_json()["message"])

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()