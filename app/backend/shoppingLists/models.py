from django.db import models
from recipes.models import Ingredient

UNITS = [
        ('kg', 'Kilogram'),
        ('g', 'Gram'),
        ('ml', 'Milliliter'),
        ('l', 'Liter'),
        ('tbsp', 'Tablespoon'),
        ('tsp', 'Teaspoon'),
        ('piece', 'Piece'),
    ]

class ShoppingList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class Item(models.Model):
    name = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=5, choices=UNITS)
    shoppingList = models.ForeignKey(ShoppingList, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
