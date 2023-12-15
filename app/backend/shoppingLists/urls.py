from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from shoppingLists import views
from .views import ShoppingListFromMealPlan

urlpatterns = [
    path('', views.ShoppingListList.as_view()),
    path('<int:pk>/', views.ShoppingListDetail.as_view()),
    path('shoppinglist_from_mealplan/', ShoppingListFromMealPlan.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)