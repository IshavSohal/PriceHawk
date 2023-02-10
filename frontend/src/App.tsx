import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AddItemPage from './pages/AddItemPage';
import RegisterPage from './pages/RegisterPage'



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/add-item" element={<AddItemPage />} />
    </Routes>
  )
}
