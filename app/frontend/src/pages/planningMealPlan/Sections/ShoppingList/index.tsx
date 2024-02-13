import React from 'react';
import Section from '../../components/section';
import ShoppingListPage from '../../../shoppingList';

const ShoppingListSection: React.FC = () => {
    return (
        <Section title="Shopping List" isPossibleToClose>
            <ShoppingListPage />
        </Section>
    );
};

export default ShoppingListSection;
