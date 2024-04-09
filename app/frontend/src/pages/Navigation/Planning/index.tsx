import React from 'react';
import styled from 'styled-components';
import MoreButton from '../../../components/Navigation/MoreButton';
import useFetch from '../../../hooks/apiHooks/useFetch';
import { MealPlan } from '../../../types';
import { API_URL, MEAL_PLAN_QUERY } from '../../../utils/apis';
import Modals from '../../../components/Modal';
import CreateMealPlanForm from '../../mealPlanPage/components/createMealPlanForm';
import MealPlanNav from './MealPlanNav';

const AddMealPlanButton = styled.div`
  display: block;
  color: white;
  text-align: left;
  padding: 14px 30px;
  text-decoration: none;

  &:hover {
    background-color: #111;
    cursor: pointer;
  }
`;

const PlanningNavigation: React.FC = () => {
    const { data, refetch } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const handleAction = React.useCallback(() => {
      refetch();
      setIsCreateModalOpen(false)
    }, [refetch]);

    const handleAddMealPlan = React.useCallback(() => {
        setIsCreateModalOpen(true);
        refetch();
      }, [refetch, setIsCreateModalOpen]);
    
      
    return (
        <>
            <MoreButton title='Planning'>
                {data?.map((mealPlan) => (
                    <MealPlanNav key={mealPlan.id} mealPlan={mealPlan} refetch={refetch}/>
                ))}
                <li>
                    <AddMealPlanButton onClick={handleAddMealPlan}>+ Meal Plan</AddMealPlanButton>
                </li>
            </MoreButton>
            <Modals isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} >
                <CreateMealPlanForm handleAction={handleAction} />
            </Modals>
        </>
        
    );
}

export default PlanningNavigation;
