'use client'

import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { motion } from 'framer-motion';
import Theme_button from '../ui/Theme/Theme_button';
import { backtoTopData, mydata } from '@/lib/data';
import { SidebarBannerIcon } from '@/Typeinterface/InterfaceType';

const BackTotop: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const { icons } = mydata;

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 200);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${backtoTopData.myNumber}`, '_blank');
    };

    const handleGmail = () => {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${backtoTopData.email}`, '_blank');
    };

    return (
        <>
            {/* ─── MOBILE: bottom sticky row (hidden on md+) ─── */}
            <div className="fixed -bottom-1 left-0 right-0 z-50 md:hidden">
                <div className="bg-primary/70 backdrop-blur-2xl border-t rounded-t-2xl border-white/10 text-white shadow-2xl flex flex-row items-center justify-center gap-3 px-4 py-2 w-full">

                    {/* Theme toggle */}
                    <Theme_button
                        user={false}
                        className="w-9 h-9 rounded-full ring-1 ring-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200"

                    />

                    {/* WhatsApp */}
                    <button
                        onClick={handleWhatsApp}
                        className="w-9 h-9 rounded-full ring-1 ring-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200"

                        title="WhatsApp"
                    >
                        <FaWhatsapp size={15} />
                    </button>



                    {/* Gmail */}
                    <button
                        onClick={handleGmail}
                        className="w-9 h-9 rounded-full ring-1 ring-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200"

                        title="Gmail"
                    >
                        <SiGmail size={12} />
                    </button>

                    {/* Social icons from mydata — shown only on mobile */}
                    {icons && icons.length > 0 && icons.map((item: SidebarBannerIcon, i: number) => {
                        const { Icon, href } = item;
                        if (!Icon) return null;
                        return (
                            <motion.a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="w-9 h-9 rounded-full ring-1 ring-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200"
                            >
                                <Icon size={16} />
                            </motion.a>
                        );
                    })}

                    {/* Back to top — visible only when scrolled */}
                    <div
                        className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex items-center justify-center
                        ${isScrolled ? "w-9 opacity-100 scale-100" : "w-0 opacity-0 scale-75"}`}
                    >
                        <button
                            onClick={scrollToTop}
                            className="flex items-center justify-center bg-white text-black w-8 h-8 rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                            title="Back to top"
                        >
                            <FaArrowUp size={15} className="animate-bounce" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── DESKTOP MD+: original right-side vertical (unchanged) ─── */}
            <div className="hidden md:flex fixed bottom-1/3 -right-1 z-50 flex-row items-end">
                <div
                    className={`bg-black/80 backdrop-blur-2xl border border-white/10 text-white shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center overflow-hidden rounded-l-2xl py-4 w-12 
                    ${isScrolled ? "h-64" : "h-48"}`}
                >
                    <div className="flex flex-col items-center justify-between h-full w-full gap-3">
                        {/* Theme toggle */}
                        <Theme_button
                            user={false}
                            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-red-500 transition-all duration-300"
                        />

                        {/* WhatsApp */}
                        <button
                            onClick={handleWhatsApp}
                            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-green-500 transition-all duration-300"
                            title="WhatsApp"
                        >
                            <FaWhatsapp size={18} />
                        </button>

                        {/* LinkedIn */}
                        <a
                            href={backtoTopData.linkedIn}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-blue-500 transition-all duration-300"
                            title="LinkedIn"
                        >
                            <FaLinkedinIn size={18} />
                        </a>

                        {/* Gmail */}
                        <button
                            onClick={handleGmail}
                            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-red-500 transition-all duration-300"
                            title="Gmail"
                        >
                            <SiGmail size={14} />
                        </button>

                        {/* Scroll to Top */}
                        {isScrolled && (
                            <button
                                onClick={scrollToTop}
                                className="flex items-center justify-center bg-white text-black w-8 h-8 rounded-full hover:scale-110 transition-all duration-500 animate-in slide-in-from-bottom-10"
                            >
                                <FaArrowUp size={12} className="animate-bounce" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BackTotop;