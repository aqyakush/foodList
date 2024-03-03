import React from 'react';
import DropdownMenu from '../../../components/Navigation/DropdownMenu';
import StyledNavLink from '../../../components/Navigation/StyledNavLink';
import styled from 'styled-components';
import MoreButton from '../../../components/Navigation/MoreButton';
import useFetch from '../../../hooks/apiHooks/useFetch';
import { MealPlan } from '../../../types';
import { API_URL, MEAL_PLAN_QUERY } from '../../../utils/apis';
import Modals from '../../../components/Modal';
import CreateMealPlanForm from '../../mealPlanPage/components/createMealPlanForm';

type MenuProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }
  

const Menu = ({ isOpen, onClose, onDelete }: MenuProps) => {
    return (
      <DropdownMenu isOpen={isOpen}>
        <li>
          <button onClick={onDelete}>Delete</button>
        </li>
      </DropdownMenu>
    );
  };

  
const StyledLi = styled.li`
    display: block;
    position: relative;
  `;
  
const MenuButton = styled.button`
    position: absolute;
    right: 0;
    background: transparent;
    border: none;
    font-size: 1.5em;
    color: gray;
    cursor: pointer;
  `;

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

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const handleAction = React.useCallback(() => {
      refetch();
      setIsCreateModalOpen(false)
    }, [refetch]);

    const handleAddMealPlan = React.useCallback(() => {
        console.log('Add meal plan');
        setIsCreateModalOpen(true);
        refetch();
      }, [refetch, setIsCreateModalOpen]);
    
      
    return (
        <>
            <MoreButton title='Planning'>
                {data?.map((mealPlan) => (
                    <StyledLi>
                        <StyledNavLink to={`planning/mealPlans/${mealPlan.id}`}>{mealPlan.name}</StyledNavLink>
                        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>...</MenuButton>
                        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onDelete={() => console.log(mealPlan.id)} />
                    </StyledLi>
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
