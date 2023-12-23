from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
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

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=5, choices=UNITS)

    class Meta:
        unique_together = ('recipe', 'ingredient')

    def __str__(self):
        return f"{self.amount} {self.unit}"
