"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define form values type
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
    // Add submission logic
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="bg-[#3d394d] p-8 shadow-md w-full max-w-md rounded-lg text-black mt-5">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="mt-1 text-gray-300 block w-full px-3 py-2 border border-[#121212] rounded-none shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="mt-1 text-gray-300 block w-full px-3 py-2 border border-[#121212] rounded-none shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-100"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Additional Fields for Signup */}
          {!isLogin && (
            <>
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-1 text-gray-300 block w-full px-3 py-2 border border-[#121212] rounded-none shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-100"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Enter your address"
                  className="mt-1 text-gray-300 block w-full px-3 py-2 border border-[#121212] rounded-none shadow-sm focus:outline-none focus:ring-gray-300 focus:border-gray-100"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              {/* Class (JEE/NEET) */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Class
                </label>
                <Controller
                  name="class"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="mt-1 text-white block w-full px-3 py-2 border border-gray-300 rounded-none shadow-sm focus:outline-none focus:ring-[#121212] focus:border-[#121212]"
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
            className="w-full bg-[#121212] text-white py-2 px-4 rounded-md focus:ring-[#121212] focus:border-[#121212] focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="mt-4 text-center text-sm text-black">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="text-white hover:text-[#121212] focus:outline-none"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
