import React from 'react';
import styled from 'styled-components';
import useFetch from '../../hooks/apiHooks/useFetch';
import { MealPlan } from '../../types';
import { API_URL, MEAL_PLAN_QUERY } from '../../utils/apis';
import Modals from '../../components/Modal';
import CreateMealPlanForm from '../mealPlanPage/components/createMealPlanForm';
import StyledNavLink from '../../components/Navigation/StyledNavLink';
import DropdownMenu from '../../components/Navigation/DropdownMenu';
import ViewingNavigation from './Viewing';
import PlanningNavigation from './Planning';


const Test = styled.div`
  flex-shrink: 0;
`;

const StyledNav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #333;
  top: 0;
  height: 100%;
  width: auto;
`;

const Text = styled.p`
  display: block;
  color: white;
  text-align: center;
  padding: 0px 16px;
  text-decoration: none;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #111;
    cursor: pointer;
  }
`;

const NavBar = () => {
    const { data, isLoading, refetch } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

    const handleAction = React.useCallback(() => {
      refetch();
      setIsCreateModalOpen(false)
    }, [refetch]);

    return (
      <Test>
          <StyledNav>
            <ViewingNavigation />
            <PlanningNavigation data={data} refetch={refetch} setIsCreateModalOpen={setIsCreateModalOpen}/>
          </StyledNav>
          <Modals isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} >
              <CreateMealPlanForm handleAction={handleAction} />
          </Modals>
      </Test>
    );
}

export default NavBar;