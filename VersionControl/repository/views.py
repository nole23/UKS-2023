from rest_framework.views import APIView
from repository.service import RepositoryService
from common.webCommon import ResponsObject
from common.webCommon import decode_body

# Create your views here.

class Repository(APIView):
    repositoryService = RepositoryService()

    def __init__(self):
        self.res = ResponsObject()

    def get(self, request, id):
        
        repository = self.repositoryService.getAllByUser(id)
        self.res.addItem(repository)

        return self.res.createResponse(status=200)
    
    def post(self, request):
        repositoryData = decode_body(request.body)
        userData = repositoryData['user']
        
        returnData = self.repositoryService.createRepository(repositoryData, userData)

        self.res.addItem(returnData['project'])

        return self.res.createResponse(status=200)
    
    def put(self, request):
        # Ovde se radi update imena aplikacija
        repositoryData = decode_body(request.body)
        self.repositoryService.updateNameRepository(repositoryData)
        return self.res.createResponse(status=200)

class RepositoryData(APIView):
    repositoryService = RepositoryService()

    def __init__(self):
        self.res = ResponsObject()
    
    def get(self, request, id):
        repository = self.repositoryService.getRepositoryById(id)
        self.res.addItem(repository)

        return self.res.createResponse(status=200)

    def put(self, request):
        # Ovde se radi update colaboratorsa na apliakciji
        repositoryData = decode_body(request.body)
        return self.res.createResponse(status=200)
    
class RepositoryUser(APIView):
    repositoryService = RepositoryService()

    def __init__(self):
        self.res = ResponsObject()

    def get(self, request, userId, projectUd):
        self.repositoryService.addUserToRepository(userId, projectUd)
        return self.res.createResponse(status=200)