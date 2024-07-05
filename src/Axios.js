import axios from 'axios';
import './Helper';
import generateRandomNumber from './Helper';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (merchantID, cashierID, qrToken) => {
  try {
    const response = await api.post('/loginQr', {
      merchantID,
      cashierID,
      qrToken,
    });
    // Simpan data ke localStorage
    localStorage.setItem('merchantID', response.data.data.merchantID);
    localStorage.setItem('cashierID', response.data.data.cashierID);
    localStorage.setItem('cashierToken', response.data.data.cashierToken);
    localStorage.setItem('apiKey', response.data.data.apiKey);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async (merchantID, cashierID, cashierToken) => {
  try {
    const response = await api.post('/loginQr/logout', {
      merchantID,
      cashierID,
      cashierToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const transaction = async (merchant_id, amount) => {
  try {
    const randomNum = generateRandomNumber(5); // Menghasilkan angka acak 5 digit
    const order_no = `HS-${randomNum}`; // Membuat nomor order
    const phone = '6285123456789';
    const name = 'John Doe';
    const email = 'johnvaporrr@gmail.com';
    const currency = 'IDR';

    const apiKey = localStorage.getItem('apiKey');

    const response = await axios.post(
      'https://staging-nero-api.qoincrypto.id/testnet/merchant/fiat/order',
      {
        order_no,
        merchant_id,
        amount,
        currency,
        phone,
        name,
        email,
      },
      {
        headers: {
          'API-KEY': apiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export default api;
