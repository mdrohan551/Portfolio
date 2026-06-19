'use client'




import React from 'react'
import { FaDownload } from 'react-icons/fa6'



interface downloadCv {
    text: string
}
const Button_download: React.FC<downloadCv> = ({ text }) => {
    return (
        <>
            <button className='text-sm font-jakarta-Regula bg-Light_primary dark:bg-Dark_primary hover:bg-primary hover:text-gray-100 duration-300 transition-all cursor-pointer  ring-1 ring-primary text-primary px-5 py-2 rounded-md flex items-center gap-2'>{text}<FaDownload /></button>
        </>
    )
}

export default Button_download