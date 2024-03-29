import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RemoveButton } from '../../mainPage/components/createRecipeCard';
import { eachDayOfInterval, format } from 'date-fns';
import { Meal, MealPlan } from '../../../types/mealPlan';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import { MEAL_PLAN_URL, MEAL_QUERY } from '../../../utils/apis';

const Row = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
    margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;

    &:visited {
        color: blue;
    }
`;

const MealItem = styled.li`
    padding-left: 5px;
    padding-top: 2px;
    position: relative;
    list-style-type: none;
`;

type MealProps = {
    mealPlan: MealPlan;
    handleDelete: (mealId: number) => Promise<void>
    meal: Meal;
    refetch: () => void;
}

type MealDate = {
    date: Date | string;
}

const MealRow: React.FC<MealProps> = ({ meal, handleDelete, mealPlan, refetch }) => {
    const { start_date, end_date } = mealPlan;
    const [selectedDate, setSelectedDate] = React.useState('');

    const { patchItem } = usePatchFetch<MealDate, Meal>(`${MEAL_PLAN_URL}${MEAL_QUERY}`);

    const dates = [undefined, ...eachDayOfInterval({
        start: new Date(start_date),
        end: new Date(end_date)
    })];

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleButtonClick = React.useCallback(async () => {
        await patchItem({ date: selectedDate }, meal.id.toString());
        refetch();
        console.log(selectedDate);
    }, [meal.id, patchItem, refetch, selectedDate]);

    console.log(meal)

    return (
        <Row>
            <RemoveButton type="button" onClick={() => {
                handleDelete(meal.id)
            }}>✖</RemoveButton>
            {meal.recipe ? 
            (<MealItem key={meal.recipe.name}>
                <StyledLink to={`/recipes/?name=${meal.recipe.name}`}>{meal.recipe.name}</StyledLink>
            </MealItem>) : (<MealItem key={meal.name}>{meal.name}</MealItem>)}
            <select value={selectedDate} onChange={handleDateChange}>
                {dates.map((date, index) => {
                    if (!date) {
                        return <option key={index} value={''}>Select a date</option>
                    } else {
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        return <option key={index} value={formattedDate}>{formattedDate}</option>
                    }
                })}
            </select>
            {selectedDate && <button onClick={handleButtonClick}>Change date</button>}
        </Row>
    );
};

export default MealRow;
