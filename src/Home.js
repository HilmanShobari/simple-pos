// Home.js
import { logout } from './Axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // File CSS untuk gaya tambahan

const Home = () => {
  const navigate = useNavigate();
  const [merchantID, setMerchantID] = useState('');
  const [cashierIndex, setCashierIndex] = useState('');
  const [cashierToken, setCashierToken] = useState('');

  useEffect(() => {
    const storedMerchantID = localStorage.getItem('merchantID');
    const storedCashierIndex = localStorage.getItem('cashierIndex');
    const storedCashierToken = localStorage.getItem('cashierToken');

    if (!storedMerchantID) {
      navigate('/login');
      return;
    }

    setMerchantID(storedMerchantID);
    setCashierIndex(storedCashierIndex);
    setCashierToken(storedCashierToken);
  }, [navigate]);

  const handleLogout = async () => {
    const response = await logout(merchantID, cashierIndex, cashierToken);
    console.log('Login successful:', response);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h2>Welcome to Home Page</h2>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <p>Merchant ID: {merchantID}</p>
      <p>Cashier Index: {cashierIndex}</p>
      <p>Cashier Token: {cashierToken}</p>
    </div>
  );
};

export default Home;
