'use client'

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { projectData } from '@/lib/data';
import CommonTabs from '@/components/ui/Tabs/CommonTabs';
import TabCard from '@/components/ui/card/TabCard';
import SingleCardLoader from '@/components/ui/animation/SingleCardLoader';
import MySkills from '@/components/ui/MySkills';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  }),
};

const Projects: React.FC = () => {
  const skeletonCount = 6; // Reduced for mobile performance
  const [active, setActive] = useState<string>("design");
  
  const categories = projectData ? [...new Set(projectData.map(item => item.category))] : [];
  const filtered = projectData ? projectData.filter((item) => item.category === active) : [];
  const isDataAvailable = filtered.length > 0;

  return (
    <div className="container mx-auto py-1 sm:py-10 px-4 sm:px-5">
      
      {/* ✅ Mobile Horizontal Tabs (Visible only on mobile) */}
      <div className="md:hidden mb-2 w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2 min-w-max px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                active === cat 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar (Desktop Only) */}
        <div className="col-span-12 md:col-span-3 hidden md:block">
          <div className="sticky top-25">
            <CommonTabs categories={categories} active={active} setActive={setActive} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="col-span-12 md:col-span-9">
          {/* ✅ Optimized Grid: 1 col mobile, 2 cols tablet+, 3 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
            {isDataAvailable ? (
              filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={index}
                >
                  <TabCard item={item} />
                </motion.div>
              ))
            ) : (
              Array.from({ length: skeletonCount }).map((_, index) => (
                <SingleCardLoader key={index} />
              ))
            )}
          </div>
        </div>
      </div>

      <MySkills />
    </div>
  );
}

export default Projects;