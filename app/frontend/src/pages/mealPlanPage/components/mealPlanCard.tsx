import React from 'react';
import styled from 'styled-components';
import { MealPlan } from '../../../types';
import Card from '../../../components/Cards';
import MealPlanPlanner from './MealPlanPlanner';


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
 
    return (
        <Card key={mealPlan.name}>
            <TitleContainer onClick={handleTitleClick}>
                <MealPlanTitle>{`${mealPlan.name} (${mealPlan.start_date} - ${mealPlan.end_date})`} </MealPlanTitle>
                <Arrow> {isExpanded ? '▼' : '►'}</Arrow>
            </TitleContainer>
            {isExpanded && 
                <MealPlanPlanner mealPlan={mealPlan} refetchMealPlan={refetchMealPlan}/>    
            }
             
        </Card>
    );
};

export default MealPlanCard;
