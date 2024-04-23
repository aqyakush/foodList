import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RemoveButton } from '../../../../../mainPage/components/createRecipeCard';
import { eachDayOfInterval, format } from 'date-fns';
import { Meal, MealPlan } from '../../../../../../types/mealPlan';
import usePatchFetch from '../../../../../../hooks/apiHooks/usePatchFetch';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, MEAL_QUERY } from '../../../../../../utils/apis';
import { MealPlansContext } from '../../../../MealPlansContext';
import { MEAL_TYPES } from '../../utils';
import useDeleteFetch from '../../../../../../hooks/apiHooks/useDeleteFetch';
import EditableDiv from '../../../../../../components/EditableDiv';

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
    meal: Meal;
}

type MealUpdate = {
    name?: string;
    date?: Date | string;
    meal_type?: string;
}

const NewMealRow: React.FC<MealProps> = ({ meal, mealPlan }) => {
    const { refetch } = useContext(MealPlansContext);
    const { start_date, end_date } = mealPlan;
    const [selectedDate, setSelectedDate] = React.useState('');
    const [mealType, setMealType] = React.useState(meal.meal_type || '');

    const { patchItem } = usePatchFetch<MealUpdate, Meal>(`${MEAL_PLAN_URL}${MEAL_QUERY}`);
    const { deleteItem } = useDeleteFetch();

    const handleDelete = React.useCallback( async (mealId:number) => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${MEAL_QUERY}${mealId}/`)
        refetch();
    }, [deleteItem, refetch]);

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

    const  handleNameChange = React.useCallback((value: string) => {    
        patchItem({ 'name' : value}, meal.id.toString());
        refetch();
    }, [patchItem, meal.id, refetch]);
    
    return (
        <Row>
            <RemoveButton type="button" onClick={() => {
                handleDelete(meal.id)
            }}>✖</RemoveButton>
            {meal.recipe ? 
            (<MealItem key={meal.recipe.name}>
                <StyledLink to={`/recipes/?name=${meal.recipe.name}`}>{meal.recipe.name}</StyledLink>
            </MealItem>) : (<MealItem key={meal.name}>
                <EditableDiv initialValue={meal.name} onValueChange={handleNameChange} />
            </MealItem>)}
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
