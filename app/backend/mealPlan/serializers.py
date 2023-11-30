from rest_framework import serializers
from .models import MealPlan
from recipes.models import Recipe  # Import the Recipe model

class MealPlanSerializer(serializers.ModelSerializer):
    recipes = serializers.PrimaryKeyRelatedField(many=True, queryset=Recipe.objects.all())

    class Meta:
        model = MealPlan
        fields = '__all__'