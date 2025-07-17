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
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)

  useEffect(() => {
    // Delay swiper init after refs are set
    setSwiperReady(true)
  }, [])

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10  mx-auto">
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
            Knowledge is Care: Explore CALMED Resources
          </h2>
          <h3 className="text-white text-sm sm:text-base">
            Access documents, tools, and training designed to save lives               </h3>
        </div>
      </div>

      {/* Explanatory Documents */}
      <div className="mt-16 sm:mt-20 px-2 sm:px-4">
        <div className="relative flex items-center justify-center gap-2">
          <div className="z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-100 text-[#1976d2] w-10 h-10 rounded-full flex items-center justify-center shadow-md swiper-expl-prev">
            <ChevronLeft className="w-5 h-5" />
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-expl-next",
              prevEl: ".swiper-expl-prev",
            }}
            className="w-full"
          >
            {ExplanatoryDocs.map((value, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex items-center gap-4 bg-[#e1eff8] rounded-2xl shadow px-4 py-3 h-full">
                  <div className="bg-[#004785] p-3 rounded-2xl flex items-center justify-center">
                    <img src={value.icon} alt="icon" className="w-10 h-10 object-contain" />
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-[#004785] whitespace-nowrap">{value.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-100 text-[#1976d2] w-10 h-10 rounded-full flex items-center justify-center shadow-md swiper-expl-next">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Document Swiper (chunked 3 rows per slide) */}
      <div className="mt-16 sm:mt-20 px-2 sm:px-4">
        <div className="relative flex items-center justify-center gap-2">
          {/* Prev Button */}
          <div
            ref={prevRef}
            className="custom-swiper-prev z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-100 text-[#1976d2] w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </div>

          {swiperReady && (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (!swiper.params.navigation) return
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {chunkedDocuments.map((group, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col gap-4">
                    {group.map((doc, innerIdx) => (
                      <div
                        key={innerIdx}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,71,133,0.4)]"
                      >
                        <div className="text-[#004785] w-10 h-10 flex items-center justify-center">
                          {doc.icon}
                        </div>
                        <div className="text-sm font-semibold text-[#004785]">
                          {doc.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Next Button */}
          <div
            ref={nextRef}
            className="custom-swiper-next z-10 cursor-pointer bg-[#e1eff8] hover:bg-blue-100 text-[#1976d2] w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Other Resources */}
      <div className="mt-16 mb-10 px-2">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#004785] font-bold mb-10 text-center">
          Other Resources
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {ResourcesOpt.map((value, idx) => (
            <div
              key={idx}
              className="flex items-center w-full sm:w-auto gap-4 rounded-2xl bg-[#004785] shadow-md px-4 py-3"
            >
              <div className="bg-[#036cc7] p-3 sm:p-4 rounded-2xl flex items-center justify-center">
                <img
                  src={value.icon}
                  alt="icon"
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              </div>
              <p className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">
                {value.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <div className="mt-20 text-center flex flex-col items-center justify-center gap-5 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[rgba(0,85,149,1)] font-bold max-w-3xl">
          Take the Next Step in Supporting Maternal Health
        </h1>
        <h3 className="text-base sm:text-lg md:text-xl text-[#0564ad] max-w-2xl">
          Together, we can transform maternal care in underserved regions — through knowledge, action, and compassion.
        </h3>
        <button onClick={() => navigate('/contact')} className="text-base sm:text-lg text-white mt-6 bg-[#256fa8] font-semibold px-6 sm:px-8 py-3 rounded-xl hover:bg-[#1f5c94] transition cursor-pointer">
          Get in Touch
        </button>
      </div>
    </div>
  );
};

export default Resources;
