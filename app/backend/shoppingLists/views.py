from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MealPlan, ShoppingList, Item
from .serializers import ShoppingListSerializer

class ShoppingListList(generics.ListCreateAPIView):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

class ShoppingListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

class ShoppingListFromMealPlan(APIView):
     def post(self, request, format=None):
        meal_plan_id = request.data.get('meal_plan_id')
        meal_plan = MealPlan.objects.get(id=meal_plan_id)
        
        # Create a new ShoppingList instance
        shopping_list, created = ShoppingList.objects.get_or_create(meal_plan=meal_plan)

        # Populate the ShoppingList with ShoppingListItem instances for each ingredient in the meal plan
        for recipe in meal_plan.recipes.all():
            for ingredient in recipe.ingredients.all():
                try:
                    item = Item.objects.get(shopping_list=shopping_list, name=ingredient.name)
                    item.delete()  # If it does, delete it
                except Item.DoesNotExist:
                    pass  # If it doesn't, do nothing
                # Create a new item
                Item.objects.create(shopping_list=shopping_list, name=ingredient.name)

        return Response({'shopping_list_id': shopping_list.id}, status=status.HTTP_201_CREATED)