import json
from django.http import HttpResponse
#region ResponsObject

def decode_body(body):
    data_unicode = body.decode('utf-8')
    return json.loads(data_unicode)

class Object1():
    def __init__(self, key, value):
        self.key = key
        self.value = value

class ResponsObject():
    def __init__(self):
        self.responseObject = {}

    def addItem(self, key):
        self.responseObject = key

    def createResponse(self, status):
        response = HttpResponse(json.dumps(
            self.responseObject), content_type="application/json", status=status)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response
    
    def decode_body(self, body):
        data_unicode = body.decode('utf-8')
        return json.loads(data_unicode)

    def listProjectUserSerialize(self, data, isIssue=False):
        rd = []
        
        for each in data:
            rd.append({
                'id': str(each.project.id),
                'projectName': str(each.project.name),
                'type': str(each.project.typeProject),
                'typeLanguage': 'Python',
                'typeLicense': 'MIT',
                'dateOfModifide': str(each.project.dateCreate),
                'descriotion': str(each.project.description)
            })
        return rd
    
    def projectUserSerialize(self, data):
        rd = {
                'id': str(data.id),
                'projectName': str(data.name),
                'type': str(data.typeProject),
                'typeLanguage': 'Python',
                'typeLicense': 'MIT',
                'dateOfModifide': str(data.dateCreate),
                'descriotion': str(data.description)
            }
        return rd
    
# endregion
    
class AuthSerialize():
    def userSerialize(self, data):
        return {
            'id': str(data.id),
            'firstName': data.firstName,
            'lastName': data.lastName,
            'username': data.username
        }

    def loginSerialize(self, user, jwt):
        return {
            'user': self.userSerialize(user),
            'jwt': jwt
        }
