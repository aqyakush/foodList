import React from 'react';
import { MealPlansProvider } from './MealPlansContext';
import MealPlans from './components/MealPlans';

const MealPlanPage = () => {
  return (
    <MealPlansProvider>
      <MealPlans/>
    </MealPlansProvider>
  );
};

export default MealPlanPage;
