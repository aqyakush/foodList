import React from 'react';
import styled from 'styled-components';
import { Recipe } from '../../../types';
import Card from '../../../components/Cards';
import MealPlanDropdown from './dropDownMealPlans';

type RecipeProps = {
    recipe: Recipe;
};

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

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

const Arrow = styled.div`
    text-align: right;
    cursor: pointer;
`;

const RecipeCard: React.FC<RecipeProps> = ({ recipe }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    const handleTitleClick = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <Card key={recipe.name}>
            <TitleContainer onClick={handleTitleClick}>
                <RecipeTitle>{recipe.name}</RecipeTitle>
                <Arrow> {isExpanded ? '▼' : '►'}</Arrow>
            </TitleContainer>
            {isExpanded && (
                <>
                    Ingredients:
                    <IngredientList>
                        {recipe.amount_set.map((amount) => (
                            <IngredientItem key={amount.ingredient.name}>{amount.ingredient.name} {amount.amount} {amount.unit}</IngredientItem>
                        ))}
                    </IngredientList>
                    <p>{recipe.description}</p>
                    <MealPlanDropdown recipeId={recipe.id}/>
                </>
            )}
            
        </Card>
    );
};

export default RecipeCard;
