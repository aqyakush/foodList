from django.db import models
from mealPlans.models import MealPlan
from recipes.models import Ingredient

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
    meal_plan = models.OneToOneField(MealPlan, on_delete=models.CASCADE,
                                     null=True, related_name='shopping_list')

    def __str__(self):
        return self.name


class Item(models.Model):
    amount = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    unit = models.CharField(max_length=5, choices=UNITS, null=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE,
                                   related_name='items', null=True)
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE,
                                      related_name='items')
    is_bought = models.BooleanField(default=False)
    name = models.CharField(max_length=255, null=True)  # Add this line

    def save(self, *args, **kwargs):
        if self.ingredient and not self.name:
            self.name = self.ingredient.name
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('ingredient', 'shopping_list',)

    def __str__(self):
        return self.ingredient.name if self.ingredient else self.name
