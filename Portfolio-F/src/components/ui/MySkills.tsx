
'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';
import { Skill } from '@/Typeinterface/InterfaceType';
import { SKILLS_DATA } from '@/lib/data';
import TitleHeading from './Titleheading.tsx/TitleHeading';


// --- SkillItem Props & Component ---
interface SkillItemProps {
  item: Skill;
  cardBgClass: string;
}

const skillItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    }
  },
};

const SkillItem: React.FC<SkillItemProps> = ({ item, cardBgClass }) => (
  <motion.div
    variants={skillItemVariants}
    className={`flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 ${cardBgClass}`}
    title={item.name}
    role="img"
    aria-label={item.name}
  >
    {/* Skill Icon - Optimized for mobile */}
    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 relative flex-shrink-0">
      <Image
        src={item.iconPath}
        alt={`${item.name} skill icon`}
        fill
        sizes="(max-width: 640px) 40px, 48px"
        className="object-contain"
        loading="lazy"
        quality={85}
      />
    </div>

    {/* Skill Name - Responsive text */}
    <h3 className="text-center text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 leading-tight line-clamp-2 break-words">
      {item.name}
    </h3>
  </motion.div>
);

const CATEGORY_STYLES: { [key: string]: { icon: string; title: string; border: string; bg: string; text: string } } = {
  'Frontend': {
    icon: '💻',
    title: 'Frontend',
    border: 'border-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/50',
    text: 'text-blue-700 dark:text-blue-300',
  },
  'Backend & DB': {
    icon: '⚙️',
    title: 'Backend & Database',
    border: 'border-green-600',
    bg: 'bg-green-50 dark:bg-green-900/50',
    text: 'text-green-700 dark:text-green-300',
  },
  'Fullstack & Dev': {
    icon: '💡',
    title: 'Fullstack & Development',
    border: 'border-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/50',
    text: 'text-purple-700 dark:text-purple-300',
  },
  'Tools & Other': {
    icon: '🛠️',
    title: 'Tools & Other',
    border: 'border-yellow-600',
    bg: 'bg-yellow-50 dark:bg-yellow-900/50',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
};

// --- MySkills Component ---
const MySkills: React.FC = () => {
  const skillsByCategory = useMemo(() => {
    return SKILLS_DATA.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  }, []);

  const categoryOrder = ['Frontend', 'Backend & DB', 'Fullstack & Dev', 'Tools & Other'];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="mt-8 sm:mt-16 md:mt-20 px-0 sm:px-5 relative">
      {/* Background Title - Desktop only */}
      <TitleHeading
        title='MY SKILL' 
        span="Our skills for " 
        span2='innovation' 
        className=' text-[3.5rem] sm:text-[10rem] font-bold uppercase absolute text-gray-100 dark:text-primary/7 -z-10 left-1/6 md:left-1/4 md:-top-20 -top-8   pointer-events-none select-none' 
      />
      
      {categoryOrder.map((category) => {
        const skills = skillsByCategory[category];
        if (!skills || skills.length === 0) return null;
        
        const style = CATEGORY_STYLES[category] || {
          icon: '✨',
          title: category,
          border: 'border-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-800',
          text: 'text-gray-700 dark:text-gray-300',
        };

        return (
          <article key={category} className={`p-0 sm:p-5 md:p-6 rounded-lg sm:rounded-xl mt-0 sm:mt-8`}>
            {/* Category Header */}
            <h2 className={`text-lg sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 flex items-center text-gray-800 dark:text-gray-100 ${style.text}`}>
              <span className="text-2xl sm:text-3xl md:text-4xl mr-2 sm:mr-3 flex-shrink-0" role="img" aria-label={style.title}>
                {style.icon}
              </span>
              <span className="line-clamp-1">{style.title}</span>
            </h2>
            
            {/* Skills Grid - Responsive */}
            <motion.div
              className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {skills.map((item, idx) => (
                <SkillItem
                  key={`${category}-${item.name}-${idx}`}
                  item={item}
                  cardBgClass={style.bg}
                />
              ))}
            </motion.div>
          </article>
        );
      })}
    </section>
  );
};

export default MySkills;