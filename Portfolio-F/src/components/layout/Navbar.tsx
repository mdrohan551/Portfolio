'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { navBar } from '@/lib/data';
import Button_link from '../ui/button/Button_link';
import Button_menu from '../ui/button/Button_menu';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Fix: Manage theme state safely
  const [modeDark, setModeDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setModeDark(isDark);
  }, []);

  // 5 second hold and then show our admin route 
  let timer: any;

  const startHold = () => {
    timer = setTimeout(() => {
      const secretKey = uuidv4();
      localStorage.setItem('route_token', secretKey);
      router.push(`/login/${secretKey}`);
    }, 3000);
  };

  const stopHold = () => clearTimeout(timer);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='container mx-auto px-2 py-2'>
      <div className="grid grid-cols-12 items-center">
        {/* Logo */}
        <div className="col-span-2">
          {/* Added relative class for Next.js Image fill prop */}
          <div className='relative w-25 md:w-25 lg:w-35 h-auto aspect-video'> 
            <a href="#">
              <Image 
                onMouseDown={startHold} 
                onMouseUp={stopHold} 
                onTouchStart={startHold} 
                onTouchEnd={stopHold} 
                src={modeDark ? "/darklogo.png" : "/lightlogo.png"} 
                alt="logo" 
                fill // Fills the parent container
                className="object-contain" // Maintains aspect ratio
                priority // Loads immediately (good for LCP/SEO)
              />
            </a>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="col-span-8 hidden md:flex justify-center">
          <ul className="flex justify-center gap-2 md:gap-0 w-full">
            {navBar.map((item, idx) => {
              const isActive = item.href === pathname;
              const isHover = hoveredIdx === idx;

              return (
                <li
                  key={idx} 
                  className='group relative w-30' 
                  onMouseEnter={() => setHoveredIdx(idx)} 
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <Link
                    href={item.href || '/'}
                    className={`block w-full h-full rounded-md px-1 py-2 text-center text-sm font-jakarta-Semibold capitalize transition-all duration-300
                      ${(isActive && hoveredIdx === null) || isHover ? 'bg-Light_primary dark:bg-Dark_primary text-primary ' : ' text-gray-800 dark:text-gray-200'}
                    `}
                  >
                    {item.title}
                    <div className={`absolute bottom-0 left-0 h-[0.2rem] w-full bg-primary origin-bottom transition-transform duration-500
                        ${(isActive && hoveredIdx === null) || isHover ? 'scale-y-100' : 'scale-y-0'}
                      `}></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Button */}
        <div className="col-span-2 hidden md:flex justify-end gap-2">
          <Button_link text="Let's Talk" href='/contact-us' />
        </div>

        {/* Mobile Menu Icon */}
        <div className="col-span-10 md:hidden flex justify-end">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            <Button_menu open={menuOpen} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`
            col-span-12 md:hidden 
            flex flex-col gap-3 bg-linear-to-r from-primary via-lime-600 to-secondary backdrop-blur-xs px-5 py-5 absolute top-20 right-0 w-full
            transform transition-all duration-300 origin-top-right z-50
            ${menuOpen ? 'scale-100 opacity-100' : 'scale-0 '}
          `}
        >
          {navBar.map((item, idx) => {
            const isActive = item.href === pathname;
            return (
              <Link
                key={idx}
                href={item.href || '/'}
                onClick={() => setMenuOpen(false)}
                className={`block w-full px-4 py-2 rounded-md text-center font-jakarta-bold text-[1rem] capitalize
                  ${isActive ? 'bg-Light_primary text-white' : 'bg-gray-50 text-gray-800'}
                `}
              >
                {item.title}
              </Link>
            );
          })}
          
          {/* Mobile Button */}
          <div className='w-full flex justify-center'>
            <div className='w-40 ring'>
              <Button_link text="Let's Talk" href='/contact-us' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;