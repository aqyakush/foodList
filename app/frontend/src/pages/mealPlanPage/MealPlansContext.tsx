import React, { createContext} from 'react';
import { MealPlan } from '../../types';
import useFetch from '../../hooks/apiHooks/useFetch';
import { API_URL, MEAL_PLAN_QUERY } from '../../utils/apis';
import { Params } from 'react-router-dom';

type MealPlansContextProps = {
    mealPlans?: MealPlan[];
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

type MealPlansProviderProps = {
    children: React.ReactNode;
    params?:  Readonly<Params<string>>;
}

export const MealPlansContext = createContext<MealPlansContextProps>({
    mealPlans: [],
    loading: false,
    error: null,
    refetch: () => Promise.resolve()
});

export const MealPlansProvider: React.FC<MealPlansProviderProps> = ({ children, params }) => {
    const { data: mealPlan, isLoading: mealPlanLoading, error: mealPlanError, refetch: mealPlanRefetch } = useFetch<MealPlan>(`${API_URL}${MEAL_PLAN_QUERY}${params?.id}`);
    const { data: mealPlans, isLoading: isMealPlansLoading, error: mealPlansError, refetch: mealPlansRefetch } = useFetch<MealPlan[]>(`${API_URL}${MEAL_PLAN_QUERY}`);

    if (params && params.id && mealPlan) {
        return (
            <MealPlansContext.Provider value={{ mealPlans: [mealPlan], loading: mealPlanLoading, error: mealPlanError, refetch: mealPlanRefetch }}>
                {children}
            </MealPlansContext.Provider>
        );
    } else {
        return (
            <MealPlansContext.Provider value={{ mealPlans, loading: isMealPlansLoading, error: mealPlansError, refetch: mealPlansRefetch }}>
                {children}
            </MealPlansContext.Provider>
        );
    }
};