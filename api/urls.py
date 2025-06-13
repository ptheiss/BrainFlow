from django.urls import include, path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'notes', views.NoteViewSet)

#app_name = "api"

urlpatterns = [
    path("", views.index_view, name="index"),
    path("api/", include(router.urls)),
]