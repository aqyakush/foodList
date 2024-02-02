import React, { useState, useEffect } from 'react';
import useFetch from '../../../hooks/apiHooks/useFetch';
import { MealPlan, MealPlanPatch } from '../../../types';
import { MEAL_PLAN_URL } from '../../../utils/apis';
import LoadingSpinner from '../../../components/LoadingSpinner';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';

type MealPlanDropdownProps = { 
  recipeId: number;
};

const MealPlanDropdown: React.FC<MealPlanDropdownProps> = ({ recipeId }) => {
  const { data, isLoading } = useFetch<MealPlan[]>(MEAL_PLAN_URL);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const { data: fetchData, patchItem }  = usePatchFetch<MealPlanPatch, MealPlan>(MEAL_PLAN_URL);

  // FIXME: update the type for event
  const handleSelectChange = React.useCallback((event: any) => {
    const mealPlanId = event.target.value;
    setSelectedMealPlan(mealPlanId);
    patchItem({ 'recipe_id' : recipeId}, mealPlanId);
  }, [patchItem, recipeId]);


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
            {fetchData?.id === mealPlan.id && " - Added!"}
          </option>
        ))}
      </select>
    </>
    
  );
}

export default MealPlanDropdown;