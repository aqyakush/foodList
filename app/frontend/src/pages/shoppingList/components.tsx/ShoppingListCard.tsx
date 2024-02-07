import React from 'react';
import ShoppingList from '../../../types/shoppingList';
import ItemRow from './ItemRow';
import styled from 'styled-components';

const ShoppingListList = styled.ul`
    list-style-type: none;
    padding: 0;
`;


type ShoppingListProps = {
    shoppingList: ShoppingList;
}

const ShoppingListCard: React.FC<ShoppingListProps> = ({ shoppingList }) => {
    return (
        <div>
            <h2>{shoppingList.name}</h2>
            <ShoppingListList>
                {shoppingList.items.map((item, index) => (
                    <li key={index}>
                        <ItemRow item={item} />
                    </li>
                ))}
            </ShoppingListList>
        </div>
    );
};

export default ShoppingListCard;
