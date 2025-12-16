from django.db import models

# Create your models here.
class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="services_images/%Y/%m/%d/", default="course/default.jpg")
    def __str__(self):
        return self.title

class Statistics(models.Model):
    satisfied_customers = models.IntegerField()
    website_created = models.IntegerField()
    specialist_expert = models.IntegerField()
    years_of_experience = models.IntegerField()