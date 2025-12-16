from django.shortcuts import render

from services.models import Service, Statistics


# Create your views here.
def home(request):
    services = Service.objects.all()
    statistics = Statistics.objects.all().last()
    context = {"services": services, "statistics": statistics}
    return render(request, "home/home.html", context)