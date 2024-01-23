import React, { useState } from 'react';
import styled from 'styled-components';
import { MealPlan, MealPlanPatch } from '../../../types';
import Card from '../../../components/Cards';
import useFetch from '../../../hooks/apiHooks/useFetch';
import ShoppingList from '../../../types/shoppingList';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, RECIPES_QUERY, SHOPPING_LIST_MEAL_PLAN_QUERY } from '../../../utils/apis';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import { RemoveButton } from '../../mainPage/components/createRecipeCard';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import AddRecipeSelection from './addRecipeSelection';
import { Link } from 'react-router-dom';
import ShoppingListSimple from '../../../types/shoppingListSimple';


type MealPlanCardProps = {
    mealPlan: MealPlan;
    refetchMealPlan: () => void;
};

const MealPlanTitle = styled.h1`
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const RecipeList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const RecipeItem = styled.li`
    padding-left: 5px;
    padding-top: 2px;
    position: relative;
`;

const RecipeRow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

const StyledLink = styled(Link)`
    color: blue;
    text-decoration: none;

    &:visited {
        color: blue;
    }
`;

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan, refetchMealPlan }) => {
    const [toggle, setToggle] = useState(false);
    const [shoppingList, setShoppingList] = useState<ShoppingListSimple>();
    const { data, refetch } = useFetch<ShoppingListSimple>(`${API_URL}${MEAL_PLAN_QUERY}${mealPlan.id}/shoppinglist/`);

    const { deleteItem } = useDeleteFetch();

    const { patchItem } = usePatchFetch<MealPlanPatch, MealPlan>(MEAL_PLAN_URL);
 
    const handleAddToMealPlan = React.useCallback((recipeId: number, mealPlanId: string) => {
        patchItem({ 'recipe_id' : recipeId}, mealPlanId);
        refetchMealPlan();
        refetch();
    },[patchItem, refetch, refetchMealPlan]);

    const handleToggle = React.useCallback(() => {
        if (!toggle) {
            refetch();
            if (data) {
                setShoppingList(data);
            }
        }
        setToggle(!toggle);
    }, [toggle, data, refetch]);

    const handleDelete = React.useCallback( async (mealPlanId: number, recipeId:number) => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${mealPlanId}/${RECIPES_QUERY}${recipeId}`)
        refetchMealPlan();
        refetch();
    }, [deleteItem, refetch, refetchMealPlan]);

    const shoppingListItems = React.useMemo(() => 
        toggle && shoppingList && (
            <div>
                <h2>Shopping List:</h2>
                {shoppingList.map((item) => (<div>{item.name} {item.amount} {item.unit}</div>))}
            </div>
        ), [toggle, shoppingList]);

    return (
        <Card key={mealPlan.name}>
            <MealPlanTitle>{`${mealPlan.name} (${mealPlan.start_date} - ${mealPlan.end_date})`} </MealPlanTitle>
            Recipes:
            <RecipeList>
                {mealPlan.recipes?.map((recipe) => (
                    <RecipeRow>
                        <RemoveButton type="button" onClick={() => {
                            handleDelete(mealPlan.id, recipe.id)
                        }}>✖</RemoveButton>
                        <RecipeItem key={recipe.name}>
                            <StyledLink to={`/recipes/?name=${recipe.name}`}>{recipe.name}</StyledLink>
                        </RecipeItem>
                    </RecipeRow>
                ))}
            </RecipeList>
            <AddRecipeSelection addToMealPlan={handleAddToMealPlan} mealPlanId={mealPlan.id.toString()}/>
            <button onClick={handleToggle}>{toggle ? 'Hide Shopping List' : 'Show Shopping List'}</button>
            {shoppingListItems}      
        </Card>
    );
};

export default MealPlanCard;
