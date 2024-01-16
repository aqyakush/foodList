import React, { useState } from 'react';
import useFetch from '../../../hooks/apiHooks/useFetch';
import { API_URL, RECIPES_QUERY } from '../../../utils/apis';
import Select, { ActionMeta, SingleValue } from 'react-select';
import LoadingSpinner from '../../../components/LoadingSpinner';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
    width: 50%;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
`;

interface Recipe {
    id: number;
    name: string;
}

interface AddRecipeSelectionProps {
    mealPlanId: string;
    // recipes: Recipe[];
    addToMealPlan: (recipeId: number, mealPlanId: string) => void;
}

type option = {
    value: number;
    label: string;
};

const AddRecipeSelection: React.FC<AddRecipeSelectionProps> = ({ addToMealPlan, mealPlanId }) => {
    const [selectedRecipe, setSelectedRecipe] = useState<SingleValue<option>>();

    const { data,isLoading } = useFetch<Recipe[]>(`${API_URL}${RECIPES_QUERY}`);

    const options: option[] = React.useMemo(() => {
        if (data) {
            return data.map((recipe) => ({ value: recipe.id, label: recipe.name }));
        }
        return [];
    }, [data]);

    const handleRecipeSelection = (newValue: SingleValue<option>) => {
        setSelectedRecipe(newValue);
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
