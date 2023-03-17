import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddItemPage from './pages/AddItemPage';
import RegisterPage from './pages/RegisterPage'
import TrackingPage from './pages/TrackingPage'
import ItemsPricesPage from './pages/Items/[id]';
import Settings from './pages/SettingsPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/tracking-page" element={<TrackingPage />} />
            <Route path="/items/:id" element={<ItemsPricesPage />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    )
}