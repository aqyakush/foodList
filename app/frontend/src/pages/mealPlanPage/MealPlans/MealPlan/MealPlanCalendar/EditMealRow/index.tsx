import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Meal, MealPlan } from '../../../../../../types/mealPlan';
import usePatchFetch from '../../../../../../hooks/apiHooks/usePatchFetch';
import { MEAL_PLAN_URL, MEAL_QUERY } from '../../../../../../utils/apis';
import { MealPlansContext } from '../../../../MealPlansContext';
import MealPlanRowActions from './mealRowActions';
import { MEAL_TYPES } from '../../utils';
import EditableDiv from '../../../../../../components/EditableDiv';

const Row = styled.div`
    display: flex;
    align-items: center;
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

const mealTypeColors: { [key: string]: string } = {
    breakfast: '#ffff99', // very soft light blue
    lunch: '#c6f2d2', // very soft light green
    dinner: '#f8d2d8', // very soft light pink
    snack: '#ffe8d8', // very soft light salmon
    brunch: '#e8d8f8', // very soft light purple
    linner: '#f8d2e8', // very soft light pink
  };

type TagProps = {   
    mealtype: string;
}   

const Tag = styled.div<TagProps>`
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0.5em;
    border-radius: 0.25em; // smaller border-radius for more square edges
    background-color: ${props => mealTypeColors[props.mealtype] || '#d3d3d3'}; // light gray as default color
    color: #111;
    font-size: 0.75em;
`;

type MealProps = {
    mealPlan: MealPlan;
    meal: Meal;
};

export type MealUpdate = {
    name?: string;
    date?: Date | string;
    meal_type?: string;
}


const EditMealRow: React.FC<MealProps> = ({ meal, mealPlan }) => {
    const { refetch } = useContext(MealPlansContext);
    
    const [isMealTypeEditing, setIsMealTypeEditing] = React.useState(false);
    const [mealType, setMealType] = React.useState(meal.meal_type || '');
    const initialMealType = React.useRef(meal.meal_type); 

    const { patchItem } = usePatchFetch<MealUpdate, Meal>(`${MEAL_PLAN_URL}${MEAL_QUERY}`);


    const handleMealTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMealType(event.target.value);
    };

    const handleMealTypeEdit = () => {
        setIsMealTypeEditing(true);
    };

    const handleBlur = async () => {
        setIsMealTypeEditing(false);
        if (mealType !== initialMealType.current) { 
            await patchItem({meal_type: mealType}, meal.id.toString());
            initialMealType.current = mealType;
            refetch();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleBlur();
        }
      };

    const  handleNameChange = React.useCallback((value: string) => {    
        patchItem({ 'name' : value}, meal.id.toString());
        refetch();
    }, [patchItem, meal.id, refetch]);

    return (
        <Row>
            <MealPlanRowActions meal={meal} mealPlan={mealPlan} refetch={refetch}/>
            {meal.recipe ? 
            (<MealItem key={meal.recipe.name}>
                <StyledLink to={`/recipes/?name=${meal.recipe.name}`}>{meal.recipe.name}</StyledLink>
            </MealItem>) : (<MealItem key={meal.name}>
                <EditableDiv initialValue={meal.name} onValueChange={handleNameChange} />
            </MealItem>)}
            <div onClick={handleMealTypeEdit}>
            {isMealTypeEditing || !mealType ? (
                <select value={mealType} onChange={handleMealTypeChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus>
                    {MEAL_TYPES.map((type, index) => {
                        if (!type) {
                            return <option key={index} value={''}>Select a meal type</option>
                        } else {
                            return <option key={index} value={type}>{type}</option>
                        }
                    })}
                </select>
            ) : (
                <Tag mealtype={mealType}>
                    {mealType}
                </Tag>
            )}
            </div>
        </Row>
    );
};

export default EditMealRow;
