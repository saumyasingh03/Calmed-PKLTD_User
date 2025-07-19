import React from 'react'
import profileIcon from "../assets/noProfile.png"
import { Link } from 'react-router-dom'; // 1. Import Link from React Router

const Cards = ({ CardData }) => {

  // 2. Create a URL-friendly ID from the person's name
  const slug = CardData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div className='flex flex-col text-center items-center gap-5 rounded-2xl shadow-[0_4px_20px_rgba(0,71,133,0.4)] px-4 py-6 transform transition-transform duration-300 hover:-translate-y-1.5'>
      <div>
        <img src={CardData.profile ? CardData.profile : profileIcon} alt="" className='w-20 h-20 rounded-full object-cover' />
      </div>
      <div className='flex flex-col gap-3 '>
        <h3 className='text-[#004785] font-semibold'>{CardData.name}</h3>
        <h3 className='font-semibold'>{CardData.position}</h3>
        <p>{CardData.description.slice(0, 100)}...</p>
      </div>
      <div>
        {/* 3. Use the Link component to navigate to the Partners page with a hash */}
        <Link to={`/partners#${slug}`} className='text-[#004785] underline'>
          Know More
        </Link>
      </div>
    </div>
  )
}

export default Cards;