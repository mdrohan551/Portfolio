'use client'

import Link from 'next/link';
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'




interface button_content {
    ref?:any;
    text: string;
    href: string;
    className?: string;
    arroClassName?: string;
}

const Button_link: React.FC<button_content> = ({ text, href, className ,arroClassName}) => {
    return (
        <>
            <Link href={href} className={`flex justify-between gap-2 items-center  bg-primary dark:bg-primary  hover:bg-gray-50 hover:ring-1 hover:ring-gray-800 ${className ? className : "px-5 md:px-2 py-2"}  font-jakarta-Semibold text-white rounded-md group transition-all duration-300`}
            >
                <span className="relative z-10 group-hover:text-gray-900  transition-all duration-300">
                    {text}
                </span>
                <FiArrowRight className={`${arroClassName} group-hover:text-white group-hover:bg-gray-900 text-gray-800 bg-white  w-4 sm:w-6 h-4 sm:h-6  rounded-full group-hover:-rotate-45 transition-all duration-300`} />
            </Link>
        </>
    )
}

export default Button_link