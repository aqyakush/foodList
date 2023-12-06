import { Recipe } from "./recipe";

export type MealPlan = {
    id: number;
    name: string;
    recipes: Recipe[];
    beginning_date: Date;
    end_date: Date;
}