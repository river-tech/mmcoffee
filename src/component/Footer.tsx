import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo và giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold">Booking</h2>
          <p className="mt-3 text-gray-400">
            Your trusted platform for connecting hosts and guests worldwide.
            Find your perfect stay or start earning by hosting.
          </p>
        </div>

        {/* Thông tin liên hệ */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-end gap-3">
              <FaMapLocation />
              VietNam
            </li>
            <li className="flex items-end gap-3">
              <FaPhone /> +84 903 536 212
            </li>
            <li className="flex items-end gap-3">
              <FaEnvelope />
              nguyenha1702205@gmail.com
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#678fe6] transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6099f0] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6d283f] transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="mt-10 text-center text-white border-t border-gray-700 pt-5">
        © 2025 Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
