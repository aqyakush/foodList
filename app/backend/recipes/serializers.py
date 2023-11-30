from rest_framework import serializers
from .models import Recipe, Ingredient, Amount
from django.db import transaction
import logging

logger = logging.getLogger(__name__)

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
            for ingredient_data in ingredients_data:
                logger.error("ingredient_data")
                logger.error(ingredient_data)
                ingredient, created = Ingredient.objects.get_or_create(name=ingredient_data['name'], recipe=recipe)
                new_ingredients.append(ingredient)
                logger.error("ingredient")
                logger.error(ingredient)
                amount_data = ingredient_data['amount_set']['first']
                Amount.objects.create(recipe=recipe, ingredient=ingredient, amount=amount_data['amount'], unit=amount_data['unit'])
        recipe.ingredients.set(new_ingredients)
        return recipe


