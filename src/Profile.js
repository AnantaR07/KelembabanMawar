import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="bg-gradient-to-br from-rose-100 via-rose-200 to-white min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4 animate-fadeIn">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-rose-200 transition-transform duration-300 hover:scale-105">
          {/* Foto Profil */}
          <img
            src="/barit.jpg"
            alt="Foto Diri"
            className="w-36 h-36 rounded-full mx-auto border-4 border-rose-300 shadow-md transform transition-transform duration-500 hover:scale-110"
          />

          {/* Biodata */}
          <h2 className="text-3xl font-serif font-bold text-rose-600 mt-6">
            Barit
          </h2>
          <p className="text-gray-700 text-sm mt-2">Umur: 25 Tahun</p>
          <p className="text-gray-700 text-sm">Alamat: Malang, Jawa Timur</p>
          <p className="text-gray-700 text-sm">Profesi: Web Developer</p>
          <p className="text-gray-600 text-sm mt-4 italic">
            "Bersemangat tentang teknologi dan inovasi."
          </p>

          {/* Media Sosial */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="#"
              className="text-rose-500 hover:text-rose-700 text-2xl transition-transform hover:scale-125"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-rose-400 hover:text-rose-600 text-2xl transition-transform hover:scale-125"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-rose-600 hover:text-rose-800 text-2xl transition-transform hover:scale-125"
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

export default Profile;
