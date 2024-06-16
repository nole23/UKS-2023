from rest_framework.views import APIView
from repository.models import Project
from statistic.models import Statistic as static
from issues.models import Issue
from common.webCommon import ResponsObject
import json

# Create your views here.
class Statistic(APIView):
    def __init__(self):
        self.res = ResponsObject()

    def get(self, request, id):
        project = Project.objects.get(id=id)

        staticstic = static.objects.filter(project=project)

        issues = Issue.objects.filter(project=project)

        count_of_ammount = []
        number_of_mounts = 12
        for i in range(number_of_mounts):
            count = staticstic.filter(dateCreate__month=str(i+1))
            count_of_ammount.append(len(count))
        
        count_of_issues = []
        count_true = 0
        count_false = 0
        for i in issues:
            if i.status == True:
                count_false += 1
            if i.status == False:
                count_true += 1
        
        count_of_issues.append(count_false)
        count_of_issues.append(count_true)

        dataRes = '{"count_of_ammount": ' + str(count_of_ammount) + \
            ', "count_of_issues": ' + str(count_of_issues) + '}'
        
        self.res.addItem(json.loads(dataRes))
        
        return self.res.createResponse(status=200)