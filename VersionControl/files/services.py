from django.core.files.base import ContentFile
from datetime import datetime

from common.webCommon import ResponsObject
from repository.models import Project, ChildrenTree
from files.models import Files
from statistic.models import Statistic
from users.models import User

class FileService():
    project = Project()
    files = Files()
    childrenTree = ChildrenTree()
    responsObject = ResponsObject()
    user = User()

    def addNewFile(self, user, data):
        tree = data['tree']
        folder = data['folder']
        types = data['type']

        project = Project.objects.get(id=data['parent'])
        rootTree = project.rootTree.first()

        userDB = self.user.get_by_id(user['id'])

        path = rootTree.userCreate.username + "_" + project.name + "_"
        if tree is not None:
            for each in tree:
                path += each + "_"

        files = None
        if folder != "":
            path += folder + '_'
        
        if types == "create":
            title = data['title'].split(".")
            text = data['text']
            content = ContentFile(text)
            name = None
            if len(title) > 1:
                content.name = path + title[0] + "." + title[1]
                name = title[0] + "." + title[1]
            else:
                content.name = path + title[0] + ".txt"
                name = title[0] + ".txt"
            files = self.files.create(name, content, userDB)

        if types == "upload":
            cover = data['cover']
            name = cover.name.split("_")
            files = self.files.create(name[-1], cover, userDB)

        if len(tree) > 1:
            help_child = rootTree
            for each in tree:
                if each != 'master':
                    help_child = help_child.childrenFolder.get(name_node=each)

            if folder != "":
                childrenTree = ChildrenTree.objects.create(
                    name_node=folder, date_create=datetime.now(), user_create=userDB)
                childrenTree.files.add(files)
                help_child.childrenFolder.add(childrenTree)
            else:
                help_child.files.add(files)
        else:
            if folder != "":
                childrenTree = ChildrenTree.objects.create(
                    name_node=folder, date_create=datetime.now(), user_create=userDB)
                childrenTree.files.add(files)
                rootTree.childrenFolder.add(childrenTree)
            else:
                rootTree.files.add(files)

        Statistic.objects.create(
            project=project, files=files, dateCreate=datetime.now())

        jsonRootTree = self.responsObject.rootTreeSeriallize(rootTree, 'none')
        return {"message": "SUCCESS", "rootTree": jsonRootTree}
        # return ""