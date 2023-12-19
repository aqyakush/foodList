import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MealPlan } from '../../../types';
import Card from '../../../components/Cards';
import useFetch from '../../../hooks/apiHooks/useFetch';
import ShoppingList from '../../../types/shoppingList';
import { API_URL, SHOPPING_LIST_MEAL_PLAN_QUERY, SHOPPING_LIST_QUERY } from '../../../utils/apis';
import { set } from 'date-fns';

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
    const [toggle, setToggle] = useState(false);
    const [shoppingList, setShoppingList] = useState<ShoppingList>();
    // TODO: Update shopping list when the recipe is added to meal plan
    const { data, isLoading, refetch } = useFetch<ShoppingList>(`${API_URL}${SHOPPING_LIST_MEAL_PLAN_QUERY}${mealPlan.id}`);


    const handleToggle = () => {
        if (!toggle) {
            refetch();
            if (data) {
                setShoppingList(data);
            }
        }
        setToggle(!toggle);
    };

    return (
        <Card key={mealPlan.name}>
            <MealPlanTitle>{`${mealPlan.name} (${mealPlan.start_date} - ${mealPlan.end_date})`} </MealPlanTitle>
            Recipes:
            <RecipeList>
                {mealPlan.recipes?.map((recipe) => (
                    <RecipeItem key={recipe.name}>{recipe.name}</RecipeItem>
                ))}
            </RecipeList>
            <button onClick={handleToggle}>{toggle ? 'Hide Shopping List' : 'Show Shopping List'}</button>
            {toggle && shoppingList && (
                <div>
                    <h2>Shopping List:</h2>
                    {shoppingList.name}
                    {shoppingList.items?.map((item) => (<div>{item.name}</div>))}
                </div>
            )}      
        </Card>
    );
};

export default MealPlanCard;
