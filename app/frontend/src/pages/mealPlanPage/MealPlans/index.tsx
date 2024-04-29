import React, { useContext } from 'react';
import MealPlanCard from './MealPlanCard';
import CenterDiv from '../../../components/CenterDiv';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Card from '../../../components/Cards';
import { MealPlansContext } from '../MealPlansContext';
import CreateMealPlanForm from './CreateMealPlanForm';


const MealPlans: React.FC = () => {
    const { mealPlans, loading, refetch } = useContext(MealPlansContext);

    const mealPlansCards = React.useMemo(() => {
      return mealPlans?.map((mealPlan) => (
        <MealPlanCard mealPlan={mealPlan} />
    ))}, [mealPlans]);

    if (loading) {
      return (
        <CenterDiv>
          <LoadingSpinner />
        </CenterDiv>
      );
    }

    return (
        <CenterDiv>
            {mealPlansCards}
            <Card>
                <CreateMealPlanForm handleAction={() => refetch()} />
            </Card>
        </CenterDiv>
    );
};

export default MealPlans;
