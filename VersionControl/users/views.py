from rest_framework.views import APIView
from common.webCommon import ResponsObject

"""
Ovde se nalazi logika za get post put i delete indexne stranice.
Na ovaj nacin cemo uraditi kompletnu aplikaciju. Dodavacemo novu
klasu ukoliko nam je potrebno nesto specificno
"""
class Index(APIView):
    def __init__(self):
        self.res = ResponsObject()
    
    def get(self, request):

        self.res.addItem("success", "Server successfully started.")
        self.res.addItem("message", "Test server resoponse.")
        
        return self.res.createResponse(status=200)

class Login(APIView):
    def __init__(self):
        self.res = ResponsObject()