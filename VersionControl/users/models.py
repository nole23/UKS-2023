from django.db import models

class Role(models.Model):
    ROLES = (
        ('O', 'Owner'),
        ('C', 'Collaborator'),
        ('V', 'Visitor'),
    )
    id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=1, choices=ROLES)

    def get_by_id(self, id):
        return Role.objects.get(id=id)
    
    def get_by_role_name(self, name):
        try:
            role = Role.objects.get(role_name=name)
            return role
        except Role.DoesNotExist:
            return None

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    folderName = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    def get_by_username(self, username):
        try:
            user = User.objects.get(username=username)
            return user
        except User.DoesNotExist:
            return None

    def get_all_by_email(self, email):
        return User.objects.filter(email__exact=email)

    def get_by_id(self, id):
        return User.objects.get(id=id)

    def create_new_user(self, data):
        username = data['email'].split('@')
        username = username[0]

        User.objects.create(
            firstName=data['firstName'],
            lastName=data['lastName'],
            email=data['email'],
            username=username,
            folderName=username,
            password=data['password']
        )

    def update(self, data):
        data.save()

    def filter(self, text):
        return User.objects.filter(firstNamestartswith=text) | User.objects.filter(lastNamestartswith=text) | User.objects.filter(email__startswith=text)