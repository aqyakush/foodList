import { Ingredient } from "./ingredient";

export type Amount = {
    amount: number;
    unit: string;
    ingredient: Ingredient;
}