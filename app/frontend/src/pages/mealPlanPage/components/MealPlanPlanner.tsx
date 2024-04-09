import React, { useContext } from 'react';
import { MealPlan, MealPlanPatch } from '../../../types';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, MEAL_QUERY } from '../../../utils/apis';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import AddRecipeSelection from './addRecipeSelection';
import MealPlanCalendar from './mealPlanCalendar';
import MealList from './mealList';
import styled from 'styled-components';
import { MealPlansContext } from '../MealPlansContext';

const Separator = styled.div`
  border: 1px solid lightgray;
  height: auto;
  margin: 0 1rem;
`;

type MealPlanPlannerProps = {
    mealPlan: MealPlan;
};

const MealPlanPlanner: React.FC<MealPlanPlannerProps> = ({ mealPlan }) => {
    const { refetch } = useContext(MealPlansContext);
    const { deleteItem } = useDeleteFetch();

    const { patchItem } = usePatchFetch<MealPlanPatch, MealPlan>(MEAL_PLAN_URL);
 
    const handleAddToMealPlan = React.useCallback((recipeId: number, mealPlanId: string) => {
        patchItem({ 'recipe_id' : recipeId}, mealPlanId);
        refetch();
    },[patchItem, refetch]);

    const handleDelete = React.useCallback( async (mealId:number) => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${MEAL_QUERY}${mealId}/`)
        refetch();
    }, [deleteItem, refetch]);

    return (
        <>
            <MealPlanCalendar mealPlan={mealPlan} onDelete={handleDelete}/>
            <Separator />
            <MealList handleDelete={handleDelete} mealPlan={mealPlan}/>
            <AddRecipeSelection addToMealPlan={handleAddToMealPlan} mealPlanId={mealPlan.id.toString()}/>
        </>
    );
};

export default MealPlanPlanner;
