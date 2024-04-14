import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RemoveButton } from '../../../../../mainPage/components/createRecipeCard';
import { eachDayOfInterval, format } from 'date-fns';
import { Meal, MealPlan } from '../../../../../../types/mealPlan';
import usePatchFetch from '../../../../../../hooks/apiHooks/usePatchFetch';
import { MEAL_PLAN_URL, MEAL_QUERY } from '../../../../../../utils/apis';
import { MealPlansContext } from '../../../../MealPlansContext';
import { MEAL_TYPES } from '../../utils';

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
}

type MealUpdate = {
    date?: Date | string;
    meal_type?: string;
}

const NewMealRow: React.FC<MealProps> = ({ meal, handleDelete, mealPlan }) => {
    const { refetch } = useContext(MealPlansContext);
    const { start_date, end_date } = mealPlan;
    const [selectedDate, setSelectedDate] = React.useState('');
    const [mealType, setMealType] = React.useState(meal.meal_type || '');

    const { patchItem } = usePatchFetch<MealUpdate, Meal>(`${MEAL_PLAN_URL}${MEAL_QUERY}`);

    const dates = [undefined, ...eachDayOfInterval({
        start: new Date(start_date),
        end: new Date(end_date)
    })];

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleMealTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMealType(event.target.value);
    };

    const handleButtonClick = React.useCallback(async () => {
        let data = {};
        if (selectedDate) {
            data = { ...data, date: selectedDate }
        }
        if (mealType) {
            data = { ...data, meal_type: mealType }
        }
        await patchItem(data, meal.id.toString());
        refetch();
    }, [meal.id, mealType, patchItem, refetch, selectedDate]);

    const createButton = React.useMemo(() => {
        if (selectedDate && meal.meal_type !== mealType && mealType) {
            return <button onClick={handleButtonClick}>Change date and meal type</button>
        } else if (selectedDate) {
            return <button onClick={handleButtonClick}>Change date</button>
        } else if (meal.meal_type !== mealType && mealType) {
            return <button onClick={handleButtonClick}>Change meal type</button>
        }
    }, [handleButtonClick, meal.meal_type, mealType, selectedDate])
    
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
                        const formattedDate = format(date, 'EEE, yyyy-MM-dd');
                        const dateForRequest = format(date, 'yyyy-MM-dd');
                        return <option key={index} value={dateForRequest}>{formattedDate}</option>
                    }
                })}
            </select>
            <select value={mealType} onChange={handleMealTypeChange}>
                {MEAL_TYPES.map((type, index) => {
                    if (!type) {
                        return <option key={index} value={''}>Select a meal type</option>
                    } else {
                        return <option key={index} value={type}>{type}</option>
                    }
                })}
            </select>
            {createButton}
        </Row>
    );
};

export default NewMealRow;
