from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MealPlan, ShoppingList, Item
from .serializers import ItemSerializer, ShoppingListSerializer
import logging
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)

class ItemListView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ShoppingListList(generics.ListCreateAPIView):
    queryset = ShoppingList.objects.all().prefetch_related('items') 
    serializer_class = ShoppingListSerializer


class ShoppingListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer


class ShoppingListByMealPlanView(generics.RetrieveAPIView):
    serializer_class = ShoppingListSerializer

    def get_object(self):
        meal_plan_id = self.kwargs.get('meal_plan_id')
        return get_object_or_404(ShoppingList, meal_plan__id=meal_plan_id)


class ShoppingListFromMealPlan(APIView):
    def post(self, request, format=None):
        meal_plan_id = request.data.get('meal_plan_id')
        meal_plan_name = request.data.get('meal_plan_name')

        meal_plan = MealPlan.objects.get(id=meal_plan_id)

        default_values = {
            'name': meal_plan_name,
            'meal_plan': meal_plan,
        }

        # Create a new ShoppingList instance
        shopping_list, created = ShoppingList.objects.get_or_create(meal_plan=meal_plan, defaults=default_values)
        logger.error("shopping list created")
        logger.error(meal_plan.recipes.all())
        # Populate the ShoppingList with ShoppingListItem instances for each ingredient in the meal plan
        for recipe in meal_plan.recipes.all():
            for ingredient in recipe.ingredients.all():
                try:
                    item = Item.objects.get(shopping_list=shopping_list, name=ingredient.name)
                    item.delete()  # If it does, delete it
                except Item.DoesNotExist:
                    pass  # If it doesn't, do nothing
                # Create a new item
                item = Item.objects.create(shopping_list=shopping_list, name=ingredient.name)
                item = Item.objects.get(id=item.id)
                logger.error("item created")
                logger.error(item)
                logger.error("item and fetched")

        return Response({'shopping_list_id': shopping_list.id}, status=status.HTTP_201_CREATED)
        