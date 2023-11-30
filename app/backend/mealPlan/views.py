from rest_framework import generics
from .models import MealPlan
from .serializers import MealPlanSerializer

class MealPlanList(generics.ListCreateAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

class MealPlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer