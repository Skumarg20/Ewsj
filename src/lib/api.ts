'use client'
import axios from 'axios';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, { email, password });
  localStorage.setItem('token', response.data.access_token);
  return response.data;
};

export const signup = async (
  email: string,
  password: string,
  phone: string,
  userClass: string,
  exam: string,
  address: string,
  username: string ,
  fullname:string
) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      username,
      email,
      password,
      phonenumber: phone,
      studentclass: userClass, 
      exam,
      address,
      fullname,
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