from django.shortcuts import render
from projects.models import Project
from services.models import Service, Statistics, Skills


# Create your views here.
def home(request):
    services = Service.objects.all()
    statistics = Statistics.objects.all().last()
    projects = Project.objects.order_by('-id')[:4]
    skills = Skills.objects.order_by('id')[:5]
    context = {"services": services, "statistics": statistics, "projects": projects, "skills": skills}
    return render(request, "home/home.html", context)