from rest_framework import serializers
from .models import ShoppingList, Item


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['amount', 'unit', 'ingredient', 'shopping_list',
                  'is_bought', 'name', 'id']

    def get_name(self, obj):
        return obj.ingredient.name if obj.ingredient else obj.name


class ShoppingListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = ShoppingList
        fields = ['name', 'meal_plan', 'items', 'id']
