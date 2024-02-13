import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CenterDiv from '../../components/CenterDiv';
import styled from 'styled-components';
import SearchRecipe from '../mainPage';
import MealPlanPage from '../mealPlanPage';
import ShoppingListPage from '../shoppingList';
import MealPlanCard from '../mealPlanPage/components/mealPlanCard';
import useFetch from '../../hooks/apiHooks/useFetch';
import { MealPlan } from '../../types/mealPlan';
import { API_URL, MEAL_PLAN_QUERY } from '../../utils/apis';
import MealPlanPlanner from '../mealPlanPage/components/MealPlanPlanner';
import RecipesSection from './Sections/Recipes';
import ShoppingListSection from './Sections/ShoppingList';
import MealPlanSection from './Sections/MealPlan';

// const Sections = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;


const Space = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;


const PlanningMealPlan: React.FC = () => {
  return (
    <Space>
      {/* <h1>Planning Meal Plan</h1> */}
      {/* <Sections> */}
      <MealPlanSection />
      <RecipesSection />
      <ShoppingListSection />
        
      {/* </Sections> */}
    </Space>
  );
}

export default PlanningMealPlan;
