import { Recipe } from "./recipe";

export type MealPlan = {
    id: number;
    name: string;
    meals?: Meal[];
    start_date: Date | string;
    end_date: Date | string;
}

export type MealPlanPatch = {
    recipe_id: number;
}

export type Meal = {
    id: number;
    name: string;
    date: Date | string;
    recipe?: Recipe;
    meal_plan: string;
}