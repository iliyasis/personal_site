from django.shortcuts import render
from projects.models import Project
from services.models import Service, Statistics


# Create your views here.
def home(request):
    services = Service.objects.all()
    statistics = Statistics.objects.all().last()
    projects = Project.objects.order_by('-id')[:4]
    context = {"services": services, "statistics": statistics, "projects": projects}
    return render(request, "home/home.html", context)