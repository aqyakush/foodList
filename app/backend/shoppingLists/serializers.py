from rest_framework import serializers
from .models import ShoppingList, Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ShoppingListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = ShoppingList
        fields = ['name', 'meal_plan', 'items']
