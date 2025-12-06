import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProfileEditor from './components/ProfileEditor';
import ExperienceManager from './components/ExperienceManager';
import PortfolioManager from './components/PortfolioManager';
import PageManager from './components/PageManager';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token with backend
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/admin/dashboard" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? 
            <ProfileEditor onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/experience" 
          element={
            isAuthenticated ? 
            <ExperienceManager onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            isAuthenticated ? 
            <PortfolioManager onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" />
          } 
        />
        <Route 
          path="/pages" 
          element={
            isAuthenticated ? 
            <PageManager onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" />
          } 
        />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;

