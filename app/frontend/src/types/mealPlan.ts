import { Recipe } from "./recipe";

export type MealPlan = {
    id: number;
    name: string;
    recipes?: Recipe[];
    beginning_date: Date | string;
    end_date: Date | string;
}

export type MealPlanPatch = {
    recipe_id: number;
}