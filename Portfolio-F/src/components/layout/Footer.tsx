'use client';

import React, { useState, useEffect } from 'react';
import type { FooterProps, NavLink, SocialLink } from '../../Typeinterface/InterfaceType';
import { myMap } from '@/lib/data';
import Location from './Location';
import TitleHeading from '../ui/Titleheading.tsx/TitleHeading';
import Button_link from '../ui/button/Button_link';
import Logo from '../ui/Logo';

const SocialIcon: React.FC<{ link: SocialLink }> = ({ link }) => {
  const Icon = link.icon;
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer"
      className="text-gray-50 md:text-gray-400 hover:text-primary transition-colors duration-200">
      <Icon className="w-6 h-6 md:w-6 md:h-6" />
    </a>
  );
};

const NavLinkItem: React.FC<{ link: NavLink }> = ({ link }) => {
  return (
    <a href={link.link}
      className="text-gray-400 text-sm md:text-base font-medium hover:text-primary  transition-colors duration-200">
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
    <div className=" mt-5 md:mt-10 mb-5 ">
      <div className=" container  mx-auto rounded-3xl p-2 md:p-12 shadow-lg shadow-gray-50  dark:shadow-gray-900 border-b border-l border-r border-primary/20   relative  ">
        <TitleHeading title="hire me" span="Footer" className='  text-5xl  left-1/4 md:left-1/6 md:text-[15rem] font-bold uppercase absolute -z-30 top-0  md:-top-20 text-gray-200 md:text-gray-50' />

        {/* Changed to grid: responsive 1 column (mobile) -> 2 columns (md+) */}
        <div className='grid grid-cols-12  gap-0 md:gap-6 border-b border-gray-300'>

          {/* LEFT COLUMN - keep original design & content */}
          <div className="grid col-span-12 md:col-span-6 items-start pb-1 md:pb-16 relative">
            <div className='md:w-100 w-50 h-50 md:h-100 blur-3xl rounded-full bg-primary/50 md:bg-primary/30 dark:bg-primary/10 absolute bottom-10 left-0 md:-left-20 -z-10'></div>

            {/* Added relative and aspect ratio for Next.js Image optimization */}
            <div className="relative w-[150px] h-[50px] p-1 rounded-2xl mb-0 md:mb-8 -z-30 ">
              <Logo />
            </div>

            <h2 className="text-3xl font-Yanone-Regular md:text-5xl font-extrabold mb-1 md:mb-4 max-w-2xl tracking-[1px] uppercase  z-10 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-l dark:from-gray-500 via-gray-600 dark:to-gray-200">
              {cta.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-2 md:mb-8 max-w-md text-xs md:text-base">
              {cta.subtitle}
            </p>


            <div className="w-50 hidden md:flex">
              <Button_link
                href={cta.buttonLink}
                text={cta.buttonText}
                className='px-4 py-3'
              />
            </div>
            <div className='flex md:hidden w-full  items-center justify-between'>
              <Button_link
                href={cta.buttonLink}
                text={cta.buttonText}
                className='px-4 py-3'
              />

              {/* Mobile e dekhabe, Desktop e hidden thakbe */}
              <div className="flex md:hidden gap-4 bg-primary/94 px-3 py-3 rounded">
                {socialLinks.map(link => (
                  <SocialIcon key={link.name} link={link} />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - Location (kept same, only wrapper remains) */}
          <div className="grid col-span-12 md:col-span-6 ">
            <div className="bg-transparent dark:bg-transparent rounded-2xl w-full ">
              <Location data={myMap} />
            </div>
          </div>

        </div>

        {/* Bottom row (copyright, nav, socials) - unchanged */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2 md:pt-8 gap-4 md:gap-8">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300 text-xs md:text-sm">
            <div className="">&copy;</div>
            All Rights Reserved {new Date().getFullYear()}<a href="#" target='_blank' className='text-secondary font-inter font-extrabold uppercase -ml-2'>rohan</a>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {navigation.map(link => (
              <NavLinkItem key={link.label} link={link} />
            ))}
          </nav>

          <div className="md:flex gap-4 md:gap-6 hidden ">
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