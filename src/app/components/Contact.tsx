"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiUser, FiMail, FiBook, FiMessageSquare, FiClock, FiBookOpen, FiTarget } from "react-icons/fi";
import { motion } from "framer-motion";
import BookCallButton from "./BookaCall";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="w-[90%] h-full p-4 lg:p-7 mt-5 mb-5 flex flex-col lg:flex-row rounded-3xl border shadow-lg m-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Study Graphics */}
      <div className="absolute inset-0 z-0">
        {/* Animated Study Icons */}
        <motion.div 
          className="absolute top-20 left-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FiBookOpen className="w-12 h-12 text-blue-200/40" />
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FiTarget className="w-12 h-12 text-purple-200/40" />
        </motion.div>

        <motion.div 
          className="absolute top-1/3 left-1/4"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FiClock className="w-12 h-12 text-pink-200/40" />
        </motion.div>
      </div>

      {/* Left Section */}
      <div className="w-full lg:w-[50%] mb-6 lg:mb-0 overflow-hidden relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 font-bold px-4 lg:pl-6 text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Boost Your Productivity & <br /> Achieve More with Ewsj
        </motion.h1>

        <p className="px-4 lg:pl-6 mt-4 text-base lg:text-lg text-gray-700">
          Empowering students with smart tools and strategies to stay focused,
          manage time, and overcome study challenges effectively.
        </p>

        <div className="mt-8 ml-4 lg:ml-5">
          <BookCallButton />
        </div>

        {/* Animated Study Icons Grid */}
        <motion.div 
          className="hidden lg:grid grid-cols-3 gap-6 mt-12 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="p-4 bg-white rounded-xl shadow-sm"
            whileHover={{ y: -5 }}
          >
            <FiBook className="w-8 h-8 text-blue-600 mx-auto" />
            <p className="text-center mt-2 text-sm">Study Resources</p>
          </motion.div>
          <motion.div 
            className="p-4 bg-white rounded-xl shadow-sm"
            whileHover={{ y: -5 }}
          >
            <FiClock className="w-8 h-8 text-purple-600 mx-auto" />
            <p className="text-center mt-2 text-sm">Time Management</p>
          </motion.div>
          <motion.div 
            className="p-4 bg-white rounded-xl shadow-sm"
            whileHover={{ y: -5 }}
          >
            <FiTarget className="w-8 h-8 text-pink-600 mx-auto" />
            <p className="text-center mt-2 text-sm">Goal Setting</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[50%] relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg mx-2 lg:mx-0"
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiMail className="text-purple-600" />
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {[
              { id: "name", icon: <FiUser />, type: "text" },
              { id: "email", icon: <FiMail />, type: "email" },
              { id: "subject", icon: <FiBook />, type: "text" },
              { id: "message", icon: <FiMessageSquare />, type: "textarea" },
            ].map(({ id, icon, type }, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"
                >
                  <motion.span whileHover={{ scale: 1.1 }}>
                    {icon}
                  </motion.span>
                  <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    name={id}
                    value={formData[id as keyof FormData]}
                    onChange={handleChange}
                    placeholder={`Enter your ${id}`}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50"
                    rows={4}
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id as keyof FormData]}
                    onChange={handleChange}
                    placeholder={`Enter your ${id}`}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50"
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FiMail className="w-5 h-5" />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;