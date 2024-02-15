from users.models import User
from datetime import datetime, timedelta
import jwt
from common.webCommon import AuthSerialize

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 84600

class UserService(AuthSerialize):
    userModel = User()

    def login(self, data):
        user = self.userModel.get_by_username(data['username'])
        if user is None:
            return {"message": "FALSE", "data": "USER_NOT_FOUND"}

        if user.password != data['password']:
            return {"message": "FALSE", "data": "PASSWORD_NOT_FOUND"}

        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }

        jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

        return {"message": "SUCCESS", "data": self.loginSerialize(user, jwt_token)}

    def getUserById(self, id):
        return self.userModel.get_by_id(id)

    def registration(self, data):
        user = self.userModel.get_all_by_email(data['email'])

        if user.count() > 0:
            return {"message": "FALSE", "data": "NOT_SAVE_MAIL"}

        self.userModel.create_new_user(data)
        return {"message": "SUCCESS", "data": None}