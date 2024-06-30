from rest_framework.views import APIView
from files.services import FileService
from common.webCommon import ResponsObject

# Create your views here.



class File(APIView):
    fileService = FileService()

    def __init__(self):
        self.res = ResponsObject()

    def post(self, request):
        repositoryData = dict(request.POST)
        print(repositoryData)
        
        res = self.fileService.addNewFile(repositoryData)
        self.res.addItem(res)
        return self.res.createResponse(status=200)