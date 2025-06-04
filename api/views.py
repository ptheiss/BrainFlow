# Create your views here.
import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from rest_framework import permissions, viewsets, generics
from api.models import *
from api.serializers import *

def index_view(request):
    return redirect("http://localhost:8000/admin")

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    #permission_classes = [permissions.IsAuthenticated]

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    #permission_classes = [permissions.IsAuthenticated]