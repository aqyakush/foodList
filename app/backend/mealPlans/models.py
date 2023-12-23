from django.db import models
from recipes.models import Recipe


class MealPlan(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    recipes = models.ManyToManyField(Recipe)

    def __str__(self):
        return self.name
