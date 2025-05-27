from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    identifier = models.CharField(max_length=40, unique=True)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    EMAIL_FIELD = models.CharField(max_length=128)
    USERNAME_FIELD = 'identifier'
    REQUIRED_FIELDS = ['email', 'password']

class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    color = models.CharField(max_length=7)
    parent = models.ForeignKey('self', on_delete=models.CASCADE)

class Note(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    content = models.TextField()
    tags = models.JSONField()
    lastEdited = models.DateTimeField()
    lastEditor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
class Setting(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    description = models.TextField()


class UserSetting(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    setting_id = models.ForeignKey(Setting, on_delete=models.CASCADE)
    state = models.CharField(max_length=40)