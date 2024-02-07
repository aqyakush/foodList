import React from 'react';
import styled from 'styled-components';
import { MealPlan, MealPlanPatch } from '../../../types';
import Card from '../../../components/Cards';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, MEAL_QUERY } from '../../../utils/apis';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import AddRecipeSelection from './addRecipeSelection';
import MealPlanCalendar from './mealPlanCalendar';
import MealList from './mealList';


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

const Arrow = styled.div`
    text-align: right;
    cursor: pointer;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan, refetchMealPlan }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    const handleTitleClick = () => {
        setIsExpanded(!isExpanded);
    };
    const { deleteItem } = useDeleteFetch();

    const { patchItem } = usePatchFetch<MealPlanPatch, MealPlan>(MEAL_PLAN_URL);
 
    const handleAddToMealPlan = React.useCallback((recipeId: number, mealPlanId: string) => {
        patchItem({ 'recipe_id' : recipeId}, mealPlanId);
        refetchMealPlan();
    },[patchItem, refetchMealPlan]);

    const handleDelete = React.useCallback( async (mealId:number) => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${MEAL_QUERY}${mealId}/`)
        refetchMealPlan();
    }, [deleteItem, refetchMealPlan]);

    return (
        <Card key={mealPlan.name}>
            <TitleContainer onClick={handleTitleClick}>
                <MealPlanTitle>{`${mealPlan.name} (${mealPlan.start_date} - ${mealPlan.end_date})`} </MealPlanTitle>
                <Arrow> {isExpanded ? '▼' : '►'}</Arrow>
            </TitleContainer>
            {isExpanded && (
                <>
                    <MealPlanCalendar mealPlan={mealPlan} onDelete={handleDelete} refetch={refetchMealPlan}/>
                    <MealList handleDelete={handleDelete} mealPlan={mealPlan} refetch={refetchMealPlan}/>
                    <AddRecipeSelection addToMealPlan={handleAddToMealPlan} mealPlanId={mealPlan.id.toString()}/>
                </>
            )}
             
        </Card>
    );
};

export default MealPlanCard;
