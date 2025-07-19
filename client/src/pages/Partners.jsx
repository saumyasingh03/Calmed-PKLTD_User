import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 1. Import hooks
import { CardsData } from '../Options';
import profileIcon from '../assets/noProfile.png';

const Partners = () => {
  const location = useLocation(); // 2. Get the current URL location

  // 3. This effect runs when the page loads or the URL hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove '#' from the hash
      const element = document.getElementById(id);
      if (element) {
        // Scroll the element into view with a smooth behavior
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]); // Dependency array ensures this runs when the location changes

  return (
    <div className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto py-10">
      <h2 className="text-[#004785] text-center text-3xl sm:text-4xl md:text-5xl font-bold mt-10 mb-16">
        Who We Are
      </h2>

      <div className="flex flex-col gap-16">
        {CardsData.map((data, idx) => {
          // 4. Generate the same URL-friendly ID for each person
          const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

          return (
            <div
              key={idx}
              id={slug} // 5. Assign the ID to the container div
              className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 scroll-mt-20" // scroll-mt adds top margin when scrolling
            >
              {/* Profile Image */}
              <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
                <img
                  src={data.profile || profileIcon}
                  alt={data.name}
                  className="object-cover rounded-xl w-full max-w-[280px] shadow-md"
                />
              </div>

              {/* Description */}
              <div className="w-full md:w-2/3 bg-white px-5 sm:px-6 py-6 rounded-2xl shadow-[0_4px_20px_rgba(0,71,133,0.1)]">
                <h3 className="text-[#004785] text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-center md:text-left">
                  {data.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  {data.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Partners;