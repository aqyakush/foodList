import React from 'react';
import ShoppingList from '../../../types/shoppingList';
import ItemRow from './ItemRow';
import List from '../../../components/List/List';


type ShoppingListProps = {
    shoppingList: ShoppingList;
}

const ShoppingListCard: React.FC<ShoppingListProps> = ({ shoppingList }) => {
    return (
        <div>
            <h2>{shoppingList.name}</h2>
            <List>
                {shoppingList.items.map((item, index) => (
                    <li key={index}>
                        <ItemRow item={item} />
                    </li>
                ))}
            </List>
        </div>
    );
};

export default ShoppingListCard;
