import React from 'react';
import useFetch from '../../hooks/apiHooks/useFetch';
import { API_URL, MEAL_PLAN_QUERY } from '../../utils/apis';
import { MealPlan } from '../../types';
import CenterDiv from '../../components/CenterDiv';
import LoadingSpinner from '../../components/LoadingSpinner';
import MealPlanCard from './components/mealPlanCard';
import CreateMealPlanForm from './components/createMealPlanForm';
import Card from '../../components/Cards';

const MealPlanPage = () => {
  const { data, isLoading, refetch } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);

  if (isLoading) {
    return (
      <CenterDiv>
        <LoadingSpinner />
      </CenterDiv>
    );
  }

  return (
    <CenterDiv>
      {data?.map((mealPlan) => (
        <MealPlanCard mealPlan={mealPlan} refetchMealPlan={refetch} />
      ))}
      <Card>
        <CreateMealPlanForm handleAction={refetch} />
      </Card>
    </CenterDiv>
  );
};

export default MealPlanPage;
