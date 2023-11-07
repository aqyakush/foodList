import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Card from '../../components/Cards';
import RecipeView from './components/recipe';

export type Recipe = {
  id: number,
  name: string,
}

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

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
`;

const SearchRecipe = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [debouncedInput, setDebouncedInput] = useState('');

    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedInput(input);
      }, 800); // 1s delay
  
      return () => {
        clearTimeout(timerId);
      };
    }, [input]);

    useEffect(() => {
      // Use the fetch API to get data from the backend
      fetch(`http://192.168.49.2/api/recipes/?name=${debouncedInput}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, [debouncedInput]);

    if (loading) {
      return <>Loading...</>;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    }
    
    return (
      <CenterDiv>
        <StyledInput type="text" placeholder="Search for recipes" onChange={handleInputChange}/>
          {recipes.map((recipe) => (
            <Card>
              <RecipeView recipe={recipe}/>
            </Card>
          ))}
      </CenterDiv>
    );
  }

export default SearchRecipe;
