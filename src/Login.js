// Login.js
import { login } from './Axios';
import React, { useState, useEffect } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.js';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import komponen CircularProgress dari MUI
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

  useEffect(() => {
    // Hapus error setelah 3 detik jika ada
    let errorTimer;
    if (error) {
      errorTimer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [error]);

  const handleScan = async (data) => {
    if (!scanningInProgress) {
      // Memastikan tidak ada pemindaian yang sedang berlangsung
      setScanningInProgress(true); // Mengatur bahwa pemindaian sedang berlangsung

      try {
        console.log('data qr: ', data);
        setQrResult(data);
        const { merchantID, cashierID, qrToken } = JSON.parse(data);
        console.log('data: ', data);
        setLoading(true);
        const response = await login(merchantID, cashierID, qrToken);
        console.log('Login successful:', response);
        setError(null); // Reset pesan error jika berhasil
        navigate('/');
      } catch (error) {
        console.error('Error posting QR data:', error);
        setError(error.message); // Set pesan error
        setTimeout(() => {
          setScanningInProgress(false); // Setelah 3 detik, set pemindaian selesai untuk memunculkan kembali Html5QrcodePlugin
        }, 3000);
      } finally {
        setLoading(false);
      }
    } else {
      return false; // Mengembalikan false jika pemindaian sedang berlangsung
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR:', err);
    setError('Failed to scan QR code. Please try again.'); // Set pesan error
    setTimeout(() => {
      setScanningInProgress(false); // Setelah 3 detik, set pemindaian selesai untuk memunculkan kembali Html5QrcodePlugin
    }, 3000);
  };

  return (
    <div className="login-container">
      <h2>Scan QR Code To Login</h2>
      {loading && <CircularProgress className="loading-spinner" />} {/* Tampilkan indikator loading jika loading true */}
      {error && <p className="error-message">{error} ... retrying in 3 seconds</p>}{' '}
      {!loading && !error && ( // Tampilkan Html5QrcodePlugin jika tidak loading dan tidak ada error
        <Html5QrcodePlugin
          className="qr-reader"
          fps={500}
          qrbox={250}
          disableFlip={true}
          qrCodeSuccessCallback={(result) => {
            if (!!result) {
              handleScan(result);
            }
          }}
        />
      )}
      <h5>Result: {qrResult}</h5>
    </div>
  );
};

export default Login;
