from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import MealDetail, MealPlanList
from .views import MealPlanDetail

app_name = 'mealPlans'

urlpatterns = [
    path('', MealPlanList.as_view(), name='mealPlan-list'),
    path('<int:pk>/', MealPlanDetail.as_view(), name='mealPlan-detail'),
    path('meal/<int:pk>/', MealDetail.as_view(), name='meal-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
