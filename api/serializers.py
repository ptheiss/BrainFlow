from api.models import *
from rest_framework import serializers

# Serializers define the API representation.
class TitleField(serializers.RelatedField):
    def to_representation (self, value):
        return value.title
class UserSerializer(serializers.HyperlinkedModelSerializer):
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