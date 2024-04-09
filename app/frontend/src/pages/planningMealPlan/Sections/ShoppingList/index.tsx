import React from 'react';
import Section from '../../components/section';
import { useParams } from 'react-router-dom';
import useFetch from '../../../../hooks/apiHooks/useFetch';
import ShoppingList from '../../../../types/shoppingList';
import { API_URL, SHOPPING_LIST_QUERY } from '../../../../utils/apis';
import CenterDiv from '../../../../components/CenterDiv';
import ShoppingListCard from '../../../shoppingList/components/ShoppingListCard';

const ShoppingListSection: React.FC = () => {
    const params = useParams();
    const { data: shoppingList, isLoading: shoppingLIstLoading, refetch: refetchShoppingLIst } = useFetch<ShoppingList>(`${API_URL}${SHOPPING_LIST_QUERY}${params.id}`);
   
    return (
        <Section title="Shopping List" isPossibleToClose>
            {
                shoppingLIstLoading ? <CenterDiv>Loading...</CenterDiv> : 
                shoppingList ? <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList} refetch={refetchShoppingLIst}/> : <CenterDiv>No shopping list found</CenterDiv>
            }
        </Section>
    );
};

export default ShoppingListSection;
