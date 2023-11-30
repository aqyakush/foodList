from django.db import models
from recipes.models import Ingredient

class ShoppingList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    ingredients = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.name
