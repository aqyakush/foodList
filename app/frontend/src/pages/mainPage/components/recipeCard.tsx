import React from 'react';
import styled from 'styled-components';
import { Recipe } from '../../../types';
import Card from '../../../components/Cards';

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
                {recipe.ingredients.map((ingredient) => (
                    <IngredientItem key={ingredient.name}>{ingredient.name} {ingredient.amount?.amount} {ingredient.amount?.unit}</IngredientItem>
                ))}
            </IngredientList>
            <p>{recipe.description}</p>
        </Card>
    );
};

export default RecipeCard;
