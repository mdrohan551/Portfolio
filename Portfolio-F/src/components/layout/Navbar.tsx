'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { navBar } from '@/lib/data';
import Button_link from '../ui/button/Button_link';
import Button_menu from '../ui/button/Button_menu';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [modeDark, setModeDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setModeDark(isDark);
    setMounted(true);
  }, []);

  let timer: any;

  // Function to handle long press start
  const startHold = () => {
    timer = setTimeout(() => {
      const secretKey = uuidv4();
      
      // Using sessionStorage so it clears when browser closes
      sessionStorage.setItem('route_token', secretKey);
      
      // Navigate to the dynamic route with the UUID
      router.push(`/login/${secretKey}`);
    }, 3000); // 3 seconds hold time
  };

  // Function to cancel the timer if user releases early
  const stopHold = () => {
    if (timer) clearTimeout(timer);
  };

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='container mx-auto px-2 py-2'>
      <div className="grid grid-cols-12 items-center">
        {/* Logo */}
        <div className="col-span-2">
          <div className='relative w-25 md:w-25 lg:w-35 h-10 md:h-12'>
            {/* Added onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd for long press detection */}
            <a 
              href="#"
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              // Prevent default link behavior to avoid conflict with long press
              onClick={(e) => e.preventDefault()}
            >
              <Logo/>
            </a>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="col-span-8 hidden md:flex justify-center">
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
                      ${(isActive && hoveredIdx === null) || isHover ? 'bg-Light_primary dark:bg-light_primary text-black ' : ' text-gray-800 dark:text-white'}
                    `}
                  >
                    {item.title}
                    <div className={`absolute bottom-0 left-0 h-[0.2rem] w-full bg-primary dark:bg-white origin-bottom transition-transform duration-500
                        ${(isActive && hoveredIdx === null) || isHover ? 'scale-y-100' : 'scale-y-0'}
                      `}></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Button */}
        <div className="col-span-2 hidden md:flex justify-end gap-2">
          <Button_link text="Let's Talk" href='/contact-us' className='dark:bg-white dark:text-gray-700 px-2 py-2' arroClassName='dark:bg-primary dark:text-white p-0.5' />
        </div>

        {/* Mobile Menu Icon */}
        <div className="col-span-10 md:hidden flex justify-end">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            <Button_menu open={menuOpen} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <nav
          className={`
            col-span-12 md:hidden 
            flex flex-col gap-3 bg-linear-to-r from-primary via-primary to-secondary backdrop-blur-xs px-5 py-5 absolute top-20 right-0 w-full
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
            <div className=' rounded ring'>
              <Button_link text="Let's Talk" href='/contact-us' className='dark:bg-white dark:text-gray-700 px-2 py-2' arroClassName='dark:bg-primary dark:text-white p-0.5' />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;