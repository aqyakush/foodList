type Item = {
    id: number;
    name: string;
    ingredient?: string | null;
    unit: string;
    amount: number;
    shopping_list: number;
    is_bought: boolean;
}

export default Item;