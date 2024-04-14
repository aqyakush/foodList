
import Card from '../../../components/Cards';
import React from 'react';
import TitleWithArrow from '../../../components/TitleWithArrow';
import useToggle from '../../../hooks/useToggle';
import { MealPlan as MealPlanType } from '../../../types';
import MealPlan from './MealPlan';

type MealPlanCardProps = {
    mealPlan: MealPlanType;
};


const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan }) => {
    const [isExpanded, onExpand] = useToggle(true);
 
    return (
        <Card key={mealPlan.name}>
            <TitleWithArrow title={mealPlan.name} isExpanded={isExpanded} onClick={onExpand} />
            {isExpanded && 
                <MealPlan mealPlan={mealPlan} />
            }
        </Card>
    );
};


export default MealPlanCard;
