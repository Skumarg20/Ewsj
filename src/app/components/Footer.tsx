import { FC } from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaGithub, 
  FaInstagram, 
  FaRocket,
  FaGraduationCap,
  FaBookOpen,
  FaLightbulb,
  FaPencilAlt,
  FaFlask,
  FaBrain,
  FaRegClock
} from "react-icons/fa";
import { motion } from "framer-motion";


const Footer: FC = () => {
  const socialLinks = [
    { icon: <FaTwitter />, name: "Twitter" },
    { icon: <FaFacebook />, name: "Facebook" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <FaInstagram />, name: "Instagram" },
  ];

  const quickLinks = [
    { text: "Home", href: "#", icon: <FaGraduationCap /> },
    { text: "Courses", href: "#", icon: <FaBookOpen /> },
    { text: "Contact", href: "#", icon: <FaPencilAlt /> },
    { text: "Resources", href: "#", icon: <FaFlask /> },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 to-blue-700 text-white pt-20 pb-3 overflow-hidden text-xl">
      {/* Animated Study Graphics */}
      <div className="absolute inset-0 z-0">
        {/* Floating Notebook */}
        <motion.div 
          className="absolute top-20 left-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaBookOpen className="w-12 h-12 text-blue-200/30" />
        </motion.div>

        {/* Molecular Structure */}
        <motion.div 
          className="absolute bottom-40 right-40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FaFlask className="w-16 h-16 text-purple-200/30" />
        </motion.div>

        {/* Animated Pencil */}
        <motion.div 
          className="absolute top-1/3 left-1/4"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaPencilAlt className="w-8 h-8 text-yellow-200/40" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaGraduationCap className="w-8 h-8 text-cyan-400" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
               CogeNist
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Accelerating academic success through innovative learning solutions.
            </p>
            
            {/* Animated Brain */}
            <motion.div 
              className="mt-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaBrain className="w-12 h-12 text-purple-400/30" />
            </motion.div>
          </motion.div>

          {/* Study Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
              <FaBookOpen className="text-cyan-400" />
              Study Resources
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.href} className="flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors">
                    <motion.span whileHover={{ rotate: 15 }}>
                      {link.icon}
                    </motion.span>
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Study Tools */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
              <FaRegClock className="text-cyan-400" />
              Study Tools
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="p-3 bg-blue-800/30 rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <FaRegClock className="text-green-400" />
                <span className="text-sm">Pomodoro Timer</span>
              </motion.div>
              
              <motion.div 
                className="p-3 bg-blue-800/30 rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <FaBookOpen className="text-yellow-400" />
                <span className="text-sm">E-Books</span>
              </motion.div>
              
              <motion.div 
                className="p-3 bg-blue-800/30 rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <FaFlask className="text-red-400" />
                <span className="text-sm">Virtual Lab</span>
              </motion.div>
              
              <motion.div 
                className="p-3 bg-blue-800/30 rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <FaBrain className="text-purple-400" />
                <span className="text-sm">Mind Maps</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
              <FaRocket className="text-cyan-400" />
              Connect & Launch
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-3 rounded-full bg-blue-800/30 hover:bg-blue-800/50 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
            
            {/* Animated Lightbulb */}
            <motion.div 
              className="mt-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaLightbulb className="w-12 h-12 text-yellow-400/30 mx-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="border-t border-blue-800/50 my-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-sm text-gray-400"
        >
          <p>
            &copy; {new Date().getFullYear()} EwSj Academy. Fueling academic excellence.{" "}
            <motion.span 
              className="text-cyan-400"
              animate={{ textShadow: ["0 0 8px rgba(34,211,238,0)", "0 0 8px rgba(34,211,238,0.5)", "0 0 8px rgba(34,211,238,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ignite Your Potential
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;