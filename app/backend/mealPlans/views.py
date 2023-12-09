from rest_framework import generics, status
from .models import MealPlan, Recipe
from .serializers import MealPlanSerializer
from rest_framework.response import Response

class MealPlanList(generics.ListCreateAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

class MealPlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    def patch(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        recipe = Recipe.objects.get(pk=request.data.get('recipe_id'))

        mealPlan.recipes.add(recipe)

        return Response(MealPlanSerializer(mealPlan).data, status=status.HTTP_200_OK)