import React from 'react';
import styled from 'styled-components';
import RecipesSection from './Sections/Recipes';
import ShoppingListSection from './Sections/ShoppingList';
import MealPlanSection from './Sections/MealPlan';

const Space = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;


const PlanningMealPlan: React.FC = () => {
  return (
    <Space>
      <MealPlanSection />
      {/* INFO: depricete Recipes section due to limited use */}
      {/* <RecipesSection /> */}
      <ShoppingListSection />
    </Space>
  );
}

export default PlanningMealPlan;
