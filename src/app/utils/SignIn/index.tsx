"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {login} from '../../../lib/api'
import { useRouter } from "next/navigation";
import MotivationalCard from './foundercard';
import Image from 'next/image';
import getTimeTable from '@/state/store/timetablestore'
import useRedirectToDashboard from "@/hooks/dashboardRedirectHook";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail, FiPhone, FiBook, FiArrowRight } from "react-icons/fi";
type FormValues = {
  email: string;
  password: string;
  phone?: string;
  address?: string;
  class?: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signupSchema = loginSchema.concat(
  yup.object().shape({
    phone: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required"),
    class: yup.string().required("Class selection is required"),
  })
);

const classforInput =
  "mt-1 text-gray-700 block w-full px-3 py-2 border border-blue-600 rounded-3xl bg-[#e6e5e8] focus:outline-none focus:ring-gray-400 focus:border-gray-300";

const Login: React.FC = () => {

  const router = useRouter();
  
  const redirectToDashboard = useRedirectToDashboard(); 
  const [isLogin, setIsLogin] = useState<boolean>(true);
 
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    
    if (isLogin) {
      try {
        await login(data.email,data.password);
        await redirectToDashboard();
      } catch (error) {
        console.log("login failed",error);
      }

    }
    
  };

  return (
    <div className="h-auto mt-5 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col md:flex-row w-[80%] justify-center m-auto p-auto rounded-3xl shadow-xl">
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[10%] p-5">
      <motion.div 
        className="w-[100%] mr-7 flex-col items-center justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="/student.png"
            alt="Founder"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h1 
          className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {isLogin ? "Welcome Back!" : "Get Started"}
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            {
              name: "email",
              icon: <FiMail className="text-blue-600" />,
              type: "email",
              placeholder: "Enter your email",
              error: errors.email
            },
            {
              name: "password",
              icon: <FiLock className="text-blue-600" />,
              type: "password",
              placeholder: "Enter your password",
              error: errors.password
            },
            ...(!isLogin ? [
              {
                name: "phone",
                icon: <FiPhone className="text-blue-600" />,
                type: "tel",
                placeholder: "Enter your phone number",
                error: errors.phone
              },
            ] : [])
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                {field.icon}
                <label>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
              </div>
              <input
                {...register(field.name as keyof FormValues)}
                type={field.type}
                placeholder={field.placeholder}
                className="mt-1 text-gray-700 block w-full px-3 py-2 border border-blue-200 rounded-3xl bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
              />
              {field.error && (
                <p className="text-red-500 text-sm mt-1">{field.error.message}</p>
              )}
            </motion.div>
          ))}

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <FiBook className="text-blue-600" />
                <label>Class</label>
              </div>
              <Controller
                name="class"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className="w-full bg-white text-gray-700 rounded-3xl border border-blue-200 p-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 appearance-none"
                    >
                      <option value="">Select your class</option>
                      <option value="JEE">JEE</option>
                      <option value="NEET">NEET</option>
                    </select>
                    <FiArrowRight className="absolute right-3 top-3 text-gray-400 rotate-90" />
                  </div>
                )}
              />
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
              )}
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? "Login" : "Signup"}
            <FiArrowRight className="inline-block" />
          </motion.button>
        </form>

        <motion.p 
          className="mt-4 text-center text-sm text-gray-600"
          whileHover={{ scale: 1.02 }}
        >
          {isLogin ? "New here? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </motion.p>
      </motion.div>

      <motion.div 
        className="w-full md:w-[45%] shrink-0"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <MotivationalCard />
      </motion.div>
    </div>

    {/* Floating Graphics */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-50"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-purple-100 rounded-full blur-xl opacity-50"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
  </div>
  );
};

export default Login;
