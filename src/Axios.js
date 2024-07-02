import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (merchantID, token) => {
  try {
    const response = await api.post('/pgqr/loginQr', { merchantID, token });
    // Simpan data ke localStorage
    localStorage.setItem('merchantID', response.data.data.merchantID);
    localStorage.setItem('cashierIndex', response.data.data.cashierIndex);
    localStorage.setItem('cashierToken', response.data.data.cashierToken);
    localStorage.setItem('apiKey', response.data.data.apiKey);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async (merchantID, index, token) => {
  try {
    const response = await api.post('/pgqr/loginQr/logout', { merchantID, index, token });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export default api;
