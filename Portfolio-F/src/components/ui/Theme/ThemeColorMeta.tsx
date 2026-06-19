'use client'

import { useEffect } from 'react';

const ThemeColorMeta = () => {
    useEffect(() => {
        const updateThemeColor = () => {
            const isDark = document.documentElement.classList.contains('dark');
            
            let metaTag = document.querySelector('meta[name="theme-color"]');
            if (!metaTag) {
                metaTag = document.createElement('meta');
                metaTag.setAttribute('name', 'theme-color');
                document.head.appendChild(metaTag);
            }
            const color = isDark
                ? getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-primary').trim() 
                : getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-Light_primary')    

            metaTag.setAttribute('content', color);
        };

 
        updateThemeColor();
       const observer = new MutationObserver(updateThemeColor);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return null;
};

export default ThemeColorMeta;