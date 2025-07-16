import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules"; import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"
import hero3 from "../assets/hero3.png"
import ladyImg from "../assets/lady.png"
import card2 from "../assets/card1.png"
import Box from "../assets/Rectangle 505.png"
import bgBox from "../assets/Group 156.png"
import workImg from "../assets/works.png"
import doctorIcon from "../assets/Group 26.png"
import graphIcon from "../assets/Group 33.png"
import { MdOutlineArrowOutward } from "react-icons/md";

import { NewsContent, SolutionData, Stats } from '../Options'
const Hero = () => {
    return (
        <div>
            <div className="relative px-4 md:px-10 pb-4 mt-10 space-y-8">

                {/* First Section */}
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg">
                    <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-blue-600 opacity-60 mix-blend-multiply z-10"></div>
                        <img src={hero2} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-start px-8 z-10">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">
                            Stop Mothers from Dying
                        </h2>
                    </div>
                </div>

                {/* Second Section */}
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg flex items-center">
                    <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-blue-600 opacity-60 mix-blend-multiply z-10"></div>
                        <img src={hero3} className="absolute inset-0 w-[100%] h-[100%] object-cover left-0 opacity-40 z-0" alt="" />
                    </div>
                    <div className="relative z-10 pl-8 max-w-2xl">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Maternal & Newborn Health For All</h2>
                        <p className="text-white mt-3 text-sm md:text-base">
                            Together, we can reduce maternal and neonatal mortality through training, partnership, and compassion.
                        </p>
                        <button className="cursor-pointer mt-4 px-5 py-3 bg-white text-blue-600 font-medium rounded-xl transition transform hover:bg-blue-50 hover:text-blue-800 hover:shadow-md hover:scale-105">
                            Join the Alliance
                        </button>

                    </div>
                </div>

                {/* lady Image  */}
                <div className="absolute right-0 bottom-12 z-20 hidden md:block">
                    <img src={ladyImg} alt="lady" className="w-120 object-cover" />
                </div>
            </div>

            {/* website stats */}
            <div className='mt-10 px-10 flex gap-4 justify-center items-center'>
                {Stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col px-6 py-8 items-center rounded-2xl shadow-md min-w-[180px] ${idx % 2 === 0
                            ? 'bg-[rgba(58,144,202,0.17)] text-blue-900'
                            : 'bg-[rgba(0,85,149,1)] text-white'
                            }`}
                    >
                        <div className='text-3xl font-bold'>{stat.count}</div>
                        <div className='text-md mt-1'>{stat.topic}</div>
                    </div>
                ))}
            </div>

            <div className='mt-10 flex px-10 justify-between gap-10 '>
                <div className='bg-[rgba(0,85,149,1)] px-10 py-5 rounded-4xl flex-1/2'>
                    <h2 className='text-white text-4xl mb-3 font-semibold'>Technical Networking Expert Alliance (T.E.N.A.)</h2>
                    <p className='text-xl text-gray-400'>A resource for an evidence-based template of Action through structured vocational training for heightened impact and extended reach. </p>
                    <h3 className='text-white mt-5 font-semibold text-3xl mb-5'>What is it? </h3>
                    <p className='text-white text-lg mb-5'>It is an alliance of Rotarians, Rotaractors (in Clubs, Districts, Fellowships and Action Groups), Health care professionals, global organisations, NGOs and activists united in action for the elimination of preventable maternal and child mortality.</p>
                    <button
  className="flex gap-2 mt-5 items-center rounded-4xl bg-[rgba(181,214,235,0.58)] px-3 py-6 cursor-pointer 
             hover:bg-[rgba(181,214,235,0.8)] transition-colors duration-300"
>
  <h3 className="text-xl text-white flex items-center gap-2 cursor-pointer">
    Learn more <MdOutlineArrowOutward />
  </h3>
</button>

                </div>

                <div className='flex  gap-4 flex-1/2  '>
                    <div className='bg-[rgba(58,144,202,0.17)] rounded-4xl py-12 px-10'>
                        <h2 className='font-bold text-3xl text-[rgba(0,85,149,1)]'>Would you like to know more about the calmed</h2>
                        <button className='px-5 py-2 bg-[rgba(0,85,149,1)] rounded-xl mt-5 text-white cursor-pointer'>Calmed Explanatory Documents!</button>
                    </div>
                    <div className='rounded-2xl'>
                        <img src={card2} alt="" />
                    </div>
                </div>
            </div>

            {/* the solution page */}
            <div className='flex items-center gap-10 px-10 mt-10'>
                <div>
                    <h3 className='text-7xl font-bold text-[rgba(0,85,149,1)]'>The Solution</h3>
                    <p className='text-3xl mt-10 text-[#005495e8]'>Collaborative action needed at all levels to achieve universal health coverage.</p>
                </div>
                <div className=' grid grid-cols-2  gap-8 '>
                    {SolutionData.map((value, idx) => (
                        <div key={idx} className='shadow-lg py-10 px-14 flex items-center text-center flex-col'>
                            <img src={`${value.icon}`} alt="icon" />
                            <h3 className='text-2xl font-bold mt-3 mb-2'>{value.heading}</h3>
                            <p className='text-sm text-gray-500'>{value.content}</p>
                        </div>
                    ))

                    }
                </div>
            </div>

            {/* mission Section */}
            <div className='flex justify-center items-center gap-10 mt-15 px-10'>
                <div className='flex flex-col justify-center items-center px-13 py-15 w-110 text-center rounded-3xl bg-[rgba(58,144,202,0.17)]'>
                    <img src={doctorIcon} alt="" />
                    <h3 className='text-3xl font-semibold mt-5 mb-10 text-[#005495e8]'>Training More Healthcare Workers</h3>
                    <p className='text-xl'>Expanding the number of skilled doctors, nurses, and midwives through structured programs.</p>
                </div>
                <div className='flex flex-col justify-center items-center px-13 py-15 w-110 text-center rounded-3xl bg-[rgba(58,144,202,0.17)]'>
                    <img src={graphIcon} alt="" />
                    <h3 className='text-3xl font-semibold mt-5 mb-10 text-[#005495e8]'>Community Mobilization</h3>
                    <p className='text-xl'>Raising awareness around maternal health, family planning, and women’s wellness.</p>
                </div>
                <div className='flex flex-col justify-center text-center items-center'>
                    <h1 className='text-7xl mt-5 mb-10 font-bold text-[rgba(0,85,149,1)]'>Our Mission</h1>
                    <h3 className='text-4xl text-[#135f99e8] font-semibold'>Universal Health coverage (UHC)</h3>
                </div>

            </div>


            {/* key weapon section */}
            <div className="relative px-10 py-10 flex gap-6 justify-center items-stretch overflow-hidden mt-15 flex-wrap">
                {/* Left Card */}
                <div className="relative w-full md:w-[45%] rounded-xl overflow-hidden shadow-lg text-white">
                    <div className="relative z-10 p-6 space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-white">Stop Mothers Dying!</h2>
                        <p className="text-sm font-semibold text-white">
                            Empowering communities through structured training.
                        </p>
                        <p className="text-sm text-white">
                            Approx. 300,000 women and 3 million babies die each year due to complications during pregnancy and childbirth — especially in developing regions of SE Asia and Africa. 90% of these deaths are preventable.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                            <div>
                                <p className="font-bold text-white mb-1">The Problem:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Delays in accessing emergency care</li>
                                    <li>Lack of trained professionals</li>
                                    <li>Low awareness in communities</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-bold text-white mb-1">The Solution:</p>
                                <p>
                                    Structured, fast-track training to empower frontline healthcare — a low-cost, high-impact strategy that saves lives.
                                </p>
                            </div>
                        </div>
                        <p className="text-white text-sm pt-3">
                            Empowerment through education is our key weapon.
                        </p>
                    </div>
                    <div className='absolute'>
                        <img src={Box} className='z-100 opacity-60' alt="" />
                    </div>
                </div>

                {/* Right Card */}
                <div className="relative w-full md:w-[45%] rounded-xl overflow-hidden shadow-lg text-white">
                    {/* <img src={bgBox} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-70" /> */}
                    <div className="relative z-10 p-6 space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-white">CALMED Rotary in Meghalaya, India</h2>
                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li>
                                Our strategy: “Train-the-trainer” programs to scale maternity care capacity.
                            </li>
                            <li>
                                The latest phase: Funded by Rotary Foundation Grant (GG 19883SS)
                            </li>
                            <li>UK Rotarians visited Meghalaya sites pre-COVID</li>
                            <li>Continued via teleconferencing & remote planning</li>
                        </ul>

                    <div className="flex gap-x-4 pt-7">
    <button className="bg-white text-blue-800 px-2 py-2 rounded-lg font-semibold text-sm border border-blue-800 hover:shadow-md transition cursor-pointer">
        Shillong VTT Previsit Report
    </button>
    <button className="bg-white text-blue-800 px-2 py-2 rounded-lg font-semibold text-sm border border-blue-800 hover:shadow-md transition cursor-pointer">
        Watch Amsterdam Update Video
    </button>
</div>


                    </div>
                </div>
                <div>
                    <img src={bgBox} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-80 overflow-hidden" />

                </div>

            </div>
            {/* work section */}
            <div className='mt-15 px-10 flex items-center gap-7'>
                <div className='flex-1/2'>
                    <img src={workImg} alt="img" />
                </div>
                <div className='contain px-10 py-4 rounded-4xl bg-[rgba(58,144,202,0.17)] flex-1/2  inline-block '>
                    <h3 className='text-3xl font-bold mb-7'>Does it Work?</h3>
                    <p className=' text-lg'>The CALMED programme training components are evidence-based, aimed at a sustainable increase in the number of skilled professionals and community empowerment. Subsequent Pilot evaluation (in Sikkim and Gujarat, India) validated the CALMED structured training programme, as a low-cost high impact, modular programme. </p>
                    <p className='mt-5 text-lg'>The modules can be adjusted to the local needs and priorities in maternal and new-born mortality reduction, following the core principles of CALMED programme. </p>
                </div>

            </div>

            {/* news section */}
            <div className="mt-20 px-10">
                <div className="mb-8">
                    <h3 className="text-5xl font-bold text-blue-900 mb-7">Latest News</h3>
                    <p className="text-[rgba(0,85,149,1)] text-xl ">
                        Stay informed with updates, events, and highlights from Calmed programme.
                    </p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Pagination]}
                    className="py-5"
                >
                    {NewsContent.map((value, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className={`rounded-[2rem] overflow-hidden shadow-lg w-full ${idx % 2 === 0
                                    ? "bg-[rgba(58,144,202,0.17)] text-[rgba(0,85,149,1)]"
                                    : "bg-[rgba(0,85,149,1)] text-white"
                                    }`}
                            >
                                <div className="w-full h-48">
                                    <img
                                        src={value.image}
                                        alt={value.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="px-6 py-5">
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p
                                        className={`text-sm mb-4 ${idx % 2 === 0 ? "text-black" : "text-white"
                                            }`}
                                    >
                                        {value.content}
                                    </p>
                                    <button className="bg-amber-50 text-black text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition transform hover:bg-amber-100 hover:scale-105 hover:text-amber-900">
                                        Read More →
                                    </button>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='mt-20 text-center flex flex-col items-center justify-center gap-5'>
                <h1 className='text-4xl text-[rgba(0,85,149,1)] font-bold'>Ready to make a difference ?</h1>
                <h3 className='mt-7 text-2xl text-blue-800  w-256 '>Join hands with us to reduce maternal and newborn mortality through training, compassion, and global collaboration.</h3>
            </div>

        </div>
    )
}

export default Hero
