import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Card from '../../components/Cards';
import RecipeView from './components/recipeCard';
import CreateRecipe from './components/createRecipeCard';
import { Recipe } from '../../types';
import useFetch from '../../hooks/apiHooks/useFetch';
import { API_URL, DEBOUNCED_DELAY, RECIPES_QUERY } from '../../utils/apis';
import LoadingSpinner from '../../components/LoadingSpinner';
import CenterDiv from '../../components/CenterDiv';
import RecipeCard from './components/recipeCard';
import CreateRecipeCard from './components/createRecipeCard';

const StyledInput = styled.input`
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 50%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const SearchRecipe = () => {
    const { data, setQuery, isLoading, error } = useFetch<Recipe[]>(`${API_URL}${RECIPES_QUERY}`);
    const [input, setInput] = useState('');
    const [debouncedInput, setDebouncedInput] = useState('');

    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedInput(input);
      }, DEBOUNCED_DELAY); //0.8s delay
  
      return () => {
        clearTimeout(timerId);
      };
    }, [input]);

    useEffect(() => {
      debouncedInput ? setQuery(`?name=${debouncedInput}`) : setQuery('');
    }, [debouncedInput]);

    if (isLoading) {
      return (
        <CenterDiv>
          <LoadingSpinner />  
        </CenterDiv>
      );
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    }
    
    return (
      <CenterDiv>
        <StyledInput type="text" placeholder="Search for recipes" onChange={handleInputChange}/>
        {data?.map((data) => (  
            <RecipeCard recipe={data}/>
        ))}
        <CreateRecipeCard />
      </CenterDiv>
    );
  }

export default SearchRecipe;
