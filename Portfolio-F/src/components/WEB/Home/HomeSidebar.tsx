'use client'

import React from 'react';
import { motion } from 'framer-motion';
// Type import kora hocche
import type { SidebarBannerIcon } from '@/Typeinterface/InterfaceType';

import Button_hire from '@/components/ui/button/Button_hire';
import Button_download from '@/components/ui/button/Button_download';
import { mydata } from '@/lib/data';

const HomeSidebar: React.FC = () => {
    // Directly mydata theke data destructuring kora hocche
    const { image, entryName, name, slug, email, phone, icons } = mydata;

    return (
        <div className="relative shadow-lg/5 rounded-3xl p-2 group ring-Light_primary ring-2">
            {/* Background Gradient */}
            <div className="absolute top-2 left-2 w-[calc(100%-16px)] h-[calc(45%-16px)] rounded-t-3xl 
                bg-linear-to-r dark:bg-linear-to-l from-primary via-lime-600 to-secondary 
                dark:from-gray-200/5 dark:via-primary/20 dark:to-transparent 
                dark:backdrop-blur-xl dark:border dark:border-white/20 dark:shadow-2xl -z-10">
            </div>

            {/* Profile Image */}
            <motion.img
                initial={{ opacity: 0.8 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={image.src || image} // Next.js Image object handle kora
                className="w-full h-auto rounded-t-3xl relative -z-10 drop-shadow-[4px_4px_20px_rgba(0,0,0,0.3)]"
                alt={`${name}-img`}
            />

            {/* Social Icons Section - FIXED HERE */}
            <div className="flex gap-3 -mt-10 bg-linear-to-r from-primary via-lime-600 to-secondary px-2 py-4 justify-center">
                {icons && icons.length > 0 ? (
                    icons.map((item: SidebarBannerIcon, i: number) => {
                        // Destructure kora hocche 'Icon' (Capital I) karon data.ts e tai ache
                        const { Icon, href } = item;
                        
                        // Safety check jodi Icon undefined hoy
                        if (!Icon) return null;

                        return (
                            <motion.a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0.8, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-white ring px-1 py-1 rounded-full hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                            >
                                {/* Directly Icon Component render kora hocche */}
                                <Icon size={15} />
                            </motion.a>
                        );
                    })
                ) : (
                    <span className="text-white text-xs">No icons found</span>
                )}
            </div>

            {/* Name & Title */}
            <div className='py-3 text-center'>
                <h1 className='font-Yanone-Semibold uppercase text-2xl dark:text-white'>
                    {entryName} <span className='text-secondary'>{name}</span>
                </h1>
                <span className='text-md font-Yanone-Regular text-gray-700 dark:text-gray-300'>{slug}</span>
            </div>

            {/* Contact Info */}
            <div className='text-center'>
                <a className='text-sm text-gray-500 dark:text-gray-400' href={`mailto:${email}`}>
                    {email}
                </a>
                <br />
                <a className='text-sm text-gray-500 dark:text-gray-400' href={`tel:${phone}`}>
                    {phone}
                </a>
            </div>

            {/* Buttons */}
            <div className='flex gap-2 justify-center py-4'>
                <Button_hire text='Hire Me' />
                <Button_download text="Download cv" />
            </div>
        </div>
    );
};

export default HomeSidebar;