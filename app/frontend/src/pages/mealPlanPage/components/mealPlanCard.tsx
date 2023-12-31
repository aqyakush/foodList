import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MealPlan } from '../../../types';
import Card from '../../../components/Cards';
import useFetch from '../../../hooks/apiHooks/useFetch';
import ShoppingList from '../../../types/shoppingList';
import { API_URL, MEAL_PLAN_QUERY, RECIPES_QUERY, SHOPPING_LIST_MEAL_PLAN_QUERY, SHOPPING_LIST_QUERY } from '../../../utils/apis';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import { RemoveButton } from '../../mainPage/components/createRecipeCard';

type MealPlanCardProps = {
    mealPlan: MealPlan;
    refetchMealPlan: () => void;
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
    padding-left: 5px;
    padding-top: 2px;
    position: relative;
`;

const RecipeRow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan, refetchMealPlan }) => {
    const [toggle, setToggle] = useState(false);
    const [shoppingList, setShoppingList] = useState<ShoppingList>();
    // TODO: Update shopping list when the recipe is added to meal plan
    const { data, isLoading, refetch } = useFetch<ShoppingList>(`${API_URL}${SHOPPING_LIST_MEAL_PLAN_QUERY}${mealPlan.id}`);

    const { deleteItem } = useDeleteFetch();

    const handleToggle = () => {
        if (!toggle) {
            refetch();
            if (data) {
                setShoppingList(data);
            }
        }
        setToggle(!toggle);
    };

    const handleDelete = async (mealPlanId: number, recipeId:number) => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${mealPlanId}/${RECIPES_QUERY}${recipeId}`)
        refetchMealPlan();
    };

    return (
        <Card key={mealPlan.name}>
            <MealPlanTitle>{`${mealPlan.name} (${mealPlan.start_date} - ${mealPlan.end_date})`} </MealPlanTitle>
            Recipes:
            <RecipeList>
                {mealPlan.recipes?.map((recipe) => (
                    <RecipeRow>
                        <RemoveButton type="button" onClick={() => {
                            handleDelete(mealPlan.id, recipe.id)
                        }}>✖</RemoveButton>
                        <RecipeItem key={recipe.name}>{recipe.name}</RecipeItem>
                    </RecipeRow>
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
