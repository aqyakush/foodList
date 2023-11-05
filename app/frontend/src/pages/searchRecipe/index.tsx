import React, { useEffect, useState } from 'react';
import styled from "styled-components";

type Recipe = {
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
      }, 2000); // 2s delay
  
      return () => {
        clearTimeout(timerId);
      };
    }, [input]);

    useEffect(() => {
      // Use the fetch API to get data from the backend
      fetch(`http://192.168.49.2/api/recipes/?name__icontains=${debouncedInput}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, [debouncedInput]); // The empty array means this effect runs only once after the initial render

    if (loading) {
      return <>Loading...</>;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    }
    
    return (
      <CenterDiv>
        <StyledInput type="text" placeholder="Search for a recipe" onChange={handleInputChange}/>
        {/* <Title>Recipes test</Title> */}
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      </CenterDiv>
    );
  }

export default SearchRecipe;
