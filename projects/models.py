from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/%Y/%m/%d/", default="projects/default.jpg")
    def __str__(self):
        return self.name