import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchRecipe from './pages/mainPage';
import Test from './pages/test';
import NavBar from './components/Navigation';
import MealPlanPage from './pages/mealPlanPage';
import NotificationProvider from './components/Notifications/NotificationProvider';
import Notifications from './components/Notifications/Notifications';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<SearchRecipe />} />
          <Route path="/test" element={<Test />} />
          <Route path="/mealPlans" element={<MealPlanPage />} />
        </Routes>
      </BrowserRouter>
      <Notifications />
    </NotificationProvider>
    
  );
}

export default App;
