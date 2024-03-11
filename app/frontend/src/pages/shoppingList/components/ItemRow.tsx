import React, { useState } from 'react';
import Item from '../../../types/item';
import usePatchFetch from '../../../hooks/apiHooks/usePatchFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import RowActions from './RowActions';

type ItemPatch = {
    is_bought: boolean;
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
            <td>{item.amount}</td>
            <td>{item.unit}</td>
            <RowActions item={item} refetch={refetch}/>
        </tr>
    );
};

export default ItemRow;
