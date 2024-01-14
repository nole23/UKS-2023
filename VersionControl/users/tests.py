from django.test import TestCase, Client
from users.models import User
from django.urls import reverse
import json

JSON = 'application/json'
JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDUyNzc3MDR9.w6cyzHP5AzhxD4y8qh0LMFjGOIJUdBbgIvJPmcIJ8ds'

# Create your tests here.

class TestLogin(TestCase):
    def setUp(self):
        self.c = Client()
        user = User(firstName="test", lastName="test", email="test@gmail.com", username="test", folderName="test", password="test")
        user.save()

    def test_login_successful(self):
        user = {
            "username":"test",
            "password":"test"
        }
        response = self.c.post('/login', json.dumps(user), HTTP_AUTHORIZATION='', content_type=JSON)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'SUCCESS')

    def test_login_false(self):
        user = {
            "username":"test1",
            "password":"test"
        }
        response = self.c.post('/login', json.dumps(user), HTTP_AUTHORIZATION='', content_type=JSON)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'USER_NOT_FOUND')
