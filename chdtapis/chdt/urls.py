from django.contrib import admin

from django.urls import path
from django.urls import include
from rest_framework import routers

from . import  views, admin

r = routers.DefaultRouter()
r.register('users', views.UserViewSet, basename='users')

urlpatterns = [
    path('', include(r.urls))
]
