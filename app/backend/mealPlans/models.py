from django.db import models
from recipes.models import Recipe


class MealPlan(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Meal(models.Model):
    meal_plan = models.ForeignKey(MealPlan, on_delete=models.CASCADE,
                                  related_name='meals')
    date = models.DateField(null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL,
                               null=True, blank=True, related_name='meals')
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.recipe.name
