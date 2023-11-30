# Generated by Django 4.2.6 on 2023-11-30 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('recipes', '0002_amount'),
    ]

    operations = [
        migrations.CreateModel(
            name='MealPlan',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('beginning_date', models.DateField()),
                ('end_date', models.DateField()),
                ('recipes', models.ManyToManyField(to='recipes.recipe')),
            ],
        ),
    ]
