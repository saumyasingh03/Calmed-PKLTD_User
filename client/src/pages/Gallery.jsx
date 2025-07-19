import React, { useState } from 'react';
import { galleryData } from '../Options';
import hero1 from '../assets/hero1.png';
import BannerImg from '../assets/galleryBanner.png';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="px-4 sm:px-6 lg:px-10 pt-10 pb-20 mx-auto">
            {/* Banner Section */}
            <div className="relative h-[220px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <img
                    src={hero1}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-[#004785] opacity-60 mix-blend-multiply z-10" />
                <img
                    src={BannerImg}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
                    alt="Overlay"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center z-20">
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
                        Stop Mothers from Dying
                    </h2>
                    <h3 className="text-white text-sm sm:text-base">
                        Through Education, Training & Compassionate Action
                    </h3>
                    <button onClick={() => navigate('/contact')} className="mt-4 bg-white text-[#256fa8] font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-blue-100 transition cursor-pointer">
                        Join Us
                    </button>
                </div>
            </div>
            <h2 className='flex items-center justify-center text-[#005595] text-6xl font-semibold py-8 mb-20'>Moments of Compassion</h2>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
                {galleryData.map((data, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedImage(data)}
                        className="group rounded-xl shadow-md flex flex-col overflow-hidden bg-white transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                    >
                        <img
                            src={data.photo}
                            className="object-cover w-full h-60 sm:h-72"
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
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-4xl w-full mx-auto bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        <img
                            src={selectedImage.photo}
                            alt={selectedImage.name}
                            className="w-full h-auto max-h-[75vh] object-contain bg-gray-100"
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
                            className="absolute top-3 right-3 bg-white/80 text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-white hover:text-blue-800 transition"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Support CTA */}
            <div className="mt-20 text-center flex flex-col items-center justify-center gap-5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-[rgba(0,85,149,1)] font-bold max-w-3xl">
                    Inspired by What You See?
                </h1>
                <h3 className="text-base md:text-xl text-[#0564ad] max-w-2xl">
                    Every training delivered, every mother empowered, and every life saved is made possible by people like you.
                </h3>
                <button
                    onClick={() => navigate('/contact')}
                    className="text-base sm:text-lg text-white mt-6 bg-[#256fa8] font-semibold px-8 py-3 rounded-xl hover:bg-[#1f5c94] transition cursor-pointer"
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default Gallery;