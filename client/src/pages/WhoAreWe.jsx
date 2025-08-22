// import React from 'react'
// import BannerImg from "../assets/knowMoreBanner.png"
// import hero1 from "../assets/hero1.png"
// import { CardsData } from '../Options'
// import Cards from '../components/Cards'
// import { useNavigate } from 'react-router-dom';

// const KnowMore = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="px-4 sm:px-6 md:px-10">

//       {/* Banner Section */}
//       <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg mt-10">
//         <img src={BannerImg} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Banner" />
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,85,149,0.5),rgba(0,85,149,0.5))] opacity-60 mix-blend-multiply z-10"></div>
//           <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-70 z-0" alt="Overlay" />
//         </div>
//         <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-center px-4 z-10">
//           <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
//             Meet the People Behind CALMED
//           </h2>
//           <p className="text-white text-sm sm:text-base md:text-xl max-w-3xl">
//             United by compassion. Driven by science. Working to save mothers and babies worldwide.
//           </p>
//         </div>
//       </div>

//       {/* Team Section */}
//       <section className="my-20">
//         <h3 className="text-[#005595] text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-10 mb-16 leading-relaxed">
//           Our team brings together global leaders in obstetrics, public health, and humanitarian medicine, committed to lowering maternal and newborn deaths through sustainable training and action.
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 px-2 sm:px-10">
//           {CardsData.map((data, idx) => (
//             <Cards CardData={data} key={idx} />
//           ))}
//         </div>
//       </section>

//       {/* Support Section */}
//       <div className="mt-20 text-center flex flex-col items-center justify-center gap-5 mb-16 px-4">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl text-[rgba(0,85,149,1)] font-bold">
//           Be a Part of the Team That Saves Lives
//         </h1>
//         <h3 className="text-base sm:text-lg md:text-2xl text-[#0564ad] max-w-2xl">
//           Join hands with our global experts and community leaders to make maternal and newborn care accessible to all.
//         </h3>
//         <button onClick={() => navigate('/contact')} className="text-lg sm:text-xl text-white mt-6 bg-[#256fa8] font-semibold px-6 sm:px-8 py-2 rounded-xl hover:bg-[#1f5c94] transition cursor-pointer">
//           Join Us
//         </button>
//       </div>

//     </div>
//   )
// }

// export default KnowMore



import React, { useEffect, useState } from 'react';

import BannerImg from "../assets/knowMoreBanner.png";
import hero1 from "../assets/hero1.png";
import Cards from '../components/Cards';
import { useNavigate } from 'react-router-dom';

const KnowMore = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
  fetch('/api/team-members')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => setMembers(data))
    .catch(err => console.error('Error fetching:', err));
}, []);



  return (
    <div className="px-4 sm:px-6 md:px-10">

      {/* Banner Section */}
      <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg mt-10">
        <img src={BannerImg} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Banner" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,85,149,0.5),rgba(0,85,149,0.5))] opacity-60 mix-blend-multiply z-10"></div>
          <img src={hero1} className="absolute inset-0 w-full h-full object-cover opacity-70 z-0" alt="Overlay" />
        </div>
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-center px-4 z-10">
          <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Meet the People Behind CALMED
          </h2>
          <p className="text-white text-sm sm:text-base md:text-xl max-w-3xl">
            United by compassion. Driven by science. Working to save mothers and babies worldwide.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <section className="my-20">
        <h3 className="text-[#005595] text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-10 mb-16 leading-relaxed">
          Our team brings together global leaders in obstetrics, public health, and humanitarian medicine, committed to lowering maternal and newborn deaths through sustainable training and action.
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 px-2 sm:px-10">
          {members.map((data, idx) => (
            <Cards CardData={data} key={idx} />
          ))}
        </div>
      </section>

      {/* Support Section */}
      <div className="mt-20 text-center flex flex-col items-center justify-center gap-5 mb-16 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[rgba(0,85,149,1)] font-bold">
          Be a Part of the Team That Saves Lives
        </h1>
        <h3 className="text-base sm:text-lg md:text-2xl text-[#0564ad] max-w-2xl">
          Join hands with our global experts and community leaders to make maternal and newborn care accessible to all.
        </h3>
        <button onClick={() => navigate('/contact')} className="text-lg sm:text-xl text-white mt-6 bg-[#256fa8] font-semibold px-6 sm:px-8 py-2 rounded-xl hover:bg-[#1f5c94] transition cursor-pointer">
          Join Us
        </button>
      </div>

    </div>
  );
};

export default KnowMore;
