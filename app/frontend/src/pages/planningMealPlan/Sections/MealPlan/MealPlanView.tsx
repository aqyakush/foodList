import React, { useContext } from 'react';
import { MealPlansContext } from '../../../mealPlanPage/MealPlansContext';
import CenterDiv from '../../../../components/CenterDiv';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import MealPlanPlanner from '../../../mealPlanPage/components/MealPlanPlanner';



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
      return (<MealPlanPlanner mealPlan={mealPlan}/>)
    } else {
      return <CenterDiv>No meal plan found</CenterDiv>
    } 
};

export default MealPlanView;
