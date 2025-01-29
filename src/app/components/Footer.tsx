import { FC } from "react";
import { FaFacebook, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-900 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">About EwSj</h3>
            <p className="text-sm text-gray-900">
              EwSj is your platform for connecting, sharing, and growing in a dynamic
              community. Explore a world of possibilities with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-900 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-900 hover:text-gray-800">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-900 hover:text-gray-800">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-900 hover:text-gray-800">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Connect with Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-900 hover:text-gray-800">
                <FaTwitter className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-800">
                <FaFacebook className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-800">
                <FaGithub className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-800">
                <FaInstagram className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8 text-sm border-t border-gray-300 pt-4">
          <p className="text-gray-800">&copy; 2025 EwSj Platform. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
