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

    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # TODO: verify that start_date is before end_date

        overlapping_meal_plans = MealPlan.objects.filter(
            start_date__lte=end_date,
            end_date__gte=start_date
        )

        if self.instance:
            overlapping_meal_plans = overlapping_meal_plans.exclude(
                id=self.instance.id)

        if overlapping_meal_plans.exists():
            raise serializers.ValidationError(
                "The meal plan's start date and end date overlap with" +
                "another meal plan."
            )

        return data

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
