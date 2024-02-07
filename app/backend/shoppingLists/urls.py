from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from shoppingLists import views
from .views import ItemDetail, ItemListView

urlpatterns = [
    path('', views.ShoppingListList.as_view()),
    path('<int:pk>/', views.ShoppingListDetail.as_view()),
    path('items/', ItemListView.as_view(), name='item_list'),
    path('items/<int:pk>/', ItemDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
