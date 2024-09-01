import unittest
from main import create_app
from config import TestConfig
from exts import db


class TestBudget(unittest.TestCase):
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

    # Test budget creation
    def test_create_budget(self):
        response = self.client.post("/budget/", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
            "name": "New budget",
            "amount": 10000,
            "start_date": "2022-01-01",
            "end_date": "2022-12-31",
            "user_id": 1
        })
        self.assertEqual(response.status_code, 201)

    # Test list all budgets
    def test_all_budgets(self):
        response = self.client.get("/budget/", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)

    # Test getting a budget by id
    def test_get_budget_by_id(self):
        self.test_create_budget()
        response = self.client.get("/budget/1", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 200)

    # Test updating a budget by id
    def test_update_budget_by_id(self):
        self.test_create_budget()
        response = self.client.put("/budget/1", headers = {"Authorization": f"Bearer {self.access_token}"}, json = {
            "name": "Updated Budget",
            "amount": 15000,
            "start_date": "2022-02-01",
            "end_date": "2022-11-30"
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn("Budget updated successfully", response.get_json()["message"])

    # Test deleting a budget by id
    def test_delete_budget_by_id(self):
        self.test_create_budget()
        response = self.client.delete("/budget/1", headers = {"Authorization": f"Bearer {self.access_token}"})
        self.assertEqual(response.status_code, 201)
        self.assertIn("Budget deleted successfully", response.get_json()["message"])

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()