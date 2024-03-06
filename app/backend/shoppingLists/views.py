from rest_framework import generics
from .models import ShoppingList, Item
from .serializers import ItemSerializer, ShoppingListSerializer
import logging

logger = logging.getLogger(__name__)


class ItemListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ShoppingListList(generics.ListCreateAPIView):
    queryset = ShoppingList.objects.all().prefetch_related('items')
    serializer_class = ShoppingListSerializer


class ShoppingListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

