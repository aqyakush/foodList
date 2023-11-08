import React from 'react';
import styled from 'styled-components';
import { Recipe } from '..';

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

const RecipeView: React.FC<RecipeProps> = ({ recipe }) => {
    return (
        <div>
            <RecipeTitle>{recipe.name}</RecipeTitle>
            <IngredientList>
                {recipe.ingredients.map((ingredient) => (
                    <IngredientItem key={ingredient.id}>{ingredient.name}</IngredientItem>
                ))}
            </IngredientList>
        </div>
    );
};

export default RecipeView;
