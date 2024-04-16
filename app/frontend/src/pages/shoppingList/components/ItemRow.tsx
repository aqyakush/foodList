import React, { useRef, useState } from 'react';
import Item from '../../../types/item';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import RowActions from './RowActions';
import styled from 'styled-components';

const AmountDiv = styled.div`
  max-width: 100px; /* Adjust this value as needed */

  &:hover {
    cursor: text;
  }
`;

const NameDiv = styled.div<{ iseditable?: boolean }>`
    &:hover {
        cursor: ${props => (props.iseditable ? 'text' : 'default')};
    }
`;

const InputAmount = styled.input`
  max-width: 100px; /* Adjust this value as needed */
`;


type ItemPatch = {
    is_bought?: boolean;
    name?: string;
    amount?: number;
};

type ItemRowProps = {
    item: Item;
    refetch: () => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, refetch }) => {
    const [isChecked, setIsChecked] = useState(item.is_bought);
    const [isAmountEditing, setIsAmountEditing] = useState(false);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [amount, setAmount] = useState(item.amount);
    const [name, setName] = useState(item.name);
    const initialAmount = useRef(item.amount); 
    const initialName = useRef(item.name); 
    const { patchItem } = usePatchFetch<ItemPatch, Item>(SHOPPING_LIST_ITEMS_URL);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        patchItem({ 'is_bought' : !isChecked}, item.id.toString());
    };

    const handleAmountEdit = () => {
        setIsAmountEditing(true);
    };
    
    const handleNameEdit = () => {
        setIsNameEditing(true);
    };

    const handleBlur = () => {
        setIsAmountEditing(false);
        setIsNameEditing(false);
        if (amount !== initialAmount.current) { 
            patchItem({ 'amount' : amount}, item.id.toString());
            initialAmount.current = amount;
        }
        if (name !== initialName.current) { 
            patchItem({ 'name' : name}, item.id.toString());
            initialName.current = name;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleBlur();
        }
      };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
            <td onClick={handleNameEdit}>
                {isNameEditing && !item.ingredient ? (
                    <input type="text" value={name} onChange={handleNameChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />
                ) : (
                    <NameDiv iseditable={!item.ingredient}>
                        {name}
                    </NameDiv>
                )}
            </td>
            <td onClick={handleAmountEdit}>
            {isAmountEditing ? (
                <InputAmount type="text" value={amount} onChange={handleAmountChange} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />
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
