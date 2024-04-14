
import React, { useContext } from 'react';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, MEAL_QUERY } from '../../../../utils/apis';
import useDeleteFetch from '../../../../hooks/apiHooks/useDeleteFetch';
import usePatchFetch from '../../../../hooks/apiHooks/usePatchFetch';
import { MealPlansContext } from '../../MealPlansContext';
import Separator from '../../../../components/Separator';
import { MealPlan as MealPlanType, MealPlanPatch } from '../../../../types';
import MealPlanCalendar from './MealPlanCalendar';
import MealList from './MealList';
import AddRecipeSelection from './AddRecipeSection';


type MealPlanProps = {
    mealPlan: MealPlanType;
};

const MealPlan: React.FC<MealPlanProps> = ({ mealPlan }) => {

    const { refetch } = useContext(MealPlansContext);
    const { deleteItem } = useDeleteFetch();

    const { patchItem } = usePatchFetch<MealPlanPatch, MealPlanType>(MEAL_PLAN_URL);
 
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
                    <MealPlanCalendar mealPlan={mealPlan} />
                    <Separator />
                    <MealList handleDelete={handleDelete} mealPlan={mealPlan} />
                    <AddRecipeSelection addToMealPlan={handleAddToMealPlan} mealPlanId={mealPlan.id.toString()} />
                </>   
    );
};

export default MealPlan;
