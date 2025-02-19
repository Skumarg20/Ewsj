'use client'
import axios from 'axios';

export const login = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:5000/auth/signin', { email, password });
  localStorage.setItem('token', response.data.access_token);
  return response.data;
};
export const signup = async (email: string, password: string, phone: string, address: string, userClass: string) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        email,
        password,
        phone,
        address,
        class: userClass,
      });
  
      return response.data; 
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };
  
export const getAuthHeader = () => {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` };
};
