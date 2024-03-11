import React from 'react';
import ShoppingList from '../../../types/shoppingList';
import ItemRow from './ItemRow';
import List from '../../../components/List/List';
import AddItemForm from './AddItemForm';


type ShoppingListProps = {
    shoppingList: ShoppingList;
    refetch: () => void;
}

const ShoppingListCard: React.FC<ShoppingListProps> = ({ shoppingList, refetch }) => {
    return (
        <div>
            <h2>{shoppingList.name}</h2>
            <List>
                {shoppingList.items.map((item, index) => (
                    <li key={index}>
                        <ItemRow item={item} refetch={refetch}/>
                    </li>
                ))}
            </List>
            <AddItemForm shoppingList={shoppingList.id} handleAction={refetch}/>
        </div>
    );
};

export default ShoppingListCard;
