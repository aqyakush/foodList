import { Ingredient } from "./ingredient"

export type Recipe = {
    id: number,
    name: string,
    description: string,
    ingredients: Array<Ingredient>
}
  
