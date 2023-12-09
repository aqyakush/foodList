from rest_framework import serializers
from .models import MealPlan
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer

class MealPlanSerializer(serializers.ModelSerializer):
    recipes = serializers.PrimaryKeyRelatedField(many=True, queryset=Recipe.objects.all(), required=False)

    class Meta:
        model = MealPlan
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['recipes'] = RecipeSerializer(instance.recipes.all(), many=True).data
        return representation