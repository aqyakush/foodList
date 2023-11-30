from django.db import models
from recipes.models import Recipe

# Create your models here.
class MealPlan(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    beginning_date = models.DateField()
    end_date = models.DateField()
    recipes = models.ManyToManyField(Recipe)

    def __str__(self):
        return self.name