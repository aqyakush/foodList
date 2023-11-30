import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchRecipe from './pages/mainPage';
import Test from './pages/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchRecipe />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
