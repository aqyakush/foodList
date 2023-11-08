from django.db import models
from django.conf import settings

class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.name

class Amount(models.Model):
    UNITS = [
        ('kg', 'Kilogram'),
        ('g', 'Gram'),
        ('ml', 'Milliliter'),
        ('l', 'Liter'),
        ('tbsp', 'Tablespoon'),
        ('tsp', 'Teaspoon'),
        ('piece', 'Piece'),
    ]

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=5, choices=UNITS)

    class Meta:
        unique_together = ('recipe', 'ingredient')

    def __str__(self):
        return self.name