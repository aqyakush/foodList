import React, { useState } from 'react';
import styled from 'styled-components';
import { MealPlan, MealPlanPatch, Recipe } from '../../../types';
import Card from '../../../components/Cards';
import useFetch from '../../../hooks/apiHooks/useFetch';
import ShoppingList from '../../../types/shoppingList';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, MEAL_QUERY, RECIPES_QUERY, SHOPPING_LIST_MEAL_PLAN_QUERY } from '../../../utils/apis';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import AddRecipeSelection from './addRecipeSelection';
import ShoppingListSimple from '../../../types/shoppingListSimple';
import MealPlanCalendar from './mealPlanCalendar';
import MealList from './mealList';


type MealPlanCardProps = {
    mealPlan: MealPlan;
    refetchMealPlan: () => void;
};

type RecipesList = {
    recipe: Recipe;
    mealId: number;
}[] | undefined;

const MealPlanTitle = styled.h1`
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan, refetchMealPlan }) => {
    const [toggle, setToggle] = useState(false);
    const [shoppingList, setShoppingList] = useState<ShoppingListSimple>();
    const { data, refetch } = useFetch<ShoppingListSimple>(`${API_URL}${MEAL_PLAN_QUERY}${mealPlan.id}/shoppinglist/`);

    const { deleteItem } = useDeleteFetch();

    const { patchItem } = usePatchFetch<MealPlanPatch, MealPlan>(MEAL_PLAN_URL);
 
    const handleAddToMealPlan = React.useCallback((recipeId: number, mealPlanId: string) => {
        patchItem({ 'recipe_id' : recipeId}, mealPlanId);
        setToggle(false);
        refetchMealPlan();
        refetch();
    },[patchItem, refetch, refetchMealPlan]);

    const handleToggle = React.useCallback(() => {
        if (!toggle) {
            refetch();
            if (data) {
                setShoppingList(data);
            }
        }
        setToggle(!toggle);
    }, [toggle, data, refetch]);

    const handleDelete = React.useCallback( async (mealPlanId: number, mealId:number) => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${MEAL_QUERY}${mealId}/`)
        setToggle(false);
        refetchMealPlan();
        refetch();
    }, [deleteItem, refetch, refetchMealPlan]);

    const shoppingListItems = React.useMemo(() => 
        toggle && shoppingList && (
            <div>
                <h2>Shopping List:</h2>
                {shoppingList.map((item) => (<div>{item.name} {item.amount} {item.unit}</div>))}
            </div>
        ), [toggle, shoppingList]);

    return (
        <Card key={mealPlan.name}>
            <MealPlanTitle>{`${mealPlan.name} (${mealPlan.start_date} - ${mealPlan.end_date})`} </MealPlanTitle>
            <MealPlanCalendar mealPlan={mealPlan} onDelete={handleDelete} refetch={refetchMealPlan}/>
            <MealList handleDelete={handleDelete} mealPlan={mealPlan} refetch={refetchMealPlan}/>
            <AddRecipeSelection addToMealPlan={handleAddToMealPlan} mealPlanId={mealPlan.id.toString()}/>
            <button onClick={handleToggle}>{toggle ? 'Hide Shopping List' : 'Show Shopping List'}</button>
            {shoppingListItems}      
        </Card>
    );
};

export default MealPlanCard;
