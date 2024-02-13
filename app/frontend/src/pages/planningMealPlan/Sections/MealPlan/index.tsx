import React from 'react';
import Section from '../../components/section';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../hooks/apiHooks/useFetch';
import MealPlanPlanner from '../../../mealPlanPage/components/MealPlanPlanner';
import { API_URL, MEAL_PLAN_QUERY } from '../../../../utils/apis';
import { MealPlan } from '../../../../types/mealPlan';
import styled from 'styled-components';

const CenterDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: right;
  flex-direction: column;
  min-width: 35vw;
`;

const MealPlanSection: React.FC = () => {
    const params = useParams();
    const { data: mealPlan, isLoading: mealPlanLoading, refetch: refetchMealPlan } = useFetch<MealPlan>(`${API_URL}${MEAL_PLAN_QUERY}${params.id}`);
    
    return (
        <Section title="Meal Plan" openByDefault>
            <CenterDiv>
            {
                mealPlanLoading ? <CenterDiv>Loading...</CenterDiv> : 
                mealPlan ? <MealPlanPlanner mealPlan={mealPlan} refetchMealPlan={refetchMealPlan} /> : <CenterDiv>No meal plan found</CenterDiv>
            }
            </CenterDiv>
            
        </Section>
    );
};

export default MealPlanSection;
