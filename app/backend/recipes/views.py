from django.http import JsonResponse
from rest_framework import generics
from django.db.models import Q
from .models import Ingredient, Recipe, RecipeIngredient
from .serializers import RecipeSerializer, IngredientSerializer
import logging
from django.db import transaction

from rest_framework import generics

logger = logging.getLogger(__name__)

class RecipeList(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        queryset = Recipe.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(Q(name__icontains=name))
        return queryset
    
    # def perform_create(self, serializer):
    #     if (not serializer.is_valid()):
    #         logger.error("step 0")
    #         return JsonResponse(serializer.errors, status=400)
    #     logger.error(serializer.validated_data)
    #     amounts_data = serializer.validated_data.pop('recipeingredient_set')
    #     logger.error("step 1")
    #     new_ingredients = []
    #     with transaction.atomic():
    #         logger.error("step 2")
    #         recipe = Recipe.objects.create(**serializer.validated_data)
    #         logger.error("step 3")
    #         for amount_data in amounts_data:
    #             logger.error(amount_data)
    #             name = amount_data['ingredient']['name']
    #             logger.error('step 4')
    #             logger.error(name)
    #             ingredient, created = Ingredient.objects.get_or_create(name=name)
    #             logger.error('step 5')
    #             new_ingredients.append(ingredient)
    #             logger.error('step 6')
    #             RecipeIngredient.objects.create(recipe=recipe, ingredient=ingredient, amount=amount_data['amount'], unit=amount_data['unit'])
    #             logger.error('step 7')
    #         logger.error('step 8')
    #         queryset = Recipe.objects.filter(pk=recipe.id)
    #         logger.error('step 9')
    #         serializer = RecipeSerializer(queryset, many=True)
    #         logger.error('step 10')
    #     return JsonResponse(serializer.data, status=201, safe=False)


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class IngredientList(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()
        logger.error("ingredient list")
        recipe_id = self.request.query_params.get('recipe_id', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe__id=recipe_id)
        return queryset

class IngredientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
