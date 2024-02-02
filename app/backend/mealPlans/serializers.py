from rest_framework import serializers

from .models import Meal, MealPlan
from recipes.serializers import RecipeSerializer


class MealPlanSerializer(serializers.ModelSerializer):
    meals = serializers.PrimaryKeyRelatedField(many=True,
                                               queryset=Meal.objects.all(),
                                               required=False)

    class Meta:
        model = MealPlan
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['meals'] = MealSerializer(instance.meals.all(),
                                                 many=True).data
        return representation


class MealSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(required=True, allow_null=True)

    class Meta:
        model = Meal
        fields = ['id', 'date', 'recipe', 'meal_plan']

    def validate(self, data):
        """
        Check that the date is between start_date and end_date of
        the meal_plan.
        """
        meal = self.instance
        meal_plan = meal.meal_plan
        if not hasattr(meal_plan, 'start_date') or not hasattr(meal_plan,
                                                               'end_date'):
            raise serializers.ValidationError(
                "Meal plan does not have 'start_date' or 'end_date'."
            )

        if data['date'] < meal_plan.start_date or \
           data['date'] > meal_plan.end_date:
            raise serializers.ValidationError(
                "The date of the meal is not within the start and end date "
                "of the meal plan."
            )

        return data

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     if hasattr(instance, 'recipe'):
    #         representation['recipe'] = RecipeSerializer().data
    #     return representation
