import Item from "./item";

type ShoppingList = {
    id: number;
    name: string;
    meal_plan: string[];
    items: Item[];
}

export default ShoppingList;
