'use client'

import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import Theme_button from '../Theme/Theme_button';
import { backtoTopData } from '@/lib/data';

const BackTotop: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [scrollPct, setScrollPct] = useState<number>(0);
    
    // pillVisible state removed for mobile as we want it always visible now
    // Only keeping necessary states

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const doc = document.documentElement;
            
            // Prevent division by zero if page height is small
            const heightDiff = doc.scrollHeight - doc.clientHeight;
            const pct = heightDiff > 0 ? Math.min(100, (y / heightDiff) * 100) : 0;

            // Update scroll state for Back to Top button visibility
            setIsScrolled(y > 200);
            setScrollPct(pct);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleWhatsApp = () => window.open(`https://wa.me/${backtoTopData.myNumber}`, '_blank');
    const handleGmail = () => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${backtoTopData.email}`, '_blank');

    const circumference = 2 * Math.PI * 15;
    const dashOffset = circumference - (scrollPct / 100) * circumference;

    return (
        <>
            {/* ─── MOBILE: Always Visible Pill with Dynamic Back-to-Top ─── */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-[60] md:hidden px-4 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                translate-y-0 opacity-100 scale-100`} 
            >
                <div className="pointer-events-auto mx-auto max-w-xs bg-primary/90 dark:bg-black/80 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-row items-center justify-center gap-3 px-4 py-1 rounded-t-2xl w-fit">

                    {/* Theme Toggle */}
                    <div className="relative group p-1">
                        <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                        <Theme_button user={false} className="relative z-10 text-white/90 hover:text-white transition-colors" />
                    </div>

                    <div className="w-px h-5 bg-white/20" />

                    {/* WhatsApp */}
                    <button
                        onClick={handleWhatsApp}
                        className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/90 hover:bg-green-500/20 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-90 transition-all duration-300"
                        title="WhatsApp"
                    >
                        <FaWhatsapp size={15} />
                    </button>

                    {/* Gmail */}
                    <button
                        onClick={handleGmail}
                        className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/90 hover:bg-red-500/20 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-90 transition-all duration-300"
                        title="Gmail"
                    >
                        <SiGmail size={12} />
                    </button>

                    {/* Back to top — Appears only when scrolled > 200px */}
                    <div
                        className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex items-center justify-center
                        ${isScrolled ? "w-10 opacity-100 ml-1" : "w-0 opacity-0"}`}
                    >
                        <div className="w-px h-5 bg-white/20 mx-1" />
                        <button
                            onClick={scrollToTop}
                            className="relative flex items-center justify-center bg-white text-slate-900 w-7 h-7 rounded-xl hover:bg-blue-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-90 transition-all duration-300"
                            title="Back to top"
                        >
                            <FaArrowUp size={12} className={`${isScrolled ? 'animate-bounce' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── DESKTOP MD+: Premium Glass Rail with progress ring ─── */}
            <div className="hidden md:flex fixed bottom-1/3 -right-1 z-50 flex-row items-end group/rail">
                <div
                    className={`bg-slate-950/70 dark:bg-black/70 backdrop-blur-2xl border-y border-l border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center overflow-hidden rounded-l-2xl py-5 w-14
                    group-hover/rail:w-16
                    ${isScrolled ? "h-72" : "h-52"}`}
                >
                    <div className="flex flex-col items-center justify-between h-full w-full gap-2">

                        <div className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110">
                            <Theme_button user={false} className="text-white/70 hover:text-red-500 transition-all duration-300" />
                        </div>

                        <div className="relative group/btn">
                            <button
                                onClick={handleWhatsApp}
                                className="p-2.5 rounded-full hover:bg-green-500/15 text-white/70 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] active:scale-90 transition-all duration-300 hover:scale-110"
                            >
                                <FaWhatsapp size={18} />
                            </button>
                            <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded-md bg-slate-900 text-[10px] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 translate-x-1 group-hover/btn:translate-x-0 transition-all duration-200">
                                WhatsApp
                            </span>
                        </div>

                        <div className="relative group/btn">
                            <a href={backtoTopData.linkedIn}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-full hover:bg-blue-500/15 text-white/70 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-90 transition-all duration-300 hover:scale-110 block"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                            <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded-md bg-slate-900 text-[10px] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 translate-x-1 group-hover/btn:translate-x-0 transition-all duration-200">
                                LinkedIn
                            </span>
                        </div>

                        <div className="relative group/btn">
                            <button
                                onClick={handleGmail}
                                className="p-2.5 rounded-full hover:bg-red-500/15 text-white/70 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-90 transition-all duration-300 hover:scale-110"
                            >
                                <SiGmail size={14} />
                            </button>
                            <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded-md bg-slate-900 text-[10px] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 translate-x-1 group-hover/btn:translate-x-0 transition-all duration-200">
                                Gmail
                            </span>
                        </div>

                        {isScrolled && (
                            <button
                                onClick={scrollToTop}
                                className="relative flex items-center justify-center w-9 h-9 active:scale-90 transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in mt-2"
                                title={`${Math.round(scrollPct)}% scrolled`}
                            >
                                <svg className="absolute inset-0 -rotate-90" width="36" height="36">
                                    <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                                    <circle
                                        cx="18" cy="18" r="15" fill="none"
                                        stroke="white" strokeWidth="2"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                        strokeLinecap="round"
                                        className="transition-all duration-150"
                                    />
                                </svg>
                                <span className="flex items-center justify-center bg-white text-slate-900 w-7 h-7 rounded-full hover:bg-blue-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    <FaArrowUp size={11} className="animate-bounce" />
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default BackTotop;