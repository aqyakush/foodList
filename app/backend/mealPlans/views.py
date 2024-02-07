from rest_framework import generics, status

from recipes.models import Recipe, RecipeIngredient
from shoppingLists.models import ShoppingList, Item
from .models import MealPlan, Meal
from .serializers import MealPlanSerializer, MealSerializer
from rest_framework.response import Response


class MealPlanList(generics.ListCreateAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    def perform_create(self, serializer):
        meal_plan = serializer.save()
        ShoppingList.objects.create(name=f'Shopping List for {meal_plan.name}',
                                    meal_plan=meal_plan)


class MealPlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer

    def update(self, request, *args, **kwargs):
        mealPlan = self.get_object()
        # Get the old recipes
        old_meals = set(mealPlan.meals.all())
        new_recipe = Recipe.objects.get(pk=request.data.get('recipe_id'))

        meal = Meal.objects.create(meal_plan=mealPlan, recipe=new_recipe)
        meal.save()

        # Get the new recipes
        new_meals = set(mealPlan.meals.all())

        # Check if the recipes were updated
        if old_meals != new_meals:
            # Create items and add them to the shopping list
            shopping_list = mealPlan.shopping_list
            # Get the recipes that were added
            for meal in new_meals - old_meals:
                recipe = meal.recipe
                for ingredient in recipe.ingredients.all():
                    item, created = Item.objects.get_or_create(
                        ingredient=ingredient, shopping_list=shopping_list)
                    recipeIngredient = RecipeIngredient.objects.get(
                            recipe=recipe, ingredient=ingredient)
                    if created:
                        item.amount = recipeIngredient.amount
                    else:
                        item.amount = item.amount + recipeIngredient.amount
                    item.unit = recipeIngredient.unit
                    item.save()

            # Get the recipes that were removed
            for meal in old_meals - new_meals:
                recipe = meal.recipe
                for ingredient in recipe.ingredients.all():
                    try:
                        item = Item.objects.get(ingredient=ingredient,
                                                shopping_list=shopping_list)
                        amount = RecipeIngredient.objects\
                            .get(recipe=recipe, ingredient=ingredient).amount
                        item.amount = item.amount - amount
                        if item.amount <= 0:
                            item.delete()
                        else:
                            item.save()
                    except Item.DoesNotExist:
                        pass

        mealPlan.save()

        return Response(MealPlanSerializer(mealPlan).data,
                        status=status.HTTP_200_OK)


class MealDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    def destroy(self, request, *args, **kwargs):
        meal = self.get_object()
        meal_plan = meal.meal_plan
        shopping_list = meal_plan.shopping_list
        recipe = meal.recipe

        # Get the recipes that were removed
        for ingredient in recipe.ingredients.all():
            try:
                item = Item.objects.get(ingredient=ingredient,
                                        shopping_list=shopping_list)
                item.amount -= RecipeIngredient.objects.get(
                    recipe=recipe, ingredient=ingredient).amount
                if item.amount <= 0:
                    item.delete()
                else:
                    item.save()
            except Item.DoesNotExist:
                pass

        meal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
