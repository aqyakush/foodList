from rest_framework import generics, views, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import MealPlan, Recipe
from .serializers import MealPlanSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet


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

        mealPlan.recipes.add(recipe)

        return Response(MealPlanSerializer(mealPlan).data,
                        status=status.HTTP_200_OK)

    @action(detail=True)
    def shoppingList(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        shoppingListData = []

        for recipe in mealPlan.recipes.all():
            for recipe_ingredient in recipe.recipeingredient_set.all():
                shoppingListData.append({
                    'name': recipe_ingredient.ingredient.name,
                    'amount': recipe_ingredient.amount,
                    'unit': recipe_ingredient.unit
                })

        return JsonResponse(shoppingListData, safe=False)


class RemoveRecipeFromMealPlanView(views.APIView):
    def delete(self, request, meal_plan_id, recipe_id):
        meal_plan = get_object_or_404(MealPlan, id=meal_plan_id)
        recipe = get_object_or_404(Recipe, id=recipe_id)

        meal_plan.recipes.remove(recipe)

        return Response(status=status.HTTP_204_NO_CONTENT)


class AddRecipeToMealPlanView(views.APIView):
    def post(self, request, meal_plan_id, recipe_id):
        meal_plan = get_object_or_404(MealPlan, id=meal_plan_id)
        recipe = get_object_or_404(Recipe, id=recipe_id)

        meal_plan.recipes.add(recipe)

        return Response(status=status.HTTP_204_NO_CONTENT)
