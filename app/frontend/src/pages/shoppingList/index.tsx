import React from 'react';
import useFetch from '../../hooks/apiHooks/useFetch';
import { API_URL, SHOPPING_LIST_QUERY } from '../../utils/apis';
import CenterDiv from '../../components/CenterDiv';
import LoadingSpinner from '../../components/LoadingSpinner';
import ShoppingList from '../../types/shoppingList';
import ShoppingListCard from './components/ShoppingListCard';

const ShoppingListPage = () => {
    const { data, isLoading, refetch } = useFetch<ShoppingList[]>(`${API_URL}${SHOPPING_LIST_QUERY}`);
    
    if (isLoading) {
        return (
          <CenterDiv>
            <LoadingSpinner />  
          </CenterDiv>
        );
      }

    return (
        <CenterDiv>
            {data?.map((shoppingList) => (
                <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList} refetch={refetch}/>
            ))}
        </CenterDiv>


    );
};

export default ShoppingListPage;
