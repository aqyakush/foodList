import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/apiHooks/useFetch';
import { MealPlan, MealPlanPatch } from '../../../types';
import { API_URL, MEAL_PLAN_QUERY } from '../../../utils/apis';
import LoadingSpinner from '../../../components/LoadingSpinner';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';

type MealPlanDropdownProps = { 
  recipeId: number;
};

const MealPlanDropdown: React.FC<MealPlanDropdownProps> = ({ recipeId }) => {
  const { data, isLoading } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const { patchItem }  = usePatchFetch<MealPlanPatch>(`${API_URL}${MEAL_PLAN_QUERY}`);

  // FIXME: update the type for event
  const handleSelectChange = (event: any) => {
    const mealPlanId = event.target.value;
    setSelectedMealPlan(mealPlanId);
  };

  useEffect(() => {
    if (selectedMealPlan) {
      patchItem({ 'recipe_id' : recipeId}, selectedMealPlan);
    }
  }, [selectedMealPlan, recipeId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div>Add to mealPlan:</div>
      <select value={selectedMealPlan} onChange={handleSelectChange}>
        <option value="">Select meal plan</option>
        {data?.map(mealPlan => (
          <option key={mealPlan.id} value={mealPlan.id}>
            {mealPlan.name}
          </option>
        ))}
      </select>
    </>
    
  );
}

export default MealPlanDropdown;