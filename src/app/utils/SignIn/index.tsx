"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login, signup } from '../../../lib/api'
import MotivationalCard from './foundercard';
import useRedirectToDashboard from "@/hooks/dashboardRedirectHook";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiPhone, FiBook, FiArrowRight, FiEye, FiEyeOff, FiBookOpen, FiMapPin, FiUser } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image"; // Added Next.js Image import

type FormValues = {
  username?: string;
  fullname?: string;
  email: string;
  password: string;
  phone?: string;
  class?: string;
  exam?: string;
  address?: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fullname: yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: yup.string().email().required("Email is required"),
  password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  class: yup.string()
    .required("Class is required")
    .min(2, "Please enter a valid class"),
  exam: yup.string()
    .required("Exam is required")
    .min(2, "Please enter a valid exam"),
  address: yup.string()
    .required("Address is required")
    .min(5, "Please enter a valid address"),
});

const Login: React.FC = () => {
  const redirectToDashboard = useRedirectToDashboard();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setErrorMessage("");
    setIsLoading(false);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (isLogin) {
        await login(data.email, data.password);
        toast.success('Login successful! Redirecting...', {
          duration: 2000,
          position: 'top-center',
        });
        await redirectToDashboard();
      } else {
        await signup(
          data.email,
          data.password,
          data.phone!,
          data.class!,
          data.exam!,
          data.address!,
          data.username!,
          data.fullname!
        );
        toast.success('Signup successful! Logging in...', {
          duration: 2000,
          position: 'top-center',
        });
        await login(data.email, data.password);
        await redirectToDashboard();
      }
    } catch (error: unknown) { // Changed from 'any' to 'unknown'
      console.error(isLogin ? "Login failed" : "Signup failed", error);
      const errorMsg = error instanceof Error 
        ? error.message 
        : (isLogin ? "Invalid credentials" : "Signup failed. Please try again.");
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-full bg-white mt-5 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col md:flex-row w-[80%] justify-center m-auto p-auto rounded-3xl shadow-xl">
      <Toaster />
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
            <Image
              src="/student.png"
              alt="Founder"
              width={96} // Added width
              height={96} // Added height
              className="object-cover"
            />
          </motion.div>

          <motion.h1 
            className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {isLogin ? "Welcome Back!" : "Get Started"}
          </motion.h1>

          {errorMessage && (
            <motion.p
              className="text-red-500 text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMessage}
            </motion.p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              ...(isLogin ? [] : [
                {
                  name: "username",
                  icon: <FiUser className="text-blue-600" />,
                  type: "text",
                  placeholder: "Enter your username",
                  error: errors.username
                },
                {
                  name: "fullname",
                  icon: <FiUser className="text-blue-600" />,
                  type: "text",
                  placeholder: "Enter your full name",
                  error: errors.fullname
                },
              ]),
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
                type: showPassword ? "text" : "password",
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
                {
                  name: "class",
                  icon: <FiBook className="text-blue-600" />,
                  type: "text",
                  placeholder: "Enter your class (e.g., 11th, 12th)",
                  error: errors.class
                },
                {
                  name: "exam",
                  icon: <FiBookOpen className="text-blue-600" />,
                  type: "text",
                  placeholder: "Enter your exam (e.g., JEE, NEET, UPSC)",
                  error: errors.exam
                },
                {
                  name: "address",
                  icon: <FiMapPin className="text-blue-600" />,
                  type: "text",
                  placeholder: "Enter your address",
                  error: errors.address
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
                <div className="relative">
                  <input
                    {...register(field.name as keyof FormValues)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="mt-1 text-gray-700 block w-full px-3 py-2 border border-blue-200 rounded-3xl bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                    disabled={isLoading}
                  />
                  {field.name === "password" && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isLoading}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  )}
                </div>
                {field.error && (
                  <p className="text-red-500 text-sm mt-1">{field.error.message}</p>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-600'
              }`}
              disabled={isLoading}
            >
              {isLoading 
                ? (isLogin ? "Logging in..." : "Signing up...") 
                : (isLogin ? "Login" : "Sign Up")}
              {!isLoading && <FiArrowRight className="inline-block" />}
            </motion.button>
          </form>

          <motion.p 
            className="mt-4 text-center text-sm text-gray-600"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
          >
            {isLogin ? "New here? " : "Already have an account? "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none"
              disabled={isLoading}
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