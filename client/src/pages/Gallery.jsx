import React, { useState } from 'react';
import { galleryData } from '../Options';
import hero1 from '../assets/hero1.png';
import BannerImg from '../assets/galleryBanner.png';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="px-4 sm:px-6 md:px-10 pt-10  mx-auto">
      {/* Banner Section */}
      <div className="relative h-[220px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={hero1}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt="Background"
        />
        <div className="absolute inset-0 bg-blue-600 opacity-60 mix-blend-multiply z-10" />
        <img
          src={BannerImg}
          className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
          alt="Overlay"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center z-20">
          <h2 className="text-white text-xl sm:text-3xl md:text-5xl font-bold">
            Stop Mothers from Dying
          </h2>
          <h3 className="text-white text-sm sm:text-base">
            Through Education, Training & Compassionate Action
          </h3>
          <button onClick={() => navigate('/contact')} className="mt-2 bg-white text-[#256fa8] font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-100 transition cursor-pointer" >
            Join Us
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 px-10">
  {galleryData.map((data, idx) => (
    <div
      key={idx}
      className="rounded-xl shadow-md flex flex-col overflow-hidden bg-white transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
    >
      <img
        src={data.photo}
        className="object-cover w-full h-48 sm:h-56 md:h-64"
        alt={data.name}
      />
      <h3 className="text-center text-base sm:text-lg font-semibold py-4 px-2 text-gray-800 group-hover:text-blue-600 transition-colors">
        {data.name}
      </h3>
    </div>
  ))}
</div>


      {/* Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-blue-50 bg-opacity-10 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full mx-4 bg-white rounded-xl overflow-hidden shadow-xl">
            <img
              src={selectedImage.photo}
              alt={selectedImage.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-blue-900 mb-2">
                {selectedImage.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {selectedImage.description || 'No description available for this image.'}
              </p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-blue-800 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-blue-50"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Support CTA */}
      <div className="mt-20 text-center flex flex-col items-center justify-center gap-5 mb-10 px-10">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-[rgba(0,85,149,1)] font-bold max-w-3xl">
          Inspired by What You See?
        </h1>
        <h3 className="text-sm sm:text-base md:text-xl text-[#0564ad] max-w-2xl">
          Every training delivered, every mother empowered, and every life saved is made possible by people like you.
        </h3>
        <button
          onClick={() => navigate('/contact')}
          className="text-sm sm:text-lg text-white mt-6 bg-[#256fa8] font-semibold px-6 sm:px-8 py-2 rounded-xl hover:bg-[#1f5c94] transition cursor-pointer"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Gallery;
