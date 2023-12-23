from rest_framework import serializers
from .models import Recipe, Ingredient, RecipeIngredient
from django.db import transaction


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    recipe = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'recipe', 'amount', 'unit']


class RecipeSerializer(serializers.ModelSerializer):
    amount_set = RecipeIngredientSerializer(many=True,
                                            source='recipeingredient_set')

    class Meta:
        model = Recipe
        fields = ['name', 'description', 'amount_set', 'id']

    def validate(self, data):
        return data

    def create(self, validated_data):
        recipeingredient_set_data = validated_data.pop('recipeingredient_set')
        with transaction.atomic():
            recipe = Recipe.objects.create(**validated_data)
            for recipeingredient_data in recipeingredient_set_data:
                ingredient_data = recipeingredient_data.pop('ingredient')
                ingredient, created = \
                    Ingredient.objects.get_or_create(
                        name=ingredient_data['name'])
                RecipeIngredient.objects.create(
                    recipe=recipe,
                    ingredient=ingredient,
                    **recipeingredient_data
                )
        return recipe
