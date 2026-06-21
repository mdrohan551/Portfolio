'use client'

import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { categoryIcons } from "../categoryIcons";

interface Props {
    categories: string[];
    active: string;
    setActive: (cat: string) => void;
}

const CommonTabs: React.FC<Props> = ({ categories, active, setActive }) => {
    return (
        <div className="flex flex-col bg-white/90 dark:bg-Dark_primary/80 backdrop-blur-xl shadow-2xl shadow-gray-200/50 dark:shadow-black/30 rounded-2xl overflow-hidden border border-gray-100/50 dark:border-white/5">
            
            {/* Luxury Header with Gradient */}
            <div className="relative p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                <h2 className="relative text-xl font-bold tracking-wide text-gray-800 dark:text-white uppercase">
                    Categories
                </h2>
                <div className="mt-2 h-1 w-12 bg-primary rounded-full" />
            </div>

            {/* Tabs List */}
            <div className="flex flex-col gap-1.5 px-4 pb-5 pt-2">
                {categories.map((cat) => {
                    const isActive = active.toLowerCase() === cat.toLowerCase();

                    return (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`
                                group relative flex items-center justify-between w-full px-5 py-4 rounded-xl text-left transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer overflow-hidden
                                ${isActive 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1' 
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:translate-x-1'
                                }
                            `}
                        >
                            {/* Active Background Glow Effect */}
                            {isActive && (
                                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-100 transition-opacity duration-300" />
                            )}

                            {/* Icon & Label */}
                            <span className={`relative flex items-center gap-3 font-semibold uppercase text-sm tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-primary dark:group-hover:text-primary'}`}>
                                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {categoryIcons[cat.toLowerCase()]}
                                </span>
                                {cat}
                            </span>

                            {/* Arrow Indicator */}
                            <div className={`
                                relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300
                                ${isActive 
                                    ? 'bg-white/20 text-white rotate-0' 
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary -rotate-45'
                                }
                            `}>
                                <BiRightArrowAlt size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CommonTabs;