import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import SearchRecipe from './pages/mainPage';
import Test from './pages/test';
import NavBar from './pages/Navigation';
import MealPlanPage from './pages/mealPlanPage';
import NotificationProvider from './components/Notifications/NotificationProvider';
import Notifications from './components/Notifications/Notifications';
import ShoppingListPage from './pages/shoppingList';
import Footer from './components/Footer';
import styled from 'styled-components';
import PlanningMealPlan from './pages/planningMealPlan';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ViewContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <StyledApp>
      <NotificationProvider>
        <BrowserRouter>
          <MainContainer>
            <NavBar />
            <ViewContainer>
              <Routes>
                <Route path="/viewing/recipes" element={<SearchRecipe />} />
                <Route path="*" element={<RedirectToRecipes />} />
                <Route path="/test" element={<Test />} />
                <Route path="/viewing/mealPlans" element={<MealPlanPage />} />
                <Route path="/viewing/shoppingLists" element={<ShoppingListPage />} />
                <Route path="/planning/mealPlans/:id" element={<PlanningMealPlan />} />
              </Routes> 
            </ViewContainer>
          </MainContainer>  
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
    navigate('/viewing/recipes');
  }, [navigate]);

  return null;
}

export default App;
