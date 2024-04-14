import React, { useContext } from 'react';
import { MealPlansContext } from '../../../mealPlanPage/MealPlansContext';
import CenterDiv from '../../../../components/CenterDiv';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import MealPlan from '../../../mealPlanPage/MealPlans/MealPlan';

const MealPlanView: React.FC = () => {
  const { mealPlans, loading } = useContext(MealPlansContext);

    const mealPlan = React.useMemo(() => mealPlans?.[0], [mealPlans]);

    if (loading) {
      return (
        <CenterDiv>
          <LoadingSpinner />
        </CenterDiv>
      );
    }

   

    if (mealPlan) {
      return (<MealPlan mealPlan={mealPlan}/>)
    } else {
      return <CenterDiv>No meal plan found</CenterDiv>
    } 
};

export default MealPlanView;
