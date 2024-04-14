
import React from 'react';
import Separator from '../../../../components/Separator';
import { MealPlan as MealPlanType} from '../../../../types';
import MealPlanCalendar from './MealPlanCalendar';
import MealList from './MealList';
import AddRecipeSelection from './AddRecipeSection';


type MealPlanProps = {
    mealPlan: MealPlanType;
};

const MealPlan: React.FC<MealPlanProps> = ({ mealPlan }) => { 
    return (
                <>
                    <MealPlanCalendar mealPlan={mealPlan} />
                    <Separator />
                    <MealList mealPlan={mealPlan} />
                    <AddRecipeSelection mealPlanId={mealPlan.id.toString()} />
                </>   
    );
};

export default MealPlan;
