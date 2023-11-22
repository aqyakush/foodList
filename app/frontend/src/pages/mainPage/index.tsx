import React from 'react';
import { Recipe } from '../../types';
import useFetch from '../../hooks/apiHooks/useFetch';
import { API_URL, RECIPES_QUERY } from '../../utils/apis';
import LoadingSpinner from '../../components/LoadingSpinner';
import CenterDiv from '../../components/CenterDiv';
import RecipeCard from './components/recipeCard';
import CreateRecipeCard from './components/createRecipeCard';
import SearchInput from './components/searchInput';



const SearchRecipe = () => {
    const { data, setQuery, isLoading, error, refetch } = useFetch<Recipe[]>(`${API_URL}${RECIPES_QUERY}`);

    if (isLoading) {
      return (
        <CenterDiv>
          <LoadingSpinner />  
        </CenterDiv>
      );
    }
    
    return (
      <CenterDiv>
        <SearchInput setQuery={setQuery}/>
        {data?.map((data) => (  
            <RecipeCard recipe={data} />
        ))}
        <CreateRecipeCard refetch={refetch}/>
      </CenterDiv>
    );
  }

export default SearchRecipe;
