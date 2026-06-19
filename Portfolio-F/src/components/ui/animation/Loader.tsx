'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const hasSeenLoader = sessionStorage.getItem('has_seen_initial_loader');

    if (hasSeenLoader !== 'true') {

      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('has_seen_initial_loader', 'true');
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, []);


  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] w-full h-screen flex items-center justify-center bg-white dark:bg-Dark_primary"
          >
            <div className="flex flex-col items-center">
              {/* Top Section: Logo */}
              <div className="flex items-center gap-2">
                {/* RO Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary px-2 py-2 rounded-lg"
                >
                  <div className="relative inline-block">
                    {/* RO text - letter by letter animated */}
                    <span className="text-white font-jakarta-Extrabold text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl glow inline-flex">
                      <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.15,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                      >
                        R
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                      >
                        O
                      </motion.span>
                    </span>
                    <motion.div
                      className="w-2 h-1 md:w-4 md:h-2 bg-primary rounded-md absolute top-4 md:top-7 lg:top-8 right-0 md:-right-1 lg:right-0 origin-[-6px_center] md:origin-[-15px_center]"
                      initial={{ x: -14, y: -6, opacity: 0, rotate: 0 }}
                      animate={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        rotate: [0, 0, 360],
                      }}
                      transition={{
                        x: { delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        y: { delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        opacity: { delay: 0.55, duration: 0.2 },
                        rotate: {
                          delay: 1.0,
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                  </div>
                </motion.div>

                {/* HAN */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 90,
                  }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-jakarta-Regular tracking-widest glow text-gray-800 dark:text-white"
                >
                  HAN
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1,x:5 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="text-[0.5rem]  sm:text-sm md:text-xs tracking-[0.2em] text-gray-700 dark:text-white"
                  >
                    WEB DEVELOPER
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}>
        {children}
      </div>
    </>
  );
};

export default Loader;