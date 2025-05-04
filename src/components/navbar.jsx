import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-500 p-4 shadow-md h-24 flex items-center overflow-hidden">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Nama Brand */}
        <div className="flex items-center space-x-3 text-white font-bold">
          <img
            src="/mawar.png"
            alt="Logo"
            className="w-12 h-12 rounded-full object-contain"
          />
          <span className="text-xl tracking-wide">
            PENYIRAM TANAMAN OTOMATIS
          </span>
        </div>

        {/* Tombol Menu Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Navigasi di desktop */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/"
            className="text-white text-lg hover:text-yellow-300 transition duration-500 transform hover:scale-105"
          >
            Beranda
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg hover:text-yellow-300 transition duration-500 transform hover:scale-105"
          >
            Kontak
          </Link>
          <Link
            to="/profile"
            className="text-white text-lg hover:text-yellow-300 transition duration-500 transform hover:scale-105"
          >
            Profil
          </Link>
        </div>
      </div>

      {/* Dropdown Menu (Mobile) */}
      <div
        className={`lg:hidden bg-green-600 flex flex-col space-y-4 p-4 mt-4 absolute w-full left-0 top-20 z-10 transition-all duration-500 ease-in-out transform ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <Link
          to="/"
          className="text-white text-lg hover:text-yellow-300 transition duration-500 transform hover:scale-105"
          onClick={toggleMenu}
        >
          Beranda
        </Link>
        <Link
          to="/contact"
          className="text-white text-lg hover:text-yellow-300 transition duration-500 transform hover:scale-105"
          onClick={toggleMenu}
        >
          Kontak
        </Link>
        <Link
          to="/profile"
          className="text-white text-lg hover:text-yellow-300 transition duration-500 transform hover:scale-105"
          onClick={toggleMenu}
        >
          Profil
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
