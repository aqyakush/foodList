from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from mealPlan import views

urlpatterns = [
    path('mealPlan/', views.MealPlanList.as_view()),
    path('mealPlan/<int:pk>/', views.MealPlanDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)