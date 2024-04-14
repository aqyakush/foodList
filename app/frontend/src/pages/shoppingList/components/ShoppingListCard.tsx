import React from 'react';
import ShoppingList from '../../../types/shoppingList';
import ItemRow from './ItemRow';
import List from '../../../components/List/List';
import AddItemForm from './AddItemForm';
import { FiCopy } from 'react-icons/fi';
import styled from 'styled-components';



type ShoppingListProps = {
    shoppingList: ShoppingList;
    refetch: () => void;
}

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const CopyButton = styled.div`
    margin-left: 20px;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;

    &:active {
        transform: scale(0.95);
    }
`;

const ShoppingListCard: React.FC<ShoppingListProps> = ({ shoppingList, refetch }) => {
    const [copySuccess, setCopySuccess] = React.useState('');

    const copyListToClipboard = async () => {
        const listText = shoppingList.items.map(item => `${item.name} ${item.amount} ${item.unit}`).join('\n');
        const textarea = document.createElement('textarea');
        textarea.value = listText;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy text');
        }
        document.body.removeChild(textarea);

        setTimeout(
            () => {
                setCopySuccess('');
            }, 2000);
    };

    return (
        <div>
            <TitleContainer>
                <h2>{shoppingList.name}</h2>
                <CopyButton onClick={copyListToClipboard}>
                    {copySuccess === '' ? <FiCopy /> : copySuccess}
                </CopyButton>
            </TitleContainer>
            
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
