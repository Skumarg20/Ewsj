"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Added for navigation
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Fingerprint,
  KeyRound,
  ArrowLeft,
  LogIn,
} from "lucide-react"; // Added ArrowLeft and LogIn icons
import Step1RequestReset from "@/components/reset-password/Step1RequestReset";
import Step2VerifyCode from "@/components/reset-password/Step2VerifyCode";
import Step3ResetPassword from "@/components/reset-password/Step3ResetPassword";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter(); // For navigation

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stepDetails = [
    { title: "Reset Password", icon: <Mail className="w-16 h-16 text-blue-400" />, desc: "Enter your email to receive a verification code" },
    { title: "Verify Identity", icon: <Fingerprint className="w-16 h-16 text-purple-400" />, desc: "Enter the code sent to your email" },
    { title: "Create New Password", icon: <KeyRound className="w-16 h-16 text-pink-400" />, desc: "Choose a strong password for your account" },
  ];

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setMessage(""); // Clear message when going back
      setMessageType("");
    }
  };

  const handleGoToLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40 -bottom-20 -right-20" />
      </div>

      <motion.div
        className="bg-white rounded-2xl p-8 w-full max-w-md relative overflow-hidden shadow-lg border border-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Gradient Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />

        {/* Step Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stepDetails[step - 1].icon}
        </motion.div>

        {/* Title and Description */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {stepDetails[step - 1].title}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {stepDetails[step - 1].desc}
        </p>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            } border px-4 py-2 rounded-lg mb-6 text-center`}
          >
            {message}
          </motion.div>
        )}

        {/* Steps */}
        {step === 1 && (
          <Step1RequestReset
            email={email}
            setEmail={setEmail}
            setStep={setStep}
            setMessage={setMessage}
            setMessageType={setMessageType}
          />
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Step2VerifyCode
              email={email}
              otp={otp}
              setOtp={setOtp}
              setStep={setStep}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
            <motion.button
              onClick={handleBack}
              className="w-full text-blue-500 py-2 flex items-center justify-center gap-2 hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" /> Back to Email
            </motion.button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <Step3ResetPassword
              email={email}
              otp={otp}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              setMessage={setMessage}
              setMessageType={setMessageType}
            />
            <motion.button
              onClick={handleBack}
              className="w-full text-purple-500 py-2 flex items-center justify-center gap-2 hover:text-purple-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" /> Back to OTP
            </motion.button>
          </div>
        )}

        {/* Progress Dots and Go to Login */}
        <div className="flex flex-col items-center mt-6 gap-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-all ${
                  s === step
                    ? step === 1
                      ? "bg-blue-500"
                      : step === 2
                      ? "bg-purple-500"
                      : "bg-pink-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <motion.button
            onClick={handleGoToLogin}
            className="text-gray-600 flex items-center gap-2 hover:text-gray-800 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="w-5 h-5" /> Back to Login
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}