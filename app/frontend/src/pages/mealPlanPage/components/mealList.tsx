import React from 'react';
import { MealPlan } from '../../../types';
import MealRow from './mealRow';
import List from '../../../components/List/List';


type MealListProps = {
    mealPlan: MealPlan;
    handleDelete: (mealId: number) => Promise<void>
    refetch: () => void;
}

const MealList: React.FC<MealListProps> = ({ handleDelete, mealPlan, refetch }) => {
    return (
        <List>
            {mealPlan?.meals?.map((item) => (
                !item.date && (
                    <MealRow
                        meal={item}
                        key={item.id}
                        handleDelete={handleDelete}
                        mealPlan={mealPlan}
                        refetch={refetch}
                    />
                )
            ))}
        </List>
    );
};

export default MealList;
