from django.db import models
from datetime import datetime
from users.models import User
from repository.models import Project

# Create your models here.


class Issue(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    status = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user')
    dateCreate = models.DateTimeField(null=True, blank=True)
    assigned = models.ManyToManyField(
        User, blank=True, related_name='assigned')
    labels = models.CharField(max_length=99999, null=True)

    def get_by_id(self, id):
        return Issue.objects.get(id=id)

    def filter_issue_by_user_status(self, project, trueOrFalse, user):
        return Issue.objects.filter(project=project, status=trueOrFalse, user=user)

    def filter_issue_by_user(self, project, user):
        return Issue.objects.filter(project=project, user=user)

    def filter_issue_by_status(self, project, trueOrFalse):
        return Issue.objects.filter(project=project, status=trueOrFalse)

    def filter_issue(self, project):
        return Issue.objects.filter(project=project)

    def create(self, data, project, user):
        issue = Issue.objects.create(
            name=data['name'],
            description=data['description'],
            project=project,
            user=user,
            dateCreate=datetime.now(),
            labels=data['labels']
        )
        return issue


class IssueComment(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.CharField(max_length=150)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dateCreate = models.DateTimeField(null=True, blank=True)
    typeComment = models.CharField(max_length=150, default='COMMENT')

    def create(self, comment, issue, user, typeComment):
        return IssueComment.objects.create(
            comment=comment,
            issue=issue,
            user=user,
            dateCreate=datetime.now(),
            typeComment=typeComment
        )

    def filterByIssue(self, issue):
        return IssueComment.objects.filter(issue=issue)