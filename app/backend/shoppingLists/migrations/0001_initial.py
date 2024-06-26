# Generated by Django 4.2.6 on 2024-02-07 09:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('recipes', '0001_initial'),
        ('mealPlans', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShoppingList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('meal_plan', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='shopping_list', to='mealPlans.mealplan')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=6, null=True)),
                ('unit', models.CharField(choices=[('kg', 'Kilogram'), ('g', 'Gram'), ('ml', 'Milliliter'), ('l', 'Liter'), ('tbsp', 'Tablespoon'), ('tsp', 'Teaspoon'), ('piece', 'Piece'), ('cup', 'Cup'), ('unit', 'Unit')], max_length=5, null=True)),
                ('is_bought', models.BooleanField(default=False)),
                ('ingredient', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='recipes.ingredient')),
                ('shopping_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='shoppingLists.shoppinglist')),
                ('name', models.CharField(max_length=255, null=True)),
            ],
            options={
                'unique_together': {('ingredient', 'shopping_list')},
            },
        ),
    ]
