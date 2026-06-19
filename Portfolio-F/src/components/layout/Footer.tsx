'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Next.js Image import added
import type { FooterProps, NavLink, SocialLink } from '../../Typeinterface/InterfaceType';
import { myMap } from '@/lib/data';
import Location from './Location';
import TitleHeading from '../ui/Titleheading.tsx/TitleHeading';
import Button_link from '../ui/button/Button_link';

const SocialIcon: React.FC<{ link: SocialLink }> = ({ link }) => {
  const Icon = link.icon;
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer"
      className="text-gray-400 hover:text-white dark:hover:text-lime-400 transition-colors duration-200">
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </a>
  );
};

const NavLinkItem: React.FC<{ link: NavLink }> = ({ link }) => {
  return (
    <a href={link.link}
      className="text-gray-400 text-sm md:text-base font-medium hover:text-white dark:hover:text-lime-400 transition-colors duration-200">
      {link.label}
    </a>
  );
};

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { cta, navigation, socialLinks } = data;
  
  // Fix: localStorage inside useEffect to avoid SSR error
  const [modeDark, setModeDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setModeDark(isDark);
  }, []);

  return (
    <div className=" mt-10 mb-5 ">
      <div className=" container  mx-auto rounded-3xl p-6 md:p-12 shadow-lg ring-1 ring-Light_primary  relative border-gray-700 dark:overflow-hidden">
        <TitleHeading title="footer" span="Footer" className=' hidden lg:block text-[15rem] font-bold uppercase absolute -z-30 left-1/6 -top-20 text-gray-50' />

        {/* Changed to grid: responsive 1 column (mobile) -> 2 columns (md+) */}
        <div className='grid grid-cols-12  gap-6 border-b border-gray-700'>

          {/* LEFT COLUMN - keep original design & content */}
          <div className="grid col-span-12 md:col-span-6 items-start pb-12 md:pb-16 relative">
            <div className='w-100 h-100 blur-3xl rounded-full bg-primary/35 dark:bg-primary/10 absolute bottom-0 -left-20 -z-10'></div>
            
            {/* Added relative and aspect ratio for Next.js Image optimization */}
            <div className="relative p-1 rounded-2xl mb-8 w-40 -z-30 aspect-[2/1]"> 
              <Image 
                src={modeDark ? "/darklogo.png" : "/lightlogo.png"} 
                alt="logo" 
                fill 
                className="object-contain" 
                priority // Footer logo LCP optimization
              />
            </div>

            <h2 className="text-3xl font-Yanone-Regular md:text-5xl font-extrabold mb-4 max-w-2xl tracking-[1px] uppercase  z-10 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-l dark:from-gray-500 via-gray-600 dark:to-gray-200">
              {cta.title}
            </h2>
            <p className="text-gray-500 mb-8 max-w-md text-sm md:text-base">
              {cta.subtitle}
            </p>
            <div className='w-50'>
              <Button_link
                href={cta.buttonLink}
                text={cta.buttonText}
                className='px-8 py-3'
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Location (kept same, only wrapper remains) */}
          <div className="grid col-span-12 md:col-span-6 ">
            <div className="bg-transparent dark:bg-transparent rounded-2xl w-full ">
              <Location  data={myMap} />
            </div>
          </div>

        </div>

        {/* Bottom row (copyright, nav, socials) - unchanged */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-8">
          <div className="flex items-center gap-3 text-gray-700 text-sm">
            <div className="">&copy;</div>
            All Rights Reserved {new Date().getFullYear()}<a href="#" target='_blank' className='text-secondary font-inter font-extrabold uppercase -ml-2'>Rohan</a>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {navigation.map(link => (
              <NavLinkItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="flex gap-4 md:gap-6">
            {socialLinks.map(link => (
              <SocialIcon key={link.name} link={link} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;