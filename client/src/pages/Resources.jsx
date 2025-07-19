import React, { useRef, useState, useEffect } from "react";
import hero1 from "../assets/hero1.png";
import BannerImg from "../assets/resourceBanner.png";
import { ExplanatoryDocs, ResourcesOpt, Documents } from "../Options";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

const Resources = () => {
    const chunkedDocuments = chunkArray(Documents, 3);
    const navigate = useNavigate();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);

    useEffect(() => {
        setSwiperReady(true);
    }, []);

    const swiperNavDisabledStyle = `
        .swiper-nav-disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    `;

    return (
        <div className="bg-white px-10">
            <style>{swiperNavDisabledStyle}</style>

            <div className=" pt-10 mx-auto">
                <div className="relative h-[200px] sm:h-[350px] md:h-[350px] rounded-3xl overflow-hidden shadow-lg">
                    <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Background" />
                    <div className="absolute inset-0 bg-[#004785] opacity-60 mix-blend-multiply z-10" />
                    <img src={BannerImg} className="absolute inset-0 w-full h-full object-cover opacity-70 z-0" alt="Overlay" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center z-20">
                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl">
                            Knowledge is Care
                        </h1>
                        <h2 className="text-white text-lg sm:text-xl">
                            Explore CALMED Resources, Documents & Tools
                        </h2>
                    </div>
                </div>
            </div>

            <section className="py-20 sm:py-24">
                <div className="container mx-auto px-4">
                    <div className="relative">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                nextEl: ".swiper-expl-next",
                                prevEl: ".swiper-expl-prev",
                                disabledClass: "swiper-nav-disabled",
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                            className="!p-4"
                        >
                            {ExplanatoryDocs.map((value, idx) => (
                                <SwiperSlide key={idx}>
                                    <a href={value.link || '#'} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 bg-[#e1eff8] rounded-2xl p-5 h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                        <div className="bg-[#004785] p-4 rounded-2xl flex-shrink-0">
                                            <img src={value.icon} alt="icon" className="w-12 h-8 object-contain" />
                                        </div>
                                        <p className="text-lg font-bold text-[#004785]">
                                            {value.name}
                                        </p>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-expl-prev absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-4 z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-200 text-[#1976d2] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <ChevronLeft className="w-8 h-8" />
                        </div>
                        <div className="swiper-expl-next absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-200 text-[#1976d2] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <ChevronRight className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="mt-24">
                         <h2 className="text-4xl md:text-5xl font-bold text-center text-[#004785] mb-16">
                            Our Document Library
                        </h2>
                        <div className="relative">
                            {swiperReady && (
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={40}
                                    slidesPerView={1}
                                    navigation={{
                                        prevEl: prevRef.current,
                                        nextEl: nextRef.current,
                                        disabledClass: "swiper-nav-disabled",
                                    }}
                                    onBeforeInit={(swiper) => {
                                        if (swiper.params.navigation) {
                                            swiper.params.navigation.prevEl = prevRef.current;
                                            swiper.params.navigation.nextEl = nextRef.current;
                                        }
                                    }}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                        1280: { slidesPerView: 3 },
                                    }}
                                >
                                    {chunkedDocuments.map((group, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="flex flex-col gap-6">
                                                {group.map((doc, innerIdx) => (
                                                    <a href={doc.link || '#'} target="_blank" rel="noopener noreferrer" key={innerIdx} className="group flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2">
                                                        <div className="flex-shrink-0 bg-blue-100 text-[#004785] w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:bg-[#004785] group-hover:text-white">
                                                            {React.cloneElement(doc.icon, { className: 'w-8 h-8' })}
                                                        </div>
                                                        <div className="text-lg font-bold text-gray-800 group-hover:text-[#004785]">
                                                            {doc.title}
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                            <div ref={prevRef} className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-6 z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-200 text-[#1976d2] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                <ChevronLeft className="w-8 h-8" />
                            </div>
                            <div ref={nextRef} className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-6 z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-200 text-[#1976d2] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                <ChevronRight className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="py-20 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-4xl md:text-5xl text-[#004785] font-bold mb-16 text-center">
                        Additional Tools & Links
                    </h3>
                    <div className="flex flex-wrap justify-center items-stretch gap-8">
                        {ResourcesOpt.map((value, idx) => (
                            <a href={value.link || '#'} target="_blank" rel="noopener noreferrer" key={idx} className="group flex items-center w-full max-w-md sm:w-auto flex-1 gap-5 rounded-2xl bg-[#004785] shadow-xl px-6 py-5 transition-transform duration-300 hover:scale-105">
                                <div className="bg-[#036cc7] p-4 rounded-2xl flex items-center justify-center">
                                    <img src={value.icon} alt="icon" className="w-14 h-14 object-contain" />
                                </div>
                                <p className="text-lg font-semibold text-white">
                                    {value.name}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white py-20 sm:py-24">
                 <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center gap-6">
                    <h2 className="text-4xl md:text-5xl text-[rgba(0,85,149,1)] font-bold max-w-4xl">
                        Take the Next Step in Supporting Maternal Health
                    </h2>
                    <p className="text-xl md:text-2xl text-[#0564ad] max-w-3xl">
                        Together, we can transform maternal care in underserved regions — through knowledge, action, and compassion.
                    </p>
                    <button onClick={() => navigate('/contact')} className="text-xl text-white mt-6 bg-[#256fa8] font-bold px-10 py-4 rounded-xl hover:bg-[#1f5c94] transition-colors duration-300 cursor-pointer shadow-lg hover:shadow-xl">
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Resources;