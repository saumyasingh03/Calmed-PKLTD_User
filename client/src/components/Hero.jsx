import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"
import hero3 from "../assets/hero3.png"
import ladyImg from "../assets/lady.png"
import card2 from "../assets/card1.png"
import bgBox from "../assets/Group 156.png"
import workImg from "../assets/works.png"
import doctorIcon from "../assets/Group 26.png"
import graphIcon from "../assets/Group 33.png"
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { NewsContent, SolutionData, Stats } from '../Options'

const Hero = () => {
    const navigate = useNavigate();
    return (
        // Set a base padding for mobile and increase for larger screens
        <div className="space-y-16 md:space-y-24">

            {/* --- Hero Section --- */}
            <div className="px-4 md:px-10 mt-10 space-y-8">
                {/* First Banner */}
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg">

                    <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />

                    <div className="absolute inset-0 bg-[#004785] opacity-60 mix-blend-multiply z-10"></div>

                    <img src={hero2} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />

                    <div className="absolute inset-0 flex items-center justify-start px-8 z-10">

                        <h2 className="text-white text-3xl md:text-5xl font-bold">Stop Mothers from Dying</h2>

                    </div>

                </div>



                {/* Second Section */}

                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg flex items-center">

                    <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />

                    <div className="absolute inset-0 bg-[#004785] opacity-60 mix-blend-multiply z-10"></div>

                    <img src={hero3} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />

                    <div className="relative z-10 pl-8 max-w-2xl">

                        <h2 className="text-white text-3xl md:text-5xl font-bold">Maternal & Newborn Health For All</h2>

                        <p className="text-white mt-3 text-sm md:text-base">

                            Together, we can reduce maternal and neonatal mortality through training, partnership, and compassion.

                        </p>

                        <button

                            onClick={() => navigate('/contact')}

                            className="mt-4 px-5 py-3 bg-white text-blue-600 font-medium rounded-xl cursor-pointer">

                            Join the Alliance

                        </button>

                    </div>

                </div>



                <div className="absolute right-0 bottom-6 z-20 hidden md:block">

                    <img src={ladyImg} alt="lady" className="w-120 object-cover" />

                </div>

            </div>

            <hr />

            {/* --- Stats Section --- */}
            <div className='px-4 md:px-10'>
                {/* Use flex-wrap to allow items to wrap onto the next line on small screens */}
                <div className='flex flex-wrap gap-4 justify-center'>
                    {Stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col flex-1 text-center min-w-[200px] max-w-[250px] px-6 py-8 items-center rounded-2xl shadow-md ${idx % 2 === 0
                                ? 'bg-[rgba(58,144,202,0.17)] text-blue-900'
                                : 'bg-[rgba(0,85,149,1)] text-white'
                                }`}
                        >
                            <div className='text-3xl font-bold'>{stat.count}</div>
                            <div className='text-md mt-1'>{stat.topic}</div>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            {/* --- About Alliance Section --- */}
            <div className='px-4 md:px-10 flex flex-col lg:flex-row gap-8'>
                {/* Stack columns vertically on mobile, horizontally on large screens */}
                <div className='bg-[rgba(0,85,149,1)] p-6 md:p-10 rounded-3xl w-full lg:w-1/2'>
                    <h2 className='text-white text-3xl md:text-4xl mb-3 font-semibold'>Technical Networking Expert Alliance (T.E.N.A.)</h2>
                    <p className='text-lg md:text-xl text-gray-300'>A resource for an evidence-based template of Action through structured vocational training for heightened impact and extended reach.</p>
                    <h3 className='text-white mt-8 font-semibold text-2xl md:text-3xl mb-5'>What is it?</h3>
                    <p className='text-white text-base md:text-lg mb-5'>It is an alliance of Rotarians, Rotaractors, Health care professionals, global organisations, NGOs and activists united in action for the elimination of preventable maternal and child mortality.</p>
                    <button className='flex gap-2 mt-5 items-center rounded-xl bg-[rgba(181,214,235,0.58)] px-5 py-4'>
                        <h3 className='text-lg text-white flex items-center gap-2'>Learn more<MdOutlineArrowOutward /></h3>
                    </button>
                </div>

                <div className='flex flex-col gap-8 w-full lg:w-1/2'>
                    <div className='bg-[rgba(58,144,202,0.17)] rounded-3xl p-6 md:p-10 flex-1 flex flex-col justify-center'>
                        <h2 className='font-bold text-2xl md:text-3xl text-[rgba(0,85,149,1)]'>Would you like to know more about the CALMED?</h2>
                        <button className='px-5 py-3 bg-[rgba(0,85,149,1)] rounded-xl mt-5 text-white self-start'>Calmed Explanatory Documents!</button>
                    </div>
                    <div className='rounded-2xl overflow-hidden'>
                        <img src={card2} alt="Healthcare professionals" className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>

            <hr />

            {/* --- The Solution Section --- */}
            <div className='flex flex-col lg:flex-row items-center gap-10 px-4 md:px-10'>
                <div className='w-full lg:w-1/3 text-center lg:text-left'>
                    {/* Responsive typography */}
                    <h3 className='text-5xl md:text-7xl font-bold text-[rgba(0,85,149,1)]'>The Solution</h3>
                    <p className='text-2xl md:text-3xl mt-6 text-[#005495e8]'>Collaborative action needed at all levels to achieve universal health coverage.</p>
                </div>
                {/* Responsive grid: 1 column on mobile, 2 on medium screens and up */}
                <div className='w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {SolutionData.map((value, idx) => (
                        <div key={idx} className='shadow-lg py-10 px-8 flex items-center text-center flex-col rounded-2xl'>
                            <img src={`${value.icon}`} alt="icon" className='h-16 w-16' />
                            <h3 className='text-2xl font-bold mt-4 mb-2'>{value.heading}</h3>
                            <p className='text-sm text-gray-500'>{value.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            {/* --- Mission Section --- */}
            {/* Reordered for better mobile flow */}
            <div className='flex flex-col items-center gap-10 px-4 md:px-10'>
                <div className='text-center w-full lg:w-2/3'>
                    <h1 className='text-5xl md:text-7xl mb-4 font-bold text-[rgba(0,85,149,1)]'>Our Mission</h1>
                    <h3 className='text-3xl md:text-4xl text-[#135f99e8] font-semibold'>Universal Health Coverage (UHC)</h3>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full">
                    <div className='flex flex-col justify-start items-center p-8 w-full md:w-1/2 text-center rounded-3xl bg-[rgba(58,144,202,0.17)]'>
                        <img src={doctorIcon} alt="Doctor Icon" className='h-20 w-20' />
                        <h3 className='text-2xl md:text-3xl font-semibold my-5 text-[#005495e8]'>Training More Healthcare Workers</h3>
                        <p className='text-lg md:text-xl'>Expanding the number of skilled doctors, nurses, and midwives through structured programs.</p>
                    </div>
                    <div className='flex flex-col justify-start items-center p-8 w-full md:w-1/2 text-center rounded-3xl bg-[rgba(58,144,202,0.17)]'>
                        <img src={graphIcon} alt="Graph Icon" className='h-20 w-20' />
                        <h3 className='text-2xl md:text-3xl font-semibold my-5 text-[#005495e8]'>Community Mobilization</h3>
                        <p className='text-lg md:text-xl'>Raising awareness around maternal health, family planning, and women’s wellness.</p>
                    </div>
                </div>
            </div>

            <hr />

            {/* --- Key Weapon Section --- */}
            <div className="relative px-4 md:px-10 py-10">
                {/* Background Image - positioned behind content */}
                <img src={bgBox} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-80 -z-10 rounded-3xl" />
                <div className='flex flex-col lg:flex-row gap-8 justify-center items-stretch'>
                    {/* Left Card */}
                    <div className="w-full lg:w-1/2 rounded-2xl p-6 space-y-4 bg-black/20 backdrop-blur-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Stop Mothers Dying!</h2>
                        <p className="text-base font-semibold text-white">Empowering communities through structured training.</p>
                        <p className="text-sm text-white">Approx. 300,000 women and 3 million babies die each year due to complications during pregnancy and childbirth. 90% of these deaths are preventable.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
                            <div>
                                <p className="font-bold text-white mb-1">The Problem:</p>
                                <ul className="list-disc list-inside space-y-1 text-white">
                                    <li>Delays in accessing emergency care</li>
                                    <li>Lack of trained professionals</li>
                                    <li>Low awareness in communities</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-bold text-white mb-1">The Solution:</p>
                                <p className='text-white'>Structured, fast-track training to empower frontline healthcare — a low-cost, high-impact strategy that saves lives.</p>
                            </div>
                        </div>
                        <p className="text-white text-sm pt-3">Empowerment through education is our key weapon.</p>
                    </div>

                    {/* Right Card */}
                    <div className="w-full lg:w-1/2 rounded-2xl p-6 space-y-4 bg-black/20 backdrop-blur-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">CALMED Rotary in Meghalaya, India</h2>
                        <ul className="list-disc list-inside text-base space-y-2 text-white">
                            <li>Our strategy: “Train-the-trainer” programs to scale maternity care capacity.</li>
                            <li>The latest phase: Funded by Rotary Foundation Grant (GG 19883SS)</li>
                            <li>UK Rotarians visited Meghalaya sites pre-COVID</li>
                            <li>Continued via teleconferencing & remote planning</li>
                        </ul>
                        {/* Responsive buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <button className="bg-white text-blue-800 px-4 py-3 rounded-lg font-semibold text-xs cursor-pointer hover:bg-blue-100 transition w-full sm:w-auto">
                                Shillong VTT Previsit Report
                            </button>
                            <button className="bg-white text-blue-800 px-4 py-3 rounded-lg font-semibold text-xs cursor-pointer hover:bg-blue-100 transition w-full sm:w-auto">
                                Watch Amsterdam Update Video
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {/* --- Does it Work Section --- */}
            <div className='px-4 md:px-10 flex flex-col lg:flex-row items-center gap-10'>
                <div className='w-full lg:w-1/2'>
                    <img src={workImg} alt="Health workers in training" className='rounded-2xl w-full object-cover' />
                </div>
                <div className='w-full lg:w-1/2 p-6 md:p-10 rounded-3xl bg-[rgba(58,144,202,0.17)]'>
                    <h3 className='text-3xl font-bold mb-5 text-[rgba(0,85,149,1)]'>Does it Work?</h3>
                    <p className='text-lg'>The CALMED programme training components are evidence-based, aimed at a sustainable increase in the number of skilled professionals and community empowerment. Subsequent Pilot evaluation (in Sikkim and Gujarat, India) validated the CALMED structured training programme, as a low-cost high impact, modular programme.</p>
                    <p className='mt-5 text-lg'>The modules can be adjusted to the local needs and priorities in maternal and new-born mortality reduction, following the core principles of CALMED programme.</p>
                </div>
            </div>

            <hr />

            {/* --- Latest News Section --- */}
            {/* The Swiper component is already responsive via its breakpoints prop, which is great! */}
            <div className="px-4 md:px-10">
                <div className="mb-8 text-center md:text-left">
                    <h3 className="text-4xl md:text-5xl font-bold text-[#004785] mb-4">Latest News</h3>
                    <p className="text-[rgba(0,85,149,1)] text-lg md:text-xl">
                        Stay informed with updates, events, and highlights from the Calmed programme.
                    </p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    modules={[Pagination]}
                    className="py-5"
                >
                    {NewsContent.map((value, idx) => (
                        <SwiperSlide key={idx}>
                            <div className={`rounded-3xl overflow-hidden shadow-lg h-full flex flex-col ${idx % 2 === 0
                                ? "bg-[rgba(58,144,202,0.17)] text-[rgba(0,85,149,1)]"
                                : "bg-[rgba(0,85,149,1)] text-white"
                                }`}>
                                <div className="w-full h-48">
                                    <img src={value.image} alt={value.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className={`text-sm mb-4 flex-grow ${idx % 2 === 0 ? "text-black/70" : "text-white/80"}`}>
                                        {value.content}
                                    </p>
                                    <button className="bg-amber-50 text-black text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-100 transition self-start mt-auto">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <hr />

            {/* --- Final CTA Section --- */}
            <div className='mt-10 mb-20 px-4 md:px-10 text-center flex flex-col items-center justify-center gap-5'>
                {/* Responsive typography and max-width for readability */}
                <h1 className='text-3xl md:text-4xl text-[rgba(0,85,149,1)] font-bold'>Ready to make a difference?</h1>
                <h3 className='mt-4 text-xl md:text-2xl text-blue-800 max-w-4xl'>
                    Join hands with us to reduce maternal and newborn mortality through training, compassion, and global collaboration.
                </h3>
            </div>

        </div>
    )
}

export default Hero