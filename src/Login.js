// Login.js
import { login } from './Axios';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const merchantID = localStorage.getItem('merchantID');
    if (!!merchantID) {
      navigate('/');
    }
  }, [navigate]);

  const handleScan = async (data) => {
    if (data) {
      try {
        const { merchantID, token } = JSON.parse(data);
        setLoading(true);
        const response = await login(merchantID, token);
        console.log('Login successful:', response);
        localStorage.setItem('merchantID', merchantID);
        navigate('/');
      } catch (error) {
        console.error('Error posting QR data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR:', err);
  };

  return (
    <div className="login-container">
      <h2>Scan QR Code</h2>
      {loading && <p>Loading...</p>}
      <QrReader className='qr-reader'
        delay={300}
        onError={handleError}
        onResult={handleScan}
        style={{ width: '100%' }}
        constraints={{ facingMode: 'environment' }}
      />
    </div>
  );
};

export default Login;
