import React from 'react';
import styled from 'styled-components';
import { Recipe } from '../../../types';
import Card from '../../../components/Cards';
import MealPlanDropdown from './dropDownMealPlans';

type RecipeProps = {
    recipe: Recipe;
};

const RecipeTitle = styled.h1`
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const IngredientList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const IngredientItem = styled.li`
    padding: 10px;
    position: relative;
`;

const RecipeCard: React.FC<RecipeProps> = ({ recipe }) => {
    return (
        <Card key={recipe.name}>
            <RecipeTitle>{recipe.name}</RecipeTitle>
            Ingredients:
            <IngredientList>
                {recipe.amount_set.map((amount) => (
                    <IngredientItem key={amount.ingredient.name}>{amount.ingredient.name} {amount.amount} {amount.unit}</IngredientItem>
                ))}
            </IngredientList>
            <p>{recipe.description}</p>
            <MealPlanDropdown recipeId={recipe.id}/>
        </Card>
    );
};

export default RecipeCard;
