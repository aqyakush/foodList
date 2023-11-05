import React, { useEffect, useState } from 'react';
import styled from "styled-components";

type Recipe = {
  id: number,
  name: string,
}

const Title = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 10px;

`;

const SearchRecipe = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Use the fetch API to get data from the backend
      fetch('http://192.168.49.2/api/recipes/')
        .then((response) => response.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []); // The empty array means this effect runs only once after the initial render

    if (loading) {
      return <>Loading...</>;
    }

    return (
      <>
        <Title>Recipes test</Title>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      </>
    );
  }

export default SearchRecipe;
