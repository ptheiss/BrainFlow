from api.models import *
from rest_framework import serializers

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','identifier', 'first_name', 'last_name', 'EMAIL_FIELD']

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ['id','title', 'color', 'parent']

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title', 'content', 'tags', 'lastEdited', 'lastEditor']

class SettingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ['id','title', 'description']

class UserSettingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserSetting
        fields = ['user_id','setting_id', 'state']