import { FC } from "react";
import { FaTwitter, FaInstagram, FaYoutube, FaRocket, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: FC = () => {
  const socialLinks = [
    { icon: <FaTwitter className="text-cyan-400" />, name: "Twitter", href: "https://x.com/cogenist" },
    { icon: <FaInstagram className="text-pink-400" />, name: "Instagram", href: "https://www.instagram.com/cogenist/" },
    { icon: <FaYoutube className="text-gray-300" />, name: "Youtube", href: "https://www.youtube.com/@CogeNist" },
  ];

  const quickLinks = [
    { text: "Home", href: "#" },
    { text: "Contact", href: "#contact" }, // Updated to link to contact section
  ];

  const contactInfo = {
    email: "cogenist@gmail.com",
    phone: "+91 9696402486",
  };

  return (
    <footer className="relative bg-gradient-to-t from-gray-900 to-indigo-900 text-white py-12 overflow-hidden">
     
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <FaRocket className="w-8 h-8 text-indigo-400" />
              </motion.div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                CogeNist
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-300 text-center md:text-left">
              Launch your learning journey!
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-6"
          >
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                whileHover={{ scale: 1.1, color: "#22d3ee" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {link.text}
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-indigo-800/50 transition-colors relative group"
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  {social.icon}
                </span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-900 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col items-center gap-4"
          id="contact"
        >
          <h3 className="text-lg font-semibold text-indigo-400">Contact Us</h3>
          <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-300">
            <motion.a
              href={`mailto:${contactInfo.email}`}
              whileHover={{ scale: 1.05, color: "#22d3ee" }}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <FaEnvelope className="text-indigo-400" />
              {contactInfo.email}
            </motion.a>
            <motion.a
              href={`tel:${contactInfo.phone}`}
              whileHover={{ scale: 1.05, color: "#22d3ee" }}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <FaPhone className="text-indigo-400" />
              {contactInfo.phone}
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <p>
            © {new Date().getFullYear()} CogeNist.{" "}
            <motion.span
              className="text-indigo-400 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ignite Your Future
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;