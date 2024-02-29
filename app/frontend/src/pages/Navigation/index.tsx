import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../hooks/apiHooks/useFetch';
import { MealPlan } from '../../types';
import { API_URL, MEAL_PLAN_QUERY } from '../../utils/apis';
import Modals from '../../components/Modal';
import CreateMealPlanForm from '../mealPlanPage/components/createMealPlanForm';

const StyledNavLink = styled(NavLink)`
  display: block;
  color: white;
  text-align: left;
  padding: 14px 30px;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }

  &.active {
    background-color: #4CAF50;
  }
`;

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

type DropdownMenuProps = {
  isOpen: boolean;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  display: ${props => props.isOpen ? 'block' : 'none'};
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

const NavBar = () => {
    const { data, isLoading, refetch } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);
    const [isViewingOpen, setIsViewingOpen] = React.useState(false);
    const [isPlanningOpen, setIsPlanningOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleAddMealPlan = React.useCallback(() => {
      console.log('Add meal plan');
      setIsModalOpen(true);
      refetch();
    }, [refetch]);

    const handleAction = React.useCallback(() => {
      refetch();
      setIsModalOpen(false)
    }, [refetch]);

    return (
      <Test>
          <StyledNav>
            <li>
              <MoreButton onClick={() => setIsViewingOpen(!isViewingOpen)}>
                  <Text>Viewing</Text>
                  <Text>{isViewingOpen ? '▲' : '▼'}</Text>
                </MoreButton>
                <DropdownMenu isOpen={isViewingOpen}>
                  <li>
                      <StyledNavLink to="/viewing/recipes">Recipes</StyledNavLink>
                  </li>
                  <li>
                      <StyledNavLink to="/viewing/mealPlans">Meal Plans</StyledNavLink>
                  </li>
                  <li>
                      <StyledNavLink to="/viewing/shoppingLists">Shopping Lists</StyledNavLink>
                  </li>
                </DropdownMenu>
              </li>
              <li>
              <MoreButton onClick={() => setIsPlanningOpen(!isPlanningOpen)}>
                  <Text>Planning</Text>
                  <Text>{isPlanningOpen ? '▲' : '▼'}</Text>
                </MoreButton>
                <DropdownMenu isOpen={isPlanningOpen}>
                {data?.map((mealPlan) => (
                      <li>
                        <StyledNavLink to={`planning/mealPlans/${mealPlan.id}`}>{mealPlan.name}</StyledNavLink>
                      </li>
                ))}
                    <li>
                      <AddMealPlanButton onClick={handleAddMealPlan}>+ Meal Plan</AddMealPlanButton>
                    </li>
                  </DropdownMenu>
              </li>
          </StyledNav>
          <Modals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
              <CreateMealPlanForm handleAction={handleAction} />
          </Modals>
      </Test>
    );
}

export default NavBar;