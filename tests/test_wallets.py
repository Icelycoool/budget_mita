import unittest
from main import create_app
from config import TestConfig
from exts import db


class TestWallets(unittest.TestCase):
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
        
    # Test wallet creation functionality
    def test_create_wallet(self):
        response = self.client.post("/wallets/", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
            "name": "Test Wallet",
            "balance": 1000.00,
            "user_id": 1
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn("Test Wallet", response.get_json()["name"])

    # Test view all wallets functionality
    def test_view_all_wallets(self):
        self.test_create_wallet()
        response = self.client.get("/wallets/", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("Test Wallet", response.get_json()[0]["name"])

    # Test wallet retriving by id
    def test_view_wallet_by_id(self):
        self.test_create_wallet()
        response = self.client.get("/wallets/1", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("Test Wallet", response.get_json()["name"])

    # Test updating wallet information by id
    def test_update_wallet(self):
        self.test_create_wallet()
        response = self.client.put("/wallets/1", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
            "name": "Updated Test Wallet",
            "balance": 2000.00
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Your wallet information has been successfully updated", response.get_json()["message"])

    # Test deleting wallet by id
    def test_delete_wallet(self):
        self.test_create_wallet()
        response = self.client.delete("/wallets/1", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("Your wallet has been deleted successfully", response.get_json()["message"])

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()
        