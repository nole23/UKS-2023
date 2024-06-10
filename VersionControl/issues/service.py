from users.service import UserService
from issues.models import Issue, IssueComment
from common.webCommon import ResponsObject
from repository.models import Project

class IssueService():
    userService = UserService()
    issue = Issue()
    issueComment = IssueComment()
    response = ResponsObject()

    def findIssue(self, trueOrFalse, user, params, id):
        issues = None
        if user != 'author':
            user = self.userService.getUserById(user)

            if params != 'status':
                issues = self.issue.filter_issue_by_user_status(
                    id, trueOrFalse, user)
            else:
                issues = self.issue.filter_issue_by_user(id, user)
        else:
            if params != 'status':
                issues = self.issue.filter_issue_by_status(id, trueOrFalse)
            else:
                issues = self.issue.filter_issue(id)

        return {"message": "SUCCESS", "data": self.response.issuesSerialize(issues)}
    
    def createNewIssue(self, user, data):
        project = Project.objects.get(id=data['id'])
        user1 = self.userService.getUserById(int(user['id']))
        issue = self.issue.create(data, project, user1)

        return {"message": "SUCCESS", "data": self.response.issueSerialize(issue)}
    
    def createNewComment(self, user, data):
        issue = self.issue.get_by_id(data['id'])
        user1 = self.userService.getUserById(int(user['id']))

        issueComment = self.issueComment.create(
            data['comment'], issue, user1, "COMMENT")

        return {"message": "SUCCESS", "data": self.response.issueCommentSerialize(issueComment)}
    
    def getCommentByIssue(self, id):
        issue = self.issue.get_by_id(id)
        issue_comment = self.issueComment.filterByIssue(issue)

        return {"message": "SUCCESS", "data": self.response.issuesCommentSerialize(issue_comment)}
    
    def assignedToIssue(self, user, data):
        print(data)
        issue = self.issue.get_by_id(data['id'])
        user1 = self.userService.getUserById(int(user['id']))
        issue.assigned.add(user1)
        issue.save()

        comment = user1.firstName + ' ' + user1.lastName + \
            ' assigned to issue #' + str(issue.id) + '.'

        issueComment = self.issueComment.create(
            comment, issue, user1, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": self.response.issueCommentSerialize(issueComment)}
    
    def editIssue(self, user, data):
        issue = self.issue.get_by_id(data['id'])
        user1 = self.userService.getUserById(int(user['id']))

        issue.name = data['name']
        issue.description = data['description']
        issue.save()

        comment = user1.firstName + ' ' + user1.lastName + ' has edited this issue.'
        issueComment = self.issueComment.create(
            comment, issue, user1, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": self.response.issueCommentSerialize(issueComment)}
    
    def closeIssue(self, idIssue, user):
        issue = self.issue.get_by_id(idIssue)
        user1 = self.userService.getUserById(int(user['id']))

        if issue.status == False:
            return {"message": "FALSE", "data": "ISSUE_IS_CLOSSE"}

        issue.status = False
        issue.save()

        comment = user1.username + \
            ' has closed issue #' + str(idIssue) + '.'

        issueComment = self.issueComment.create(
            comment, issue, user1, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": self.response.issueCommentSerialize(issueComment)}
    
    def updateLabels(self, issueId, label, user):
        issue = self.issue.get_by_id(issueId)
        user1 = self.userService.getUserById(int(user))
        issue.labels = label
        issue.save()

        comment = '<span style="color: green">' + user1.username + '</span>' \
            ' set labels to issue #' + str(issue.id) + '.'

        issueComment = self.issueComment.create(
            comment, issue, user1, "AUTOGENERATE")

        return {"message": "SUCCESS", "data": self.response.issueCommentSerialize(issueComment)}