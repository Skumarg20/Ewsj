"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiUser, FiMail, FiBook, FiMessageSquare, FiClock, FiBookOpen, FiTarget, FiSend } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const controls = useAnimation();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setErrorMessage("Configuration error. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log("Email sent successfully!", response.status, response.text);
      setSuccessMessage("Your message has been sent successfully! 🚀");
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 },
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePricingClick = () => {
    router.push("/subscription");
  };

  return (
    <div
      className="w-full md:w-[90%] h-full p-4 lg:p-7 mt-5 mb-5 flex flex-col lg:flex-row border shadow-2xl m-auto bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden"
      id="contact"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse-slow" />
        <motion.div
          className="absolute top-10 left-10"
          animate={{ y: [0, -30, 0], rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiBookOpen className="w-16 h-16 text-indigo-300/30 hover:text-indigo-400 transition-colors" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiTarget className="w-16 h-16 text-purple-300/30 hover:text-purple-400 transition-colors" />
        </motion.div>
      </div>

      {/* Left Section */}
      <div className="w-full lg:w-[50%] mb-6 lg:mb-0 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-4 font-extrabold px-4 lg:pl-6 text-4xl lg:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight"
        >
          Supercharge Your Success <br /> with CogeNist
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="px-4 lg:pl-6 mt-4 text-lg lg:text-xl text-gray-200 font-medium"
        >
          Unleash your potential with cutting-edge tools and strategies designed to skyrocket your productivity and conquer your goals!
        </motion.p>
        <motion.div
          className="mt-8 ml-4 lg:ml-5 flex items-center justify-center"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          whileTap={{ scale: 0.95, rotate: 2 }}
          onClick={handlePricingClick}
          style={{
            background: "linear-gradient(45deg, #00b4d8, #7209b7)",
            padding: "12px 24px",
            borderRadius: "12px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
          role="button"
          aria-label="View Subscriptions"
        >
          Subscriptions
        </motion.div>
        <motion.div
          className="grid grid-cols-3 gap-4 mt-12 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: FiBook, text: "Smart Study", color: "text-purple-400" },
            { icon: FiClock, text: "Time Mastery", color: "text-indigo-400" },
            { icon: FiTarget, text: "Goal Crusher", color: "text-pink-400" },
          ].map(({ icon: Icon, text, color }) => (
            <motion.div
              key={text}
              className="p-3 bg-gray-800/80 backdrop-blur-md rounded-lg border border-gray-700/50"
              whileHover={{
                y: -8,
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                backgroundColor: "rgba(55, 65, 81, 0.9)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className={`w-8 h-8 ${color} mx-auto animate-pulse-slow`} />
              <p className="text-center mt-2 text-sm text-gray-200 font-semibold">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[50%] relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gray-800/90 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-xl mx-2 lg:mx-0 border border-gray-700/50"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <FiMail className="text-purple-400 w-8 h-8" />
            </motion.span>
            Let’s Connect!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Form">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300"
                role="alert"
              >
                {successMessage}
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
                role="alert"
              >
                {errorMessage}
              </motion.div>
            )}
            {[
              { id: "name", icon: <FiUser />, type: "text", placeholder: "Your Name", required: true },
              { id: "email", icon: <FiMail />, type: "email", placeholder: "Your Email", required: true },
              { id: "subject", icon: <FiBook />, type: "text", placeholder: "What’s on your mind?" },
              { id: "message", icon: <FiMessageSquare />, type: "textarea", placeholder: "Tell us everything!", required: true },
            ].map(({ id, icon, type, placeholder, required }, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                >
                  <motion.span whileHover={{ scale: 1.2, rotate: 10 }}>{icon}</motion.span>
                  <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    name={id}
                    value={formData[id as keyof FormData]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                    rows={4}
                    aria-required={required}
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id as keyof FormData]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70"
                    aria-required={required}
                  />
                )}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              animate={controls}
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Submit Contact Form"
            >
              <FiSend className="w-5 h-5 group-hover:animate-bounce" />
              {isSubmitting ? "Sending..." : "Launch Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;