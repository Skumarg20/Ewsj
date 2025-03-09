'use client'
import axios from 'axios';
import axiosInstance from './axiosInstance';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/signin", { email, password });
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
export const signup = async (
  username: string,    // Reordered to match typical API expectations
  fullname: string,
  email: string,
  password: string,
  phone: string,
  userClass: string,
  exam: string
) => {
  try {
    console.log(username, fullname, email, password, phone, userClass, exam, "this is data I am sending");
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      username,
      fullname,
      email,
      password,
      phonenumber: phone,
      studentclass: userClass,
      exam,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthHeader = () => {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` };
};