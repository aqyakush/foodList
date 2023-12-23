from rest_framework import generics, views, status
from django.shortcuts import get_object_or_404
from .models import MealPlan, Recipe
from .serializers import MealPlanSerializer
from rest_framework.response import Response


class MealPlanList(generics.ListCreateAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer


class MealPlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    # TODO: Remove or improve to patch any information about the meal plan
    def patch(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        recipe = Recipe.objects.get(pk=request.data.get('recipe_id'))

        mealPlan.recipes.add(recipe)

        return Response(MealPlanSerializer(mealPlan).data,
                        status=status.HTTP_200_OK)


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
