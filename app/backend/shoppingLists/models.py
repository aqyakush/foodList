from django.db import models
from mealPlans.models import MealPlan

UNITS = [
        ('kg', 'Kilogram'),
        ('g', 'Gram'),
        ('ml', 'Milliliter'),
        ('l', 'Liter'),
        ('tbsp', 'Tablespoon'),
        ('tsp', 'Teaspoon'),
        ('piece', 'Piece'),
        ('cup', 'Cup'),
        ('unit', 'Unit'),
    ]


class ShoppingList(models.Model):
    name = models.CharField(max_length=200)
    meal_plan = models.OneToOneField(MealPlan, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    unit = models.CharField(max_length=5, choices=UNITS, null=True)
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE, related_name='items')
    
    def __str__(self):
        return self.name
