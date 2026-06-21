
'use client';
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { services } from '@/lib/data';
import ServicesCard from '@/components/ui/card/ServicesCard';
import MySkills from '@/components/ui/MySkills';

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    }),
};

const Services: React.FC = () => {
    return (
        <div className='container mx-auto relative px-4 sm:px-5 overflow-hidden sm:overflow-visible'>
            {/* ✅ Mobile: 2 cols, Tablet: 2 cols, Desktop: 3 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 lg:gap-2 z-10">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        custom={index}
                    >
                        <ServicesCard service={service} />
                    </motion.div>
                ))}
            </div>
            
            {/* Background Glow Effect */}
            <div className="flex w-150 h-150 bg-secondary/15 absolute top-1/3 left-1/3 -z-10 blur-[10rem] pointer-events-none"></div>
                <MySkills />
        </div>
    );
};

export default Services;