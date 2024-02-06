from rest_framework import generics, views, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import logging

from recipes.models import Recipe, RecipeIngredient
from shoppingLists.models import ShoppingList, Item
from .models import MealPlan, Meal
from .serializers import MealPlanSerializer, MealSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

logger = logging.getLogger(__name__)


class MealPlanList(generics.ListCreateAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    def perform_create(self, serializer):
        meal_plan = serializer.save()
        ShoppingList.objects.create(name=f'Shopping List for {meal_plan.name}',
                                    meal_plan=meal_plan)


class MealPlanDetail(ViewSet, generics.RetrieveUpdateDestroyAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    # TODO: Remove or improve to patch any information about the meal plan
    def update(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        # Get the old recipes
        old_meals = set(mealPlan.meals.all())
        new_recipe = Recipe.objects.get(pk=request.data.get('recipe_id'))

        meal = Meal.objects.create(meal_plan=mealPlan, recipe=new_recipe)
        meal.save()

        # Get the new recipes
        new_meals = set(mealPlan.meals.all())

        if old_meals != new_meals:  # Check if the recipes were updated
            # Create items and add them to the shopping list
            shopping_list = mealPlan.shopping_list
            # Get the recipes that were added
            for meal in new_meals - old_meals:
                recipe = meal.recipe
                for ingredient in recipe.ingredients.all():
                    item, created = Item.objects.get_or_create(
                        ingredient=ingredient, shopping_list=shopping_list)
                    recipeIngredient = RecipeIngredient.objects.get(
                            recipe=recipe, ingredient=ingredient)
                    if created:
                        item.amount = recipeIngredient.amount
                    else:
                        item.amount = item.amount + recipeIngredient.amount
                    item.unit = recipeIngredient.unit
                    item.save()

            # Get the recipes that were removed
            for meal in old_meals - new_meals:
                recipe = meal.recipe
                for ingredient in recipe.ingredients.all():
                    try:
                        item = Item.objects.get(ingredient=ingredient,
                                                shopping_list=shopping_list)
                        amount = RecipeIngredient.objects\
                            .get(recipe=recipe, ingredient=ingredient).amount
                        item.amount = item.amount - amount
                        if item.amount <= 0:
                            item.delete()
                        else:
                            item.save()
                    except Item.DoesNotExist:
                        pass

        mealPlan.save()

        logger.info('Meal plan updated successfully')

        return Response(MealPlanSerializer(mealPlan).data,
                        status=status.HTTP_200_OK)

    @action(detail=True)
    def shoppingList(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        shoppingListData = []

        for meal in mealPlan.meals.all():
            for recipe_ingredient in meal.recipe.recipeingredient_set.all():
                shoppingListData.append({
                    'name': recipe_ingredient.ingredient.name,
                    'amount': recipe_ingredient.amount,
                    'unit': recipe_ingredient.unit
                })

        return JsonResponse(shoppingListData, safe=False)


class MealDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    def destroy(self, request, *args, **kwargs):
        meal = self.get_object()
        meal_plan = meal.meal_plan
        shopping_list = meal_plan.shopping_list
        recipe = meal.recipe

        # Get the recipes that were removed
        for ingredient in recipe.ingredients.all():
            try:
                item = Item.objects.get(ingredient=ingredient,
                                        shopping_list=shopping_list)
                item.amount -= RecipeIngredient.objects.get(
                    recipe=recipe, ingredient=ingredient).amount
                if item.amount <= 0:
                    item.delete()
                else:
                    item.save()
            except Item.DoesNotExist:
                pass

        meal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RemoveMealFromMealPlanView(views.APIView):
    def delete(self, request, meal_plan_id, meal_id):
        meal_plan = get_object_or_404(MealPlan, id=meal_plan_id)
        meal = get_object_or_404(Meal, id=meal_id)

        meal_plan.recipes.remove(meal)

        return Response(status=status.HTTP_204_NO_CONTENT)


class AddRecipeToMealPlanView(views.APIView):
    def post(self, request, meal_plan_id, meal_id):
        meal_plan = get_object_or_404(MealPlan, id=meal_plan_id)
        meal = get_object_or_404(Recipe, id=meal_id)

        meal_plan.meals.add(meal)

        return Response(status=status.HTTP_204_NO_CONTENT)
