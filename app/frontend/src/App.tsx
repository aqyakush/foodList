import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import SearchRecipe from './pages/mainPage';
import Test from './pages/test';
import NavBar from './components/Navigation';
import MealPlanPage from './pages/mealPlanPage';
import NotificationProvider from './components/Notifications/NotificationProvider';
import Notifications from './components/Notifications/Notifications';
import ShoppingListPage from './pages/shoppingList';
import Footer from './components/Footer';
import styled from 'styled-components';

const StyledApp = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 10px; 
`;

function App() {
  return (
    <StyledApp>
      <NotificationProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/recipes" element={<SearchRecipe />} />
            <Route path="*" element={<RedirectToRecipes />} />
            <Route path="/test" element={<Test />} />
            <Route path="/mealPlans" element={<MealPlanPage />} />
            <Route path="/shoppingLists" element={<ShoppingListPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Notifications />
      </NotificationProvider>
    </StyledApp>
  );
}

const RedirectToRecipes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/recipes');
  }, [navigate]);

  return null;
}

export default App;
