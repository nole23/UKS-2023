from rest_framework.views import APIView
from common.webCommon import ResponsObject
from users.models import User
from users.service import UserService
from common.webCommon import decode_body

"""
Ovde se nalazi logika za get post put i delete indexne stranice.
Na ovaj nacin cemo uraditi kompletnu aplikaciju. Dodavacemo novu
klasu ukoliko nam je potrebno nesto specificno
"""
class Index(APIView):
    def __init__(self):
        self.res = ResponsObject()
    
    def get(self, request):

        # defaultni userk kog kreiramo
        user = User(firstName="test", lastName="test", email="test@gmail.com", username="test", folderName="test", password="test")
        user.save()

        self.res.addItem({"message": "SUCCESS", "data": "Test server resoponse."})
        
        return self.res.createResponse(status=200)

class Login(APIView):
    user = UserService()

    def __init__(self):
        self.res = ResponsObject()

    def post(self, request):
        data = decode_body(request.body)
        login = self.user.login(data)

        self.res.addItem(login)

        return self.res.createResponse(status=200)
