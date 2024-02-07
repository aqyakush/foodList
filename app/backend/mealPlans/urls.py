from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import MealDetail, MealPlanList
from .views import MealPlanDetail

urlpatterns = [
    path('', MealPlanList.as_view()),
    path('<int:pk>/', MealPlanDetail.as_view()),
    path('meal/<int:pk>/', MealDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
