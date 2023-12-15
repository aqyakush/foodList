import { Amount } from "./amount"

export type Recipe = {
    id: number,
    name: string,
    description: string,
    amount_set: Array<Amount>
}
  
