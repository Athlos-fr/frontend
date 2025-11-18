import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Brand Section */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-cyan-400 tracking-wider">ATHLOS</h3>
            <p className="text-sm text-gray-500 mt-1">Track. Compete. Achieve.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0 text-sm font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link to="/profile" className="hover:text-cyan-400 transition-colors">
              Profile
            </Link>
            {/* Placeholder links for future pages */}
            <a href="#" className="text-gray-500 hover:text-gray-400 cursor-not-allowed">
              About
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 cursor-not-allowed">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-600">
            &copy; {currentYear} Athlos Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;