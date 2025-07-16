import React from 'react';
import { Facebook, Linkedin, Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { ImageArray } from '../Options';
import logoImg from "../assets/logo.png"

const Footer = () => {
  return (
    <div>
      {/* Full Width Image Gallery Section - No gaps, spans entire width */}
      <div className="w-full bg-white">
        <div className="flex items-end w-full">
          {ImageArray.map((val, idx) => (
            <div
              key={idx}
              className="flex-1 overflow-hidden rounded-t-2xl shadow-lg"
              style={{ minWidth: `${100 / ImageArray.length}%` }}
            >
              <img
                src={val.imgIcon}
                alt={`Gallery image ${idx + 1}`}
                className={`${val.height} w-full object-cover`}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#00457C] to-[#003461] text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12 py-12">
            
            {/* Logo & Description */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 space-y-4">
              <div className="flex items-center p-1 rounded-4xl border-b-2 space-x-2">
                  <img src={logoImg} alt="" />
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Saving Mothers & Babies – Together
              </p>
              <p className="text-blue-200 text-xs leading-relaxed">
                Committed to improving maternal and child health outcomes through innovative healthcare solutions and community support.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white border-b border-blue-400 pb-2">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  'About CALMED',
                  'Join T.E.N.A',
                  'Resources & Training',
                  'Gallery',
                  'Contact',
                  'Donate'
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block transform">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white border-b border-blue-400 pb-2">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">+44 (0) 1474 822294</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">calmedrotary@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">United Kingdom</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white border-b border-blue-400 pb-2">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600' },
                  { icon: Linkedin, color: 'hover:bg-blue-700' },
                  { icon: Instagram, color: 'hover:bg-pink-600' },
                  { icon: MessageCircle, color: 'hover:bg-green-600' }
              ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${social.color} backdrop-blur-sm`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 space-y-4">
              <h3 className="font-bold text-lg text-white border-b border-blue-400 pb-2">Newsletter</h3>
              <p className="text-blue-200 text-sm">Stay updated with our latest news and events</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-blue-200 text-sm">
                  © 2025 CALMED Rotary | All Rights Reserved
                </p>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-blue-200 hover:text-white transition-colors underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors underline">
                  Terms of Use
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
      </footer>
    </div>
  );
};

export default Footer;