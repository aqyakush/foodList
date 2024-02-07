from django.test import TestCase, Client
from django.urls import reverse
from mealPlans.models import MealPlan
# from recipes.models import Ingredient, Recipe, RecipeIngredient
# from shoppingLists.models import Item
from datetime import date, timedelta


class MealPlanViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        end_date = date.today() + timedelta(days=7)
        self.mealPlan = MealPlan.objects.create(name='Test Meal Plan',
                                                start_date=date.today(),
                                                end_date=end_date)
        self.url = reverse('mealPlans:mealPlan-detail',
                           kwargs={'pk': self.mealPlan.id})

    def test_mealPlan_detail_view(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Meal Plan')

    # def test_mealPlan_patch_view(self):
    #     response = self.client.patch(self.url, {'name': 'Updated Meal Plan'})
    #     self.assertEqual(response.status_code, 302)
    #     self.mealPlan.refresh_from_db()
    #     self.assertEqual(self.mealPlan.name, 'Updated Meal Plan')

    # def test_mealPlan_update_view(self):
    #     new_recipe = Recipe.objects.create(name='New Recipe')
    #     ingredient = Ingredient.objects.create(name='Test Ingredient')
    #     RecipeIngredient.objects.create(recipe=new_recipe,
    #                                     ingredient=ingredient,
    #                                     amount=2,
    #                                     unit='cup')

    #     response = self.client.put(self.url, {'recipe_id': new_recipe.id})
    #     self.assertEqual(response.status_code, 200)

    #     item = Item.objects.get(ingredient=ingredient,
    #                             shopping_list=self.mealPlan.shopping_list)

    #     # Check if the shopping list is updated correctly
    #     item.refresh_from_db()
    #     self.assertEqual(item.amount, 2)
    #     self.assertEqual(item.unit, 'cup')

    #     # Add same recipe to meal plan
    #     response = self.client.put(self.url, {'recipe_id': new_recipe.id})
    #     self.assertEqual(response.status_code, 200)

    #     # Check if the shopping lists item is updated correctly
    #     item.refresh_from_db()
    #     self.assertEqual(item.amount, 4)
    #     self.assertEqual(item.unit, 'cup')