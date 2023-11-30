from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from mealPlans import views

urlpatterns = [
    path('', views.MealPlanList.as_view()),
    path('<int:pk>/', views.MealPlanDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)