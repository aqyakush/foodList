from rest_framework import generics, views, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import logging

from recipes.models import Recipe
from .models import MealPlan, Meal
from .serializers import MealPlanSerializer, MealSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

logger = logging.getLogger(__name__)


class MealPlanList(generics.ListCreateAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer


class MealPlanDetail(ViewSet, generics.RetrieveUpdateDestroyAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    # TODO: Remove or improve to patch any information about the meal plan
    def update(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        recipe = Recipe.objects.get(pk=request.data.get('recipe_id'))

        meal = Meal.objects.create(meal_plan=mealPlan, recipe=recipe)

        meal.save()
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
