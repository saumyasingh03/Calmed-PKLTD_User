import React, { useState } from 'react';
import hero1 from "../assets/hero1.png";
import aboutBanner from "../assets/aboutBg.png";
import MemIng from "../assets/memberImg.png";
import { Missions, Partners } from '../Options';
import familyIcon from "../assets/familyIcon.png";
import carIcon from "../assets/carIcon.png";
import heartIcon from "../assets/healthIcon.png";
import crowdBg from "../assets/crowdImg.png";
import locationIcon from "../assets/location.jpeg";
import { useNavigate } from 'react-router-dom';

const About = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    
const navigate = useNavigate();

    return (
        <div className='px-4 sm:px-6 lg:px-10'>
            {/* Hero Banner */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg mb-10">
                <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Hero" />
                <div className="absolute inset-0 bg-[#005595] opacity-60 mix-blend-multiply z-10"></div>
                <img src={aboutBanner} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="Banner" />
                <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center text-center text-white px-4 z-10">
                    <h2 className="text-2xl md:text-4xl font-bold">Stop Mothers from Dying</h2>
                    <h3 className="text-base md:text-lg">Through Education, Training & Compassionate Action</h3>
<button
  className='bg-white text-[#005595] px-4 py-2 rounded-lg mt-2 font-medium hover:bg-blue-100 transition cursor-pointer'
  onClick={() => navigate('/contact')}
>
  Join Us
</button>
                </div>
            </div>

            {/* About Section */}
            <div className='mt-10 flex flex-col lg:flex-row justify-between items-center gap-8'>
                <div className='bg-[rgba(0,85,149,1)] p-6 rounded-3xl text-white flex-1 w-full'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>About Calmed</h2>
                    <ol className='text-lg list-disc list-inside space-y-2'>
                        <li>Rotary-backed Global Grant Programme</li>
                        <li>Trains doctors, midwives, and ASHAs in remote Indian states</li>
                        <li>Focus on emergency obstetric care</li>
                        <li>Proven impact in Sikkim, Bhuj, and soon Meghalaya</li>
                    </ol>
                </div>
                <div className='w-full max-w-xs md:max-w-md'>
                    <img src={MemIng} alt="Team Member" className='w-full h-auto rounded-xl' />
                </div>
            </div>

            {/* Mission Timeline */}
            <div className="mt-20">
                <h2 className="text-[#005595] font-bold text-3xl sm:text-4xl text-center sm:text-left mb-10">
                    Timeline of Calmed Missions
                </h2>

                <div className="space-y-8">
                    {Missions.map((mission, idx) => (
                        <div key={idx} className="bg-blue-100 rounded-xl shadow-md overflow-hidden">
                            {/* Collapsed Summary */}
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer p-6 gap-4"
                                onClick={() => toggleDropdown(idx)}
                            >
                                {/* Left Side: Icon and Mission */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                                    <div className="bg-[#005595] text-white px-4 py-2 rounded-lg flex items-center gap-3 min-w-[180px]">
                                        <img src={locationIcon} alt="icon" className="h-10 w-10 object-contain" />
                                        <div>
                                            <h3 className="font-semibold text-lg sm:text-xl leading-tight">{mission.name}</h3>
                                            <p className="text-sm">{mission.duration}</p>
                                        </div>
                                    </div>

                                    {/* Short Content Preview */}
                                    <p className="text-sm sm:text-base text-black font-medium sm:ml-2 sm:mt-0 mt-2">
                                        {mission.content.slice(0, 100)}...
                                    </p>
                                </div>

                                {/* Toggle Arrow */}
                                <button className="text-lg text-[#005595] font-bold sm:self-start">
                                    {openIndex === idx ? '▲' : '▼'}
                                </button>
                            </div>

                            {/* Expanded Content */}
                            {openIndex === idx && (
                                <div className="border-t border-blue-200 px-6 pb-6 pt-4 flex flex-col lg:flex-row gap-6 items-center">
                                    <div className="text-gray-700 text-base leading-relaxed flex-1">
                                        {mission.content}
                                    </div>
                                    {mission.imgUrl && (
                                        <img
                                            src={mission.imgUrl}
                                            alt="Mission"
                                            className="w-full max-w-sm h-60 rounded-xl object-cover"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {/* Approach Section */}
            <div className='mt-20'>
                <h3 className='font-bold text-[#005595] text-2xl sm:text-3xl md:text-4xl mb-5'>The Calmed Approach</h3>
                <p className='text-base sm:text-lg text-[#0c67ad] mb-10'>
                    Our teams address the three delays that cause unnecessary maternal deaths with simple, low-tech solutions.
                </p>
                <div className='flex flex-col md:flex-row justify-center items-stretch gap-6'>
                    {[familyIcon, carIcon, heartIcon].map((icon, i) => {
                        const titles = [
                            "Delay in Recognising Emergency Problems",
                            "Delay in Reaching Medical Institutions",
                            "Delay in Receiving Treatment"
                        ];
                        const desc = [
                            "Mothers in rural villages may not recognize life-threatening complications during pregnancy or childbirth.",
                            "Delays in transportation to medical facilities, especially in remote areas with poor access.",
                            "Even at hospitals, a lack of skilled staff can delay critical emergency care."
                        ];
                        return (
                            <div key={i} className='flex-1 text-center p-6 bg-[rgba(58,144,202,0.17)] rounded-2xl'>
                                <img src={icon} alt="icon" className='mx-auto h-16 w-16 object-contain' />
                                <h3 className='text-xl md:text-2xl font-bold text-[#005495e8] mt-4 mb-3'>{titles[i]}</h3>
                                <p className='text-sm sm:text-base font-medium'>{desc[i]}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Partners Section */}
            <div className="mt-16 pb-10">
                <h2 className="font-bold text-[#005595] text-2xl sm:text-3xl lg:text-4xl text-center mb-8">
                    Our Partners
                </h2>
                <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-50 to-white rounded-2xl py-6 shadow-inner">
                    <div className="flex animate-scroll gap-8 w-max">
                        {[...Partners, ...Partners].map((logo, idx) => (
                            <img
                                src={logo.logo}
                                alt="Partner"
                                key={idx}
                                className="h-10 sm:h-14 lg:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Animation */}
            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

            {/* How it Works */}
            <div className="mt-16">
                <h2 className="font-bold text-[#005595] text-2xl sm:text-3xl lg:text-4xl text-center mb-8">
                    How it Works?
                </h2>
                <div className="relative h-auto min-h-[300px] rounded-2xl overflow-hidden shadow-lg">
                    <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="" />
                    <div className="absolute inset-0 bg-[#005595] opacity-60 mix-blend-multiply z-10"></div>
                    <img src={crowdBg} className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" alt="" />
                    <div className="relative z-20 p-6 sm:p-10 text-white space-y-4 text-sm sm:text-base md:text-lg">
                        <p>
                            We educate medical staff in hospitals, ensure rapid transport access, and help rural families recognize
                            dangers early through training.
                        </p>
                        <p>
                            Our proven model involves expert UK gynecologists training local master trainers over four days, followed
                            by hands-on training with ASHAs and medical peers in remote areas.
                        </p>
                    </div>
                </div>
            </div>

            {/* Support Section */}
            <div className='mt-20 text-center flex flex-col items-center justify-center gap-5 px-4'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl text-[rgba(0,85,149,1)] font-bold'>
                    Want to support CALMED?
                </h1>
                <h3 className='text-base sm:text-lg md:text-2xl text-[#3699e5] max-w-2xl'>
                    Empowering ASHAs to educate mothers in rural villages — together, we can save lives.
                </h3>
                <button className='text-base sm:text-lg text-white mt-6 bg-[#256fa8] font-semibold px-6 sm:px-8 py-2 rounded-xl hover:bg-[#1f5c94] transition cursor-pointer' onClick={() => navigate('/contact')}>
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default About;
