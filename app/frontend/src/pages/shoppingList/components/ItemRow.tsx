import React, { useState } from 'react';
import Item from '../../../types/item';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import RowActions from './RowActions';
import EditableDiv from '../../../components/EditableDiv';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
    margin-bottom: 10px;
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
    const { patchItem } = usePatchFetch<ItemPatch, Item>(SHOPPING_LIST_ITEMS_URL);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        patchItem({ 'is_bought' : !isChecked}, item.id.toString());
    };
        
    const handleNameChange = React.useCallback((value: string) => {
        patchItem({ 'name' : value}, item.id.toString());
    }, [patchItem, item.id]);

    const handleAmountChange = React.useCallback((value: string) => {
        patchItem({ 'amount' : Number(value)}, item.id.toString());
    }, [patchItem, item.id]);

    return (
        <Row style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <EditableDiv initialValue={item.name} onValueChange={handleNameChange} />
            <EditableDiv initialValue={item.amount.toString()} onValueChange={handleAmountChange} />
            <div>{item.unit}</div>
            <RowActions item={item} refetch={refetch}/>
        </Row>
    );
};

export default ItemRow;
