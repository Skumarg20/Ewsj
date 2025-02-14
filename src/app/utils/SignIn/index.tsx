"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


type FormValues = {
  email: string;
  password: string;
  phone?: string;
  address?: string;
  class?: string;
};

// Schema validation
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
let classforInput='mt-1 text-gray-700 block w-full px-3 py-2 border border-blue-600 rounded-3xl bg-[#e6e5e8] focus:outline-none focus:ring-gray-400 focus:border-gray-300'
const Login: React.FC = () => {
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    
  };

  return (
    <div className="h-screen bg-[#fcfbfb] flex items-center justify-center">
    <div className="bg-[#f5f5f5] shadow-md w-[50%] max-w-4xl rounded-2xl flex flex-col md:flex-row pl-3 pt-10 md:ml-20">
    
      <div className="md:w-full p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-500 rounded-3xl">
          {isLogin ? "Login" : "Signup"}
        </h1>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className={classforInput}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
  
    
          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className={classforInput}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
  
        
          {!isLogin && (
            <>
              
              <div>
                <label className="block text-sm font-medium text-gray-900">Phone Number</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Enter your phone number"
                  className={classforInput}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
  
              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Class</label>
                <Controller
                  name="class"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                       className="w-full bg-slate-200 text-gray-700 rounded-3xl border-blue-400 p-2 border-ring"
                    >
                      <option value="">Select your class</option>
                      <option value="JEE">JEE</option>
                      <option value="NEET">NEET</option>
                    </select>
                  )}
                />
                {errors.class && (
                  <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
                )}
              </div>
            </>
          )}
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1e90ff] hover:bg-slate-300 hover:text-gray-900 text-white py-2 px-4 rounded-3xl focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
  
        {/* Toggle between Login and Signup */}
        <p className="mt-4 text-center text-sm text-gray-700">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="text-blue-400 hover:underline focus:outline-none hover:bg-slate-100 hover:text-gray-700"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div> 
    </div>

    <div className="hidden md:flex md:w-1/2 bg-[#e8e8ef] p-6 rounded-r-2xl flex-col items-center justify-center text-center text-gray-800">
        <h2 className="text-3xl font-bold">Track Your Journey 🚀</h2>
        <p className="mt-4 text-gray-500">
          "Stay committed, stay focused, and reach your target. Whether you're preparing for JEE or NEET, your hard work will pay off"
          <br/>
          <span>Let’s ace it together!</span> 💪
        </p>
        <img
          src="https://source.unsplash.com/300x200/?goal,motivation"
          alt="Motivation"
          className="mt-6 rounded-lg shadow-md"
        />
      </div>
  </div>
  
  );
};

export default Login;
