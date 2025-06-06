from api.models import *
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework.exceptions import ValidationError

# Serializers define the API representation.
class TitleField(serializers.RelatedField):
    def to_representation (self, value):
        return value.title
    
class UserSerializer(serializers.HyperlinkedModelSerializer):
    permissions = serializers.SerializerMethodField()

    def get_permissions(self, obj):
        return list(obj.get_all_permissions())
    
    group = serializers.SlugRelatedField(
        queryset=Workgroup.objects.all(),
        slug_field='title'
    )
    settings = serializers.SlugRelatedField(
        many=True,
        queryset=UserSetting.objects.all(),
        slug_field='title'
    )
    favourites = serializers.SlugRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        slug_field='title'
    )
    class Meta:
        model = User
        fields = ['id','username', 'workgroups', 'settings', 'favourites', 'first_name', 'last_name', 'email']

class LoginSerializer(Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.filter(username=data['username']).first()
        if user and user.check_password(data['password']):
            return user
        raise ValidationError({'error': 'Invalid username or password.'})

class TagSerializer(serializers.HyperlinkedModelSerializer):
    group = serializers.SlugRelatedField(
        queryset=Workgroup.objects.all(),
        slug_field='title'
    )

    class Meta:
        model = Tag
        fields = ['id','title', 'color', 'group']

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    group = serializers.SlugRelatedField(
        queryset=Workgroup.objects.all(),
        slug_field='title'
    )

    tags = TagSerializer (
        many=True,
    )

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'tags', 'group', 'lastEdited', 'lastEditor']