'use client'

import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa';

interface Breadcrumb {
    label: string;
    href: string;
}

interface Title {
    h1: string;
    span: string;
}

interface Props {
    link_items?: Breadcrumb[];      // optional
    titles?: Title;                 // optional
}

const Breadcrumb: React.FC<Props> = ({ link_items = [], titles = { h1: 'write', span: 'titles' } }) => {
    return (
        <div className="py-2 sm:py-6 flex flex-col items-center bg-gray-100 dark:bg-Dark_primary/50 dark:backdrop-blur-2xl rounded-2xl my-5 px-1 sm:px-4">
            <h1 className="text-xl md:text-5xl font-jakarta-Extrabold tracking-tighter  px-3 py-2 text-primary   mb-0 sm:mb-4 uppercase">
                {titles.h1} <span className="bg-white dark:bg-white/10 dark:text-gray-400 ml-2 px-2 rounded-2xl text-gray-800 font-jakarta-Regular">{titles.span}</span>
            </h1>

            <ul className="flex items-center gap-2 text-sm  rounded-2xl font-bold text-gray-400 px-3 py-3  ">
                {link_items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 nth-[2]:text-primary uppercase ">
                        <Link
                            href={item.href} 
                     
                            className="hover:text-primary transition flex items-center gap-1"
                        >
                
                            {idx === 0 && (
                                <FaHome className="w-4 h-4" /> 
                            )}
                           
                            {item.label}
                        </Link>
                        {idx !== link_items.length - 1 && <span className="text-sm font-bold text-gray-400">{">>"}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumb;