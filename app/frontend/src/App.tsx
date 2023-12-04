import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SearchRecipe from './pages/mainPage';
import Test from './pages/test';
import NavBar from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<SearchRecipe />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mealPlans" element={<div>Meal Plans</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
