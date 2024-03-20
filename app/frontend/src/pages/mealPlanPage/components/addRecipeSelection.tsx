import React, { useState } from 'react';
import useFetch from '../../../hooks/apiHooks/useFetch';
import { API_URL, MEAL_PLAN_URL, MEAL_QUERY, RECIPES_QUERY } from '../../../utils/apis';
import { SingleValue } from 'react-select';
import { ActionMeta } from 'react-select';
import LoadingSpinner from '../../../components/LoadingSpinner';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import usePostFetch from '../../../hooks/apiHooks/usePostFetch';
import { Meal } from '../../../types';


const StyledSelect = styled(CreatableSelect)`
    width: 50%;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
`;

type Recipe = {
    id: number;
    name: string;
}

type AddRecipeSelectionProps = {
    mealPlanId: string;
    addToMealPlan: (recipeId: number, mealPlanId: string) => void;
    refetch: () => void;
}

type option = {
    value: number;
    label: string;
};

type MealToCreate = Pick<Meal, 'name' | 'meal_plan'> & { date: null, recipe: null};

const AddRecipeSelection: React.FC<AddRecipeSelectionProps> = ({ addToMealPlan, mealPlanId, refetch }) => {
    const [selectedRecipe, setSelectedRecipe] = useState<SingleValue<option>>();

    const { data,isLoading } = useFetch<Recipe[]>(`${API_URL}${RECIPES_QUERY}`);

    const { postData }  = usePostFetch<MealToCreate>(`${MEAL_PLAN_URL}${MEAL_QUERY}create/`);

    const options: option[] = React.useMemo(() => {
        if (data) {
            return data.map((recipe) => ({ value: recipe.id, label: recipe.name }));
        }
        return [];
    }, [data]);

    const handleRecipeSelection = async (newValue: SingleValue<option>, actionMeta: ActionMeta<option>) => {
        if (actionMeta.action === 'create-option') {
            const meal: MealToCreate = {
                name: newValue?.label || '',
                meal_plan: mealPlanId,
                recipe: null,
                date: null
            }
            postData(meal);
            refetch();
        } else {
            setSelectedRecipe(newValue);
        }
    };

    const handleAddToMealPlan = () => {
        if (selectedRecipe) {
            addToMealPlan(selectedRecipe.value, mealPlanId);
            setSelectedRecipe(null);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
        

    return (
        <RowContainer>
            <StyledSelect
                isClearable
                isSearchable
                name="color"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleRecipeSelection}
                value={selectedRecipe}
            />
            {selectedRecipe && (
                <button onClick={handleAddToMealPlan}>+</button>
            )}
        </RowContainer>
    );
};

export default AddRecipeSelection;
