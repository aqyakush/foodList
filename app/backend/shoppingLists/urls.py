from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from shoppingLists import views

urlpatterns = [
    path('', views.ShoppingListList.as_view()),
    path('<int:pk>/', views.ShoppingListDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)