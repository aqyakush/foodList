import React, { useState, useEffect } from 'react';

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
            <h1 style={{ fontSize: '2rem' }}>{recipe.name}</h1>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeView;
