import React, { useState } from 'react';
import Item from '../../../types/item';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import RowActions from './RowActions';
import EditableDiv from '../../../components/EditableDiv';


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
        <tr style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            <td>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </td>
            <EditableDiv initialValue={item.name} onValueChange={handleNameChange} />
            <EditableDiv initialValue={item.amount.toString()} onValueChange={handleAmountChange} />
            <td>{item.unit}</td>
            <RowActions item={item} refetch={refetch}/>
        </tr>
    );
};

export default ItemRow;
