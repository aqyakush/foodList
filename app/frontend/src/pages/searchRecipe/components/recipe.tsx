import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type RecipeProps = {
    recipe: {
    id: number,
    name: string,
  }
};

type Ingredient = {
    id: number;
    name: string;
}

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
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await fetch(`http://192.168.49.2/api/ingrediens/?recipe_id=${recipe.id}`);
            const data = await response.json();
            setIngredients(data);
        };
        fetchIngredients();
    }, [recipe.id]);

    return (
        <div>
            <RecipeTitle>{recipe.name}</RecipeTitle>
            <IngredientList>
                {ingredients.map((ingredient) => (
                    <IngredientItem key={ingredient.id}>{ingredient.name}</IngredientItem>
                ))}
            </IngredientList>
        </div>
    );
};

export default RecipeView;
