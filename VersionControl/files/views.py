from rest_framework.views import APIView
from files.services import FileService
from common.webCommon import ResponsObject
from common.webCommon import decode_post

# Create your views here.



class File(APIView):
    fileService = FileService()

    def __init__(self):
        self.res = ResponsObject()

    def post(self, request):
        repositoryData = dict(request.POST)
        
        data = decode_post(repositoryData['data'][0])
        user = decode_post(repositoryData['user'][0])
        
        res = self.fileService.addNewFile(user, data)
        self.res.addItem(res)
        return self.res.createResponse(status=200)