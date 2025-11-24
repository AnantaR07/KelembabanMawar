import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="bg-gradient-to-br from-rose-100 via-rose-200 to-white min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4 animate-fadeIn">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl border border-rose-200 transition-transform duration-300 hover:scale-105">
          <h2 className="text-4xl font-serif font-bold text-rose-600 mb-8">
            🌹 Hubungi Kami
          </h2>

          {/* Alamat */}
          <div className="flex items-center text-gray-700 mb-6">
            <FaMapMarkerAlt className="text-rose-500 text-2xl mr-4" />
            <p className="text-lg">Malang, Jawa Timur</p>
          </div>

          {/* Telepon */}
          <div className="flex items-center text-gray-700 mb-6">
            <FaPhone className="text-rose-500 text-2xl mr-4" />
            <p className="text-lg">+62 858-5451-3059</p>
          </div>

          {/* Email */}
          <div className="flex items-center text-gray-700 mb-8">
            <FaEnvelope className="text-rose-500 text-2xl mr-4" />
            <p className="text-lg">info@website.com</p>
          </div>

          {/* Media Sosial */}
          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="#"
              className="text-rose-500 hover:text-rose-700 text-3xl transition-transform transform hover:scale-125"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-rose-400 hover:text-rose-600 text-3xl transition-transform transform hover:scale-125"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-rose-600 hover:text-rose-800 text-3xl transition-transform transform hover:scale-125"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactInfo;
