
'use client'

import React from 'react';
import { motion, type Variants } from 'framer-motion';

type BannerHeadingProps = {
    entryName: string;
    title: string[];
    description: string;
    skillTags: string[]
};

const BannerHeading: React.FC<BannerHeadingProps> = ({ entryName, title, description, skillTags }) => {
    const wordVariant:Variants = {
        hidden: { 
            y: "105%", 
            rotateZ: 8, 
            skewY: 6,
            opacity: 0 
        },
        visible: { 
            y: 0, 
            rotateZ: 0, 
            skewY: 0,
            opacity: 1,
            transition: {
                type: "tween",
                damping: 15,
                stiffness: 100,
                duration: 0.6
            }
        }
    };

    const container = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="py-1 md:py-10 px-2 sm:px-5 shadow-xl/3 ring-[0.5px] ring-Light_primary/50 dark:backdrop-blur-3xl rounded-2xl relative z-10 overflow-hidden">
            <div>
                <h2 className="capitalize hidden  font-bold text-gray-600 dark:text-gray-400 text-sm sm:text-md md:inline px-3 py-1 ring-1 ring-secondary dark:ring-gray-400 dark:ring-2 rounded-2xl bg-Light_primary dark:bg-Dark_primary">{entryName}</h2>
                
                <motion.h1 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={container}
                    className="font-jakarta-bold text-3xl sm:text-7xl uppercase mt-5  dark:text-transparent dark:bg-clip-text dark:bg-linear-to-l dark:from-gray-500 via-gray-600 dark:to-gray-200"
                >
                    {title.map((text, index) => (
                        <span 
                            key={index} 
                            className="mr-2 tracking-tighter leading-6 sm:leading-15 nth-2:text-secondary nth-2:block overflow-hidden inline-block"
                        >
                            <motion.span 
                                variants={wordVariant}
                                className="inline-block origin-left"
                            >
                                {text}
                            </motion.span>
                        </span>
                    ))}
                </motion.h1>
                
                <div className='w-50 sm:w-100 h-50 sm:h-100 blur-3xl rounded-full bg-primary/30 dark:bg-primary/15 absolute -top-20 left-0 -z-10'></div>
            </div>

            <p className='text-justify text-[0.7rem] sm:text-sm mt-5 text-gray-700 dark:text-gray-300 font-jakarta-Regular '>{description}</p>
            <ul className="flex flex-wrap gap-2 mt-5">
                {skillTags.map((tag, idx) => (
                    <li key={idx} className="px-2 py-1 bg-gray-50 dark:bg-gray-900 dark:text-gray-500 text-gray-400 rounded text-[0.6rem] sm:text-sm">{tag}</li>
                ))}
            </ul>
        </div>
    );
};

export default BannerHeading;