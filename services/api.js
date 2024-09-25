import axios from "axios";
import { host } from "../utils/env";

// Base API Configuration

const api = axios.create({
    baseURL: `${host}/`, 
    headers: {
      'Content-Type': 'application/json',
    },
  });


  export const loginApi = async (credentials) => {
    const response = await api.post('/authentication/login', credentials);
    return response.data;
  };
  
  export const signupApi = async (userData) => {
    const response = await api.post('/authentication/register', userData);
    return response.data;
  };


  export const sendOtpApi = async (email) => {
    const response = await api.post('/authentication/send-otp', { email, type: "AUTH" });
    return response.data;
};

export const verifyOtpApi = async (code, reference) => {
  const response = await api.post('/authentication/verify-otp', {
      code: String(code),       
      reference: String(reference) 
  });
  return response.data;
};

export const verifyBvnApi = async ({ bvn, username }, token) => {
  try {
      const response = await api.post(
          '/authentication/verify-bvn', 
          { bvn, username }, 
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );
      return response.data;
  } catch (error) {
      if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Error Response:', error.response.data);
          throw new Error(error.response.data.message || 'BVN verification failed');
      } else if (error.request) {
          // Request was made but no response received
          console.error('No response received:', error.request);
          throw new Error('No response from server. Please try again.');
      } else {
          // Something else happened while setting up the request
          console.error('Error:', error.message);
          throw new Error(error.message);
      }
  }
};


export const getUserData = async (token) => {
  try {
    const response = await api.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Something went wrong while fetching user data');
  }
};

export const logoutApi = async (token) => {
  try {
    const response = await api.post(
      '/authentication/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Something went wrong during logout');
  }
};


export const getWalletData = async (token) => {
  try {
    const response = await api.get('user/wallet/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Something went wrong while fetching wallet data');
  }
};
