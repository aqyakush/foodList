import React from 'react';
import { MealPlan } from '../../../../../types';
import NewMealRow from './NewMealRow';
import List from '../../../../../components/List/List';


type MealListProps = {
    mealPlan: MealPlan;
}

const MealList: React.FC<MealListProps> = ({ mealPlan}) => {
    return (
        <List>
            {mealPlan?.meals?.map((item) => (
                !item.date && (
                    <NewMealRow
                        meal={item}
                        key={item.id}
                        mealPlan={mealPlan}
                    />
                )
            ))}
        </List>
    );
};

export default MealList;
