import { Recipe } from "./recipe";

export type MealPlan = {
    id: number;
    name: string;
    recipes?: Recipe[];
    start_date: Date | string;
    end_date: Date | string;
}

export type MealPlanPatch = {
    recipe_id: number;
}