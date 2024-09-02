import unittest
from main import create_app
from config import TestConfig
from exts import db


class TestAuth(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)
        with self.app.app_context():
            # db.init_app(self.app)
            db.create_all()

            self.client.post("/auth/signup", json = {
                "first_name": "test",
                "last_name": "user",
                "username": "test_user",
                "password": "test123",
                "confirmation": "test123",
                "email": "user@test.com"
            })

    # Test Signup functionality
    def test_signup(self):
        response = self.client.post("/auth/signup", json = {
            "first_name": "new",
            "last_name": "user",
            "username": "new_user",
            "password": "test1234",
            "confirmation": "test1234",
            "email": "newuser@test.com"
        })

        self.assertEqual(response.status_code, 201)

    # Test Username Exists functionality
    def test_username_exists(self):
        response = self.client.post("/auth/signup", json = {
            "first_name": "test",
            "last_name": "user",
            "username": "test_user",
            "password": "test123",
            "confirmation": "test123",
            "email": "user@test.com"
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Username with test_user already exists", response.data)

    # Test passwod mismatch
    def test_password_mismatch(self):
        response = self.client.post("/auth/signup", json = {
            "first_name": "test",
            "last_name": "user",
            "username": "user",
            "password": "test123",
            "confirmation": "test",
            "email": "user@test.com"
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Passwords do not match", response.data)

    # Test all field required verification
    def test_required_fields(self):
        response = self.client.post("/auth/signup", json = {
            "first_name": "",
            "last_name": "",
            "username": "",
            "password": "",
            "confirmation": "",
            "email": ""
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"first_name is required", response.data)

    # Test login functionality
    def test_login(self):
            response = self.client.post("auth/login", json = {
                "username": "test_user",
                "password": "test123"
            })

            self.assertEqual(response.status_code, 201)

    # Test logging in without username
    def test_login_without_usernames(self):
        response = self.client.post("/auth/login", json = {
            "username": "",
            "password": "test123"
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"username is required", response.data)

    # Test logging in without password
    def test_login_without_passwords(self):
        response = self.client.post("/auth/login", json = {
            "username": "test_user",
            "password": ""
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"password is required", response.data)

    # Test logging in with wrong credentials
    def test_login_wrong_credentials(self):
        response = self.client.post("/auth/login", json = {
            "username": "wrong_user",
            "password": "test123"
        })

        self.assertEqual(response.status_code, 401)
        self.assertIn(b"Invalid username or password", response.data)

    # Test currency update functionality
    def test_update_currency(self):
        response = self.client.post("/auth/login", json = {
            "username": "test_user",
            "password": "test123"
        })
        access_token = response.get_json()["access_token"]

        response = self.client.put("/auth/user/1", headers={"Authorization": f"Bearer {access_token}"}, json = {
            "currency": "USD"
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Your currency has been changed successfully", response.data)

    # Test deleting user functionality
    def test_delete_user(self):
        response = self.client.post("/auth/login", json = {
            "username": "test_user",
            "password": "test123"
        })
        access_token = response.get_json()["access_token"]

        response = self.client.delete("/auth/user/1", headers={"Authorization": f"Bearer {access_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"User deleted successfully", response.data)

    # Test logging in after user deletion
    def test_login_deleted_user(self):
        response = self.client.post("/auth/login", json = {
            "username": "new_user",
            "password": "test1234"
        })
        self.assertEqual(response.status_code, 401)
        self.assertIn(b"Invalid username or password", response.data)

    # Test user logout functionality
    def test_user_logout(self):
        response = self.client.post("/auth/login", json = {
            "username": "test_user",
            "password": "test123"
        })
        access_token = response.get_json()["access_token"]

        response = self.client.post("/auth/logout", headers={"Authorization": f"Bearer {access_token}"})
        self.assertEqual(response.status_code, 201)
        self.assertIn(b"Successfully logged out", response.data)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()
