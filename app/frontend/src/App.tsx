import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchRecipe from './pages/mainPage';
import Test from './pages/test';
import NavBar from './components/Navigation';
import MealPlanPage from './pages/mealPlanPage';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<SearchRecipe />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mealPlans" element={<MealPlanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
