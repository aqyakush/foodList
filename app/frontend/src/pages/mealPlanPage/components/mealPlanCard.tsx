import React from 'react';
import styled from 'styled-components';
import { MealPlan } from '../../../types';
import Card from '../../../components/Cards';

type MealPlanCardProps = {
    mealPlan: MealPlan;
};

const MealPlanTitle = styled.h1`
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const RecipeList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const RecipeItem = styled.li`
    padding: 10px;
    position: relative;
`;

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan }) => {
    return (
        <Card key={mealPlan.name}>
            <MealPlanTitle>{`${mealPlan.name} (${mealPlan.beginning_date} - ${mealPlan.end_date})`} </MealPlanTitle>
            Recipes:
            <RecipeList>
                {mealPlan.recipes?.map((recipe) => (
                    <RecipeItem key={recipe.name}>{recipe.name}</RecipeItem>
                ))}
            </RecipeList>
        </Card>
    );
};

export default MealPlanCard;
