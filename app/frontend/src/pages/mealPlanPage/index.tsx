import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/apiHooks/useFetch';
import { API_URL, MEAL_PLAN_QUERY } from '../../utils/apis';
import { MealPlan } from '../../types';
import CenterDiv from '../../components/CenterDiv';
import LoadingSpinner from '../../components/LoadingSpinner';

const MealPlanPage = () => {
    const { data, isLoading } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);

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
                <div key={mealPlan.id} className="card">
                    <h3>{mealPlan.name}</h3>
                </div>
            ))}
        </CenterDiv>
    );
};

export default MealPlanPage;
