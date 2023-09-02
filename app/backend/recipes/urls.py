from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from recipes import views

urlpatterns = [
    path('recipes/', views.RecipeList.as_view()),
    path('recipes/<int:pk>/', views.RecipeDetail.as_view()),
    path('ingrediens/', views.IngredientList.as_view()),
    path('ingrediens/<int:pk>/', views.IngredientDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)