import axios from 'axios';
import './Helper';
import generateRandomNumber from './Helper';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const txApi = axios.create({
  baseURL: process.env.REACT_APP_TXAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => {
  return localStorage.getItem('cashierToken');
};

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
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async (merchantID, cashierID, cashierToken) => {
  try {
    const accessToken = getAccessToken();
    const response = await api.post(
      '/cashier/logout',
      {
        merchantID,
        cashierID,
        cashierToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const transaction = async (merchant_id, cashier_id, amount) => {
  try {
    console.log('amount: ', amount);

    const accessToken = getAccessToken();
    const randomNum = generateRandomNumber(5); // Menghasilkan angka acak 5 digit
    const order_no = `HS-${randomNum}`; // Membuat nomor order
    const phone = '6285123456789';
    const name = 'John Doe';
    const email = 'johnvaporrr@gmail.com';
    const currency = 'IDR';

    const response = await txApi.post(
      '/cashier/order',
      {
        order_no,
        merchant_id,
        cashier_id,
        amount,
        currency,
        phone,
        name,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
