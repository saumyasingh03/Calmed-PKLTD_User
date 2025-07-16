import React from 'react'
import profileIcon from "../assets/noProfile.png"
const Cards = ({ CardData }) => {
    return (
        <div className='flex flex-col text-center items-center gap-5 rounded-2xl shadow-[0_4px_20px_rgba(0,71,133,0.4)] px-4 py-6 transform transition-transform duration-300 hover:translate-y-1.5'>        <div>
                <img src={CardData.profile ? CardData.profile : profileIcon} alt="" className='w-20 h-20 rounded-full' />

            </div>
            <div className='flex flex-col gap-3 '>
                <h3 className='text-[#004785] font-semibold'>{CardData.name}</h3>
                <h3 className='font-semibold'>{CardData.position}</h3>
                <p>{CardData.description.slice(0, 100)}...</p>
            </div>
            <div>
                <a href="" className='text-[#004785] underline'>Know More</a>
            </div>
        </div>
    )
}

export default Cards