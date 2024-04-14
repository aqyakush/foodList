import React from 'react';
import { MealPlan } from '../../../../../types';
import MealRow from './NewMealRow';
import List from '../../../../../components/List/List';


type MealListProps = {
    mealPlan: MealPlan;
    handleDelete: (mealId: number) => Promise<void>
}

const MealList: React.FC<MealListProps> = ({ handleDelete, mealPlan}) => {
    return (
        <List>
            {mealPlan?.meals?.map((item) => (
                !item.date && (
                    <MealRow
                        meal={item}
                        key={item.id}
                        handleDelete={handleDelete}
                        mealPlan={mealPlan}
                    />
                )
            ))}
        </List>
    );
};

export default MealList;
