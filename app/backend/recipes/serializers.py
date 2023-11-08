from rest_framework import serializers
from .models import Recipe, Ingredient, Amount

class AmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amount
        fields = '__all__'
class IngredientSerializer(serializers.ModelSerializer):
    amount = AmountSerializer(many=True, read_only=True)
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient_data['name'])
            Amount.objects.create(recipe=recipe, ingredient=ingredient, amount=ingredient_data['amount'], unit=ingredient_data['unit'])
        return recipe


# from rest_framework import serializers
# from .models import Recipe, Ingredient, Amount

# from rest_framework import serializers
# from .models import Recipe, Ingredient, Amount

# class IngredientAmountSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     amount = serializers.DecimalField(max_digits=5, decimal_places=2)
#     unit = serializers.ChoiceField(choices=Amount.UNITS)

# class RecipeSerializer(serializers.ModelSerializer):
#     ingredients = IngredientAmountSerializer(many=True)

#     class Meta:
#         model = Recipe
#         fields = ['id', 'name', 'description', 'ingredients']

#     def create(self, validated_data):
#         ingredients_data = validated_data.pop('ingredients')
#         recipe = Recipe.objects.create(**validated_data)
#         for ingredient_data in ingredients_data:
#             ingredient, created = Ingredient.objects.get_or_create(name=ingredient_data['name'])
#             Amount.objects.create(recipe=recipe, ingredient=ingredient, amount=ingredient_data['amount'], unit=ingredient_data['unit'])
#         return recipe
    
# class IngredientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Ingredient
#         fields = ['id', 'name']

