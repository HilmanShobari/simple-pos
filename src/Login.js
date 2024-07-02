// Login.js
import { login } from './Axios';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qrResult, setQrResult] = useState('');
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  useEffect(() => {
    const merchantID = localStorage.getItem('merchantID');
    if (!!merchantID) {
      navigate('/');
    }
  }, [navigate]);

  const handleScan = async (data) => {
    if (data) {
      try {
        console.log('data qr: ', data.text);
        setQrResult(data.text);
        const { merchantID, token } = JSON.parse(data);
        console.log('merchantID:', merchantID, 'token:', token);
        setLoading(true);
        const response = await login(merchantID, token);
        console.log('Login successful:', response);
        setError(null); // Reset pesan error jika berhasil
        navigate('/');
      } catch (error) {
        console.error('Error posting QR data:', error);
        setError(error.message); // Set pesan error
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR:', err);
    setError('Failed to scan QR code. Please try again.'); // Set pesan error
  };

  return (
    <div className="login-container">
      <h2>Scan QR Code</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}{' '}
      {/* Tampilkan pesan error */}
      <QrReader
        className="qr-reader"
        onError={handleError}
        onResult={handleScan}
        style={{ width: '100%' }}
        constraints={{ facingMode: 'environment' }}
      />
      <h5>Result: {qrResult}</h5>
    </div>
  );
};

export default Login;
