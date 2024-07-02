// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // File CSS untuk gaya tambahan

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const merchantID = localStorage.getItem('merchantID');
    if (!merchantID) {
      navigate('/login');
      return;
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h2>Welcome to Home Page</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <p>Merchant ID: {localStorage.getItem('merchantID')}</p>
      <p>Cashier Index: {localStorage.getItem('cashierIndex')}</p>
    </div>
  );
};

export default Home;
