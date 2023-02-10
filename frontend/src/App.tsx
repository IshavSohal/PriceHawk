import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AddItemPage from './pages/AddItemPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-item" element={<AddItemPage />} />
    </Routes>
  )
}
