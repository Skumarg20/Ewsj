import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Fingerprint, ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

interface Step2Props {
  email: string;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"success" | "error" | "">>;
}

export default function Step2VerifyCode({
  email,
  otp,
  setOtp,
  setStep,
  setMessage,
  setMessageType,
}: Step2Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<{ success: boolean; message?: string }>(
        "/auth/verify-code",
        { email, otp }
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("Code verified! Set your new password.");
        setMessageType("success");
        setStep(3);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(err.response?.data?.message ?? "Invalid OTP. Try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative">
        <Fingerprint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={otp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
          placeholder="Enter verification code"
          required
          disabled={isLoading}
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-purple-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify Code"} <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.form>
  );
}