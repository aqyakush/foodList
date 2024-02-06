import React from 'react';
import ShoppingList from '../../../types/shoppingList';

type ShoppingListProps = {
    shoppingList: ShoppingList;
}

const ShoppingListCard: React.FC<ShoppingListProps> = ({ shoppingList }) => {
    return (
        <div>
            <h2>{shoppingList.name}</h2>
            <ul>
                {shoppingList.items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.amount} {item.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingListCard;
