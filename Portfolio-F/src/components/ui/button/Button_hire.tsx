'use client'

import React from 'react'
import { MdEngineering } from 'react-icons/md'




interface Button_hire {
    text: string
}
const Button_hire: React.FC<Button_hire> = ({ text }) => {
    return (
        <>
            <button className='text-sm font-jakarta-Regular    hover:ring-primary hover:ring-1 hover:text-secondary hover:bg-Light_primary dark:hover:bg-Dark_primary duration-300 transition-all cursor-pointer  bg-primary text-white px-2 md:px-6 lg:px-4 py-2 rounded-md flex items-center gap-2'>{text}<MdEngineering size={20} /></button>
        </>
    )
}

export default Button_hire