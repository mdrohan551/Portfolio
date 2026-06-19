'use client'


import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';


import Theme_button from '../ui/Theme/Theme_button';
import { backtoTopData } from '@/lib/data';


const BackTotop: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 200);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    // Link Handlers
    const handleWhatsApp = () => {
        window.open(`https://wa.me/${backtoTopData.myNumber}`, '_blank');
    };

    const handleGmail = () => {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${backtoTopData.email}`, '_blank');
    };

    return (
        <div className="fixed bottom-8 right-2 z-50 flex flex-col items-end">
            <div
                className={`bg-black/80 backdrop-blur-2xl border border-white/10 text-white shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center overflow-hidden rounded-full py-4 w-12 
                ${isScrolled ? "h-64" : "h-48"}`}
            >
                <div className="flex flex-col items-center justify-between h-full w-full gap-3">
                    {/* dark and white mode  */}
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
                        <SiGmail size={18} />
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
    );
};

export default BackTotop;