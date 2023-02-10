import React from 'react';
import RegisterPage from './pages/RegisterPage'
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}