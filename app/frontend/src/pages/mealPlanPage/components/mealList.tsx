import React from 'react';
import styled from 'styled-components';
import { MealPlan } from '../../../types';
import MealRow from './mealRow';

const RecipeList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

type MealListProps = {
    mealPlan: MealPlan;
    handleDelete: (mealPlanId: number, mealId: number) => Promise<void>
    refetch: () => void;
}

const MealList: React.FC<MealListProps> = ({ handleDelete, mealPlan, refetch }) => {
    return (
        <RecipeList>
                {mealPlan?.meals?.map((item) => (
                    !item.date && (
                    <MealRow meal={item} key={item.id} handleDelete={handleDelete} mealPlan={mealPlan} refetch={refetch}/>)
                ))}
            </RecipeList>
    );
};

export default MealList;
