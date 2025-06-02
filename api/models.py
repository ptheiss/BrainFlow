from django.db import models
from django.contrib.auth.models import AbstractUser, Group

# Create your models here.
class Tag(models.Model):
    COLORS = [
        ('#008000','Green'),
        ('#FFFFFF','White'),
        ('#000000','Black'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    color = models.CharField(max_length=7, choices=COLORS)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.title

class Setting(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    description = models.TextField()

    def __str__(self):
        return self.title


class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=40, unique=True)
    first_name = models.CharField(max_length=128, blank=True)
    last_name = models.CharField(max_length=128, blank=True)
    email = models.CharField(max_length=128)
    settings = models.ManyToManyField(Setting, through="UserSetting", blank=True)
    favourites = models.ManyToManyField(Tag, related_name="favourites", blank=True)
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'password']

    def __str__(self):
        return self.username

class Note(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    content = models.TextField()
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.ManyToManyField(Tag, related_name="tags", blank=True)
    lastEdited = models.DateTimeField(blank=True)
    lastEditor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    REQUIRED_FIELDS = ['title', 'content']

    def __str__(self):
        return self.title
    
class Group(Group):
    users = models.ManyToManyField(User, through="Membership", blank=True)
    def __str__(self):
         return self.name

# Through Models
class UserSetting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    setting = models.ForeignKey(Setting, on_delete=models.CASCADE)
    value = models.CharField(max_length=128, blank=True, null=True)

class Membership(models.Model):
    ROLES = [
        ('admin','Group Administrator'),
        ('developer','Developer')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    role = models.JSONField(choices=ROLES)