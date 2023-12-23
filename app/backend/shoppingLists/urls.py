from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from shoppingLists import views
from .views import ItemListView, ShoppingListByMealPlanView, ShoppingListFromMealPlan

urlpatterns = [
    path('', views.ShoppingListList.as_view()),
    path('<int:pk>/', views.ShoppingListDetail.as_view()),
    path('shoppinglist_from_mealplan/', ShoppingListFromMealPlan.as_view()),
    path('mealPlan/<int:meal_plan_id>/', ShoppingListByMealPlanView.as_view(), name='shoppinglist_by_mealplan'),
    path('items/', ItemListView.as_view(), name='item_list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
