// Home.js

import { logout, transaction } from './Axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webview from './Webview'; // Import komponen Webview yang telah dibuat
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [merchantID, setMerchantID] = useState('');
  const [cashierIndex, setCashierIndex] = useState('');
  const [cashierToken, setCashierToken] = useState('');
  const [amount, setAmount] = useState('');
  const [webviewUrl, setWebviewUrl] = useState(''); // State untuk menyimpan URL webview

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
    console.log('Logout successful:', response);
    localStorage.clear();
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastLoading = toast.info('Processing create transaction...', {
      autoClose: false,
    });
    try {
      const response = await transaction(merchantID, amount);
      console.log('Amount:', response.data.url);
      toast.success('Create transaction successful');
      setWebviewUrl(response.data.url); // Set URL webview setelah transaksi berhasil
    } catch (error) {
      console.log(error);
      toast.error(`Create transaction failed`);
    } finally {
      toast.dismiss(toastLoading); // Tutup toast loading setelah selesai
    }
  };

  if (webviewUrl) {
    return <Webview url={webviewUrl} />; // Navigasi ke halaman webview jika URL sudah tersedia
  }

  return (
    <Container className="home-container" maxWidth="sm">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Welcome to Home Page Cashier: {cashierIndex}
      </Typography>

      <Button
        variant="contained"
        color="error"
        className="logout-button"
        onClick={handleLogout}
        style={{ position: 'absolute', top: 20, right: 10 }}
      >
        Logout
      </Button>

      <Typography variant="body1">Merchant ID: {merchantID}</Typography>
      <Typography variant="body1">Cashier Token: {cashierToken}</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="amount-form"
        sx={{ mt: 3 }}
      >
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            style: { backgroundColor: 'white', color: 'black' },
          }}
          InputLabelProps={{
            style: { color: 'black' },
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
