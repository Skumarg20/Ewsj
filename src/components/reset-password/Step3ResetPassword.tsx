import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // Added for navigation
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

interface Step3Props {
  email: string;
  otp: string;
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"success" | "error" | "">>;
}

export default function Step3ResetPassword({
  email,
  otp,
  newPassword,
  setNewPassword,
  setMessage,
  setMessageType,
}: Step3Props) {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<{ success: boolean; message?: string }>(
        "/auth/reset-password",
        { email, otp, newPassword }
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("Password reset successfully! Redirecting to login...");
        setMessageType("success");
        // Redirect to login after a 2-second delay to show the success message
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(err.response?.data?.message ?? "Failed to reset password. Try again.");
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
      {/* New Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-12 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder="Enter new password"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-12 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder="Confirm new password"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-pink-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset Password"} <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.form>
  );
}