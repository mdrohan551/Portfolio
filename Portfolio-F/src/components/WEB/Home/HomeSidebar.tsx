'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { SidebarBannerIcon } from '@/Typeinterface/InterfaceType';
import Button_hire from '@/components/ui/button/Button_hire';
import Button_download from '@/components/ui/button/Button_download';
import { mydata } from '@/lib/data';

const HomeSidebar: React.FC = () => {
    const { image, entryName, name, slug, email, phone, icons } = mydata;

    return (
        <>
            {/* ─── MOBILE: image-card design like screenshot ─── */}
            <div className="block md:hidden rounded-t-2xl ring-[0.5px] ring-Light_primary/50 overflow-hidden border-b-1 border-primary">
                
                {/* Top section: image left + info right */}
                <div className="flex items-stretc bg-white dark:bg-white/5 min-h-[180px] ">
                    
                    {/* Left: profile image */}
                    <div className="relative w-[130px] shrink-0">
                        {/* Green gradient bg behind image */}
                        <div className="absolute inset-0 bg-linear-to-r from-primary via-lime-600 to-secondary dark:from-primary/50 dark:via-primary/50 dark:to-primary/50" />
                        <div className="relative w-full h-full min-h-[180px]">
                            <Image
                                src={image.src || image}
                                alt={`${name}-img`}
                                fill
                                priority
                                sizes="160px"
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: info */}
                    <div className="flex flex-col justify-center px-3 py-2 gap-1 flex-1">
                        {/* Name */}
                        <div className="leading-tight">
                          
                            <h1 className="font-Yanone-Semibold uppercase text-2xl dark:text-white leading-tight">
                                {entryName} <span className="text-secondary">{name}</span>
                            </h1>
                        </div>

                        {/* Slug */}
                        <p className="text-xs text-gray-600 dark:text-gray-300  font leading-tight">
                            {slug}
                        </p>

                        {/* Contact */}
                        <div className="flex flex-col gap-0.5 mt-1">
                            
                            <a    href={`mailto:${email}`}
                                className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-secondary transition-colors truncate"
                            >
                                {email}
                            </a>
                            <a
                                href={`tel:${phone}`}
                                className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-secondary transition-colors"
                            >
                                {phone}
                            </a>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-2">
                            <Button_hire text="Hire Me" />
                            <Button_download text=" cv" />
                        </div>
                    </div>
                </div>

               
            </div>

            {/* ─── DESKTOP MD+: original design unchanged ─── */}
            <div className="hidden md:block relative shadow-lg/5 rounded-3xl p-2 group ring-Light_primary/50 ring-[0.5px] pb-14">
                <div className="absolute top-2 left-2 w-[calc(100%-16px)] h-[calc(45%-16px)] rounded-t-3xl bg-linear-to-r dark:bg-linear-to-l from-primary via-lime-600 to-secondary dark:from-primary/50 dark:via-primary/50 dark:to-primary/50 dark:backdrop-blur-xl dark:border dark:border-white/20 dark:shadow-2xl -z-10" />
                <motion.div
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                    className="relative w-full aspect-[4/5] rounded-t-3xl -z-10 drop-shadow-[4px_4px_20px_rgba(0,0,0,0.3)] overflow-hidden"
                >
                    <Image
                        src={image.src || image}
                        alt={`${name}-img`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-contain object-top rounded-t-3xl"
                    />
                </motion.div>

                {/* Social Icons Section */}
                <div className="flex gap-3 -mt-10 bg-linear-to-r from-primary via-lime-600 to-secondary px-2 py-4 justify-center">
                    {icons && icons.length > 0 ? (
                        icons.map((item: SidebarBannerIcon, i: number) => {
                            const { Icon, href } = item;
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
                                    <Icon size={15} />
                                </motion.a>
                            );
                        })
                    ) : (
                        <span className="text-white text-xs">No icons found</span>
                    )}
                </div>

                {/* Name & Title */}
                <div className="py-3 text-center">
                    <h1 className="font-Yanone-Semibold uppercase text-2xl dark:text-white">
                        {entryName} <span className="text-secondary">{name}</span>
                    </h1>
                    <span className="text-md font-Yanone-Regular text-gray-700 dark:text-gray-300">{slug}</span>
                </div>

                {/* Contact Info */}
                <div className="text-center">
                    <a className="text-sm text-gray-500 dark:text-gray-400" href={`mailto:${email}`}>
                        {email}
                    </a>
                    <br />
                    <a className="text-sm text-gray-500 dark:text-gray-400" href={`tel:${phone}`}>
                        {phone}
                    </a>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 justify-center py-4">
                    <Button_hire text="Hire Me" />
                    <Button_download text="Download cv" />
                </div>
            </div>
        </>
    );
};

export default HomeSidebar;