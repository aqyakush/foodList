#!/bin/bash

# Flush the database
pod_name=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep '^backend')

echo yes | kubectl exec -ti $pod_name -- python manage.py flush

# Replace with your actual API endpoint
RECIPES_URL="http://192.168.49.2/api/recipes/"

# JSON data for Spaghetti Bolognese
RECIPES_DATA1='{
  "name": "Spaghetti Bolognese",
  "description": "A classic Italian dish with a rich and meaty sauce served over spaghetti.",
  "amount_set": [
    {
      "amount": "500",
      "unit": "g",
      "ingredient": {
        "name": "Spaghetti"
      }
    },
    {
      "amount": "400",
      "unit": "g",
      "ingredient": {
        "name": "Ground Beef"
      }
    },
    {
      "amount": "1",
      "unit": "piece",
      "ingredient": {
        "name": "Tomato Sauce"
      }
    },
    {
      "amount": "1",
      "unit": "piece",
      "ingredient": {
        "name": "Onion"
      }
    },
    {
      "amount": "2",
      "unit": "piece",
      "ingredient": {
        "name": "Garlic"
      }
    }
  ]
}'

# JSON data for Chicken Alfredo
RECIPES_DATA2='{
  "name": "Chicken Alfredo",
  "description": "A rich and creamy Italian dish with chicken and pasta in a creamy alfredo sauce.",
  "amount_set": [
    {
      "amount": "500",
      "unit": "g",
      "ingredient": {
        "name": "Fettuccine"
      }
    },
    {
      "amount": "400",
      "unit": "g",
      "ingredient": {
        "name": "Chicken Breast"
      }
    },
    {
      "amount": "500",
      "unit": "ml",
      "ingredient": {
        "name": "Alfredo Sauce"
      }
    },
    {
      "amount": "250",
      "unit": "g",
      "ingredient": {
        "name": "Parmesan Cheese"
      }
    }
  ]
}'

RECIPES_DATA3='{
  "name": "Beef Stew",
  "description": "A hearty dish with tender beef and vegetables in a rich gravy.",
  "amount_set": [
    {
      "amount": "500",
      "unit": "g",
      "ingredient": {
        "name": "Beef"
      }
    },
    {
      "amount": "4",
      "unit": "piece",
      "ingredient": {
        "name": "Potato"
      }
    },
    {
      "amount": "2",
      "unit": "piece",
      "ingredient": {
        "name": "Carrot"
      }
    },
    {
      "amount": "1",
      "unit": "piece",
      "ingredient": {
        "name": "Onion"
      }
    }
  ]
}'

# JSON data for Vegetable Stir Fry
RECIPES_DATA4='{
  "name": "Vegetable Stir Fry",
  "description": "A quick and easy dish of stir fried vegetables with soy sauce and sesame oil.",
  "amount_set": [
    {
      "amount": "1",
      "unit": "piece",
      "ingredient": {
        "name": "Bell Pepper"
      }
    },
    {
      "amount": "1",
      "unit": "piece",
      "ingredient": {
        "name": "Carrot"
      }
    },
    {
      "amount": "100",
      "unit": "g",
      "ingredient": {
        "name": "Mushrooms"
      }
    },
    {
      "amount": "2",
      "unit": "tbsp",
      "ingredient": {
        "name": "Soy Sauce"
      }
    },
    {
      "amount": "1",
      "unit": "tbsp",
      "ingredient": {
        "name": "Sesame Oil"
      }
    }
  ]
}'

# Send POST request to create Spaghetti Bolognese
RECIPE1=$(curl -X POST -H "Content-Type: application/json" -d "$RECIPES_DATA1" $RECIPES_URL)

# Send POST request to create Chicken Alfredo
RECIPE2=$(curl -X POST -H "Content-Type: application/json" -d "$RECIPES_DATA2" $RECIPES_URL)

# Send POST request to create Beef Stew
RECIPE3=$(curl -X POST -H "Content-Type: application/json" -d "$RECIPES_DATA3" $RECIPES_URL)

# Send POST request to create Vegetable Stir Fry
RECIPE4=$(curl -X POST -H "Content-Type: application/json" -d "$RECIPES_DATA4" $RECIPES_URL)

# Array of recipe IDs
RECIPES=("$RECIPE1" "$RECIPE2" "$RECIPE3" "$RECIPE4")


MEALPLAN_URL="http://192.168.49.2/api/mealPlans/"

# JSON data for mealplan
MEALPLAN_DATA='{
  "name": "January meal plan",
  "start_date": "2023-01-01",
  "end_date": "2023-01-07"
}'

# Send POST request to create a mealplan
MEALPLAN=$(curl -s -X POST -H "Content-Type: application/json" -d "$MEALPLAN_DATA" $MEALPLAN_URL)
MEALPLAN_ID=$(echo $MEALPLAN | jq -r '.id')

# Replace with your actual API endpoint
MEALPLAN_ID_URL="http://192.168.49.2/api/mealPlans/${MEALPLAN_ID}/"


# Iterate over the array of recipe IDs
for RECIPE in "${RECIPES[@]}"
do
  # JSON data
  RECIPE_ID=$(echo $RECIPE | jq -r '.id')
  ADD_RECIPE_DATA="{\"recipe_id\": \"$RECIPE_ID\"}"

  # Send PATCH request to add a recipe to the meal plan
  curl -X PATCH -H "Content-Type: application/json" -d "$ADD_RECIPE_DATA" $MEALPLAN_ID_URL
done

#CREATE_SHOPPING_LIST_URL="http://192.168.49.2/api/shoppingLists/shoppinglist_from_mealplan/"

#CREATE_SHOPPING_LIST_DATA='{
  #"meal_plan_id": '$MEALPLAN_ID',
  #"meal_plan_name": "Weekly Shopping List"
#}'

#curl -s -X POST -H "Content-Type: application/json" -d "$CREATE_SHOPPING_LIST_DATA" $CREATE_SHOPPING_LIST_URL
