from rest_framework import serializers
from .models import ShoppingList
from recipes.models import Ingredient

class ShoppingListSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(many=True, queryset=Ingredient.objects.all())

    class Meta:
        model = ShoppingList
        fields = '__all__'