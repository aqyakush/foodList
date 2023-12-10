from rest_framework import serializers
from .models import Recipe, Ingredient, Amount
from django.db import transaction
import logging

logger = logging.getLogger('testlogger')

class AmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amount
        fields = ['amount', 'unit']

class IngredientSerializer(serializers.ModelSerializer):
    amount = AmountSerializer(source="amount_set.first")
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = '__all__'
    
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        new_ingredients = []
        with transaction.atomic():
            recipe = Recipe.objects.create(**validated_data)
            logger.error("recipe")
            logger.error(recipe)
            for ingredient_data in ingredients_data:
                name = ingredient_data.pop('name')
                ingredient, created = Ingredient.objects.get_or_create(name=name, defaults=ingredient_data)
                logger.error("ingredient")
                logger.error(ingredient)
                new_ingredients.append(ingredient)
                amount_data = ingredient_data['amount_set']['first']
                Amount.objects.create(recipe=recipe, ingredient=ingredient, amount=amount_data['amount'], unit=amount_data['unit'])
            logger.error("new_ingredients")
            logger.error(new_ingredients)
            recipe.ingredients.set(new_ingredients)
        return recipe


