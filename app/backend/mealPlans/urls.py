from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import RemoveRecipeFromMealPlanView, MealPlanList, MealPlanDetail, AddRecipeToMealPlanView

urlpatterns = [
    path('', MealPlanList.as_view()),
    path('<int:pk>/', MealPlanDetail.as_view()),
    path('<int:meal_plan_id>/recipes/<int:recipe_id>/', RemoveRecipeFromMealPlanView.as_view(), 
         name='remove_recipe_from_mealplan'),
    path('<int:meal_plan_id>/recipes/<int:recipe_id>/', AddRecipeToMealPlanView.as_view(), 
         name='add_recipe_to_mealplan'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
