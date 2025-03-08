import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

interface Step1Props {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"success" | "error" | "">>;
}

export default function Step1RequestReset({
  email,
  setEmail,
  setStep,
  setMessage,
  setMessageType,
}: Step1Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<{ success: boolean; message?: string }>(
        "/auth/request-reset",
        { email }
      );
      if (response.status === 201) {
        setMessage("OTP sent to your email!");
        setMessageType("success");
        setStep(2);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(err.response?.data?.message ?? "Failed to send OTP. Try again.");
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
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Code"} <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.form>
  );
}