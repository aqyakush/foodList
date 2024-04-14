import React from 'react';
import styled from 'styled-components';
import { Recipe } from '../../../types';
import Card from '../../../components/Cards';
import MealPlanDropdown from './dropDownMealPlans';
import TitleWithArrow from '../../../components/TitleWithArrow';
import useToggle from '../../../hooks/useToggle';
import { is } from 'date-fns/locale';

type RecipeProps = {
    recipe: Recipe;
};

const IngredientList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const IngredientItem = styled.li`
    padding: 10px;
    position: relative;
`;

const RecipeCard: React.FC<RecipeProps> = ({ recipe }) => {
    const [ isExpanded, onExpand ]  = useToggle(true);

    return (
        <Card key={recipe.name}>
            <TitleWithArrow title={recipe.name} isExpanded={isExpanded} onClick={onExpand} />
            {isExpanded && (
                <>
                    Ingredients:
                    <IngredientList>
                        {recipe.amount_set.map((amount) => (
                            <IngredientItem key={amount.ingredient.name}>{amount.ingredient.name} {amount.amount} {amount.unit}</IngredientItem>
                        ))}
                    </IngredientList>
                    <p>{recipe.description}</p>
                    <MealPlanDropdown recipeId={recipe.id}/>
                </>
            )}
            
        </Card>
    );
};

export default RecipeCard;
