import React, { useEffect, useState } from 'react';
import './App.css';

type Recipe = {
  id: number,
  name: string,
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use the fetch API to get data from the backend
    fetch('http://localhost:3000/api/recipes/')
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
    return <div>Loading...</div>;
  }

  return (
    // <div className="App">
    // <header className="App-header">
    //   <h1>Hello</h1>
    // </header>
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  // </div>
  );
}

export default App;
