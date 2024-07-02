// Login.js
import { login } from './Axios';
import React, { useState, useEffect } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.js';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qrResult, setQrResult] = useState('');
  const [error, setError] = useState(null); // State untuk menyimpan pesan error
  const [scanningInProgress, setScanningInProgress] = useState(false); // State untuk memantau pemindaian sedang berlangsung

  useEffect(() => {
    const merchantID = localStorage.getItem('merchantID');
    if (!!merchantID) {
      navigate('/');
    }
  }, [navigate]);

  const handleScan = async (data) => {
    if (!scanningInProgress) { // Memastikan tidak ada pemindaian yang sedang berlangsung
      setScanningInProgress(true); // Mengatur bahwa pemindaian sedang berlangsung

      try {
        console.log('data qr: ', data);
        setQrResult(data);
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
        setScanningInProgress(false); // Mengatur bahwa pemindaian telah selesai
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
      <Html5QrcodePlugin
        className="qr-reader"
        fps={50}
        qrbox={500}
        disableFlip={true}
        qrCodeSuccessCallback={(result) => {
          if (!!result) {
            handleScan(result);
          }
        }}
      />
      <h5>Result: {qrResult}</h5>
    </div>
  );
};

export default Login;
