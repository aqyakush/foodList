import React, { useRef, useState } from 'react';
import Item from '../../../types/item';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import RowActions from './RowActions';
import styled from 'styled-components';

const AmountDiv = styled.div`
  max-width: 100px; /* Adjust this value as needed */

  &:hover {
    cursor: pointer;
  }
`;

const InputAmount = styled.input`
  max-width: 100px; /* Adjust this value as needed */
`;


type ItemPatch = {
    is_bought?: boolean;
    amount?: number;
};

type ItemRowProps = {
    item: Item;
    refetch: () => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, refetch }) => {
    const [isChecked, setIsChecked] = useState(item.is_bought);
    const [isEditing, setIsEditing] = useState(false);
    const [amount, setAmount] = useState(item.amount);
    const initialAmount = useRef(item.amount); 
    const { patchItem } = usePatchFetch<ItemPatch, Item>(SHOPPING_LIST_ITEMS_URL);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        patchItem({ 'is_bought' : !isChecked}, item.id.toString());
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    
    const handleBlur = () => {
        setIsEditing(false);
        if (amount !== initialAmount.current) { 
            patchItem({ 'amount' : amount}, item.id.toString());
            initialAmount.current = amount;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleBlur();
        }
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    return (
        <tr style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            <td>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </td>
            <td>{item.name}</td>
            <td onClick={handleEdit}>
            {isEditing ? (
                <InputAmount type="text" value={amount} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />
            ) : (
                <AmountDiv>
                    {amount}
                </AmountDiv>
                
            )}
            </td>
            <td>{item.unit}</td>
            <RowActions item={item} refetch={refetch}/>
        </tr>
    );
};

export default ItemRow;
