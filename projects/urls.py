from django.urls import path
from projects import views

urlpatterns = [
    path("", views.home, name="home"),
]