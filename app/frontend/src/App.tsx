import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchRecipe from './pages/searchRecipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
