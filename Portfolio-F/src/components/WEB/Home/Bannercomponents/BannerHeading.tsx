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
    const wordVariant: Variants = {
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

    const tagContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } }
    };

    const tagItem: Variants = {
        hidden: { opacity: 0, y: 10, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 260, damping: 18 }
        }
    };

    // duplicate tags for seamless infinite marquee on mobile
    const marqueeTags = [...skillTags, ...skillTags];

    return (
        <div className=" md:py-10 px-2 sm:px-5 shadow-xl/3 ring-[0.5px] ring-Light_primary/50 dark:backdrop-blur-3xl sm:rounded-2xl relative z-10 overflow-hidden">
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

            {/* Mobile: animated marquee carousel */}
            <div className="py-2 sm:hidden relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

                <motion.ul
                    className="flex gap-2 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: skillTags.length * 2.5,
                        repeat: Infinity,
                    }}
                >
                    {marqueeTags.map((tag, idx) => (
                        <li
                            key={idx}
                            className="px-2 py-1 bg-gray-50 dark:bg-gray-900 dark:text-gray-400 text-primary/95 rounded text-[0.6rem] whitespace-nowrap shrink-0"
                        >
                            {tag}
                        </li>
                    ))}
                </motion.ul>
            </div>

            {/* Desktop/tablet: static animated tags */}
            <motion.ul 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={tagContainer}
                className="hidden sm:flex flex-wrap gap-2 mt-5"
            >
                {skillTags.map((tag, idx) => (
                    <motion.li 
                        key={idx} 
                        variants={tagItem}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-2 py-1 bg-gray-50 dark:bg-gray-900 dark:text-gray-500 text-gray-400 rounded text-sm cursor-default"
                    >
                        {tag}
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
};

export default BannerHeading;