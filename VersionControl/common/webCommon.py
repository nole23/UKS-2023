import json
from django.http import HttpResponse
#region ResponsObject

class Object1():
    def __init__(self, key, value):
        self.key = key
        self.value = value

class ResponsObject():
    def __init__(self):
        self.listOfObject = []

    def addItem(self, key, value):
        item = {str(key) : str(value)}
        self.listOfObject.append(item)
    
    def getListOfObject(self):
        return self.listOfObject
    
    def toJson(self):
        return json.dumps(self.listOfObject)

    def createResponse(self, status):
        response = HttpResponse(json.dumps(
            self.listOfObject), content_type="application/json", status=status)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response
    
    def decode_body(self, body):
        data_unicode = body.decode('utf-8')
        return json.loads(data_unicode)
    
# endregion