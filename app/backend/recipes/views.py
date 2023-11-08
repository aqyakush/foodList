from rest_framework import generics
from django.db.models import Q
from .models import Ingredient, Recipe, Amount
from .serializers import RecipeSerializer, IngredientSerializer

from rest_framework import generics

class RecipeList(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        queryset = Recipe.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(Q(name__icontains=name))
        return queryset


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class IngredientList(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()
        recipe_id = self.request.query_params.get('recipe_id', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe__id=recipe_id)
        return queryset

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
