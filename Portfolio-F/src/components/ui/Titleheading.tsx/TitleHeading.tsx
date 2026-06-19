import React from 'react';
import { motion, type Variants } from 'framer-motion';

const TitleHeading: React.FC<{ title: string, span: string, span2?: string; className: string }> = ({ title, span, span2, className }) => {
    const maskVariant:Variants = {
        hidden: { 
            y: "110%", 
            rotateZ: 5, 
            skewY: 5,
            opacity: 0 
        },
        visible: { 
            y: 0, 
            rotateZ: 0, 
            skewY: 0,
            opacity: 1,
            transition: {
                 type:"spring",
                damping: 18,
                stiffness: 100,
                duration: 0.8
            }
        }
    };

    const container = {
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
        >
            <div className="overflow-hidden">
                <motion.h1 
                    variants={maskVariant} 
                    className={`${className} dark:text-gray-900`}
                >
                    {title}
                </motion.h1>
            </div>

            <div className="flex justify-center items-center">
                <div className="relative overflow-hidden">
                    {/* Subtitle / Span Area */}
                    <motion.h2 
                        variants={maskVariant}
                        className="lg:text-4xl md:text-2xl sm:text-xl uppercase px-5 py-2 rounded-2xl text-gray-800 dark:text-gray-400 font-jakarta-Extrabold mb-4 text-center inline-block"
                    >
                        {span}
                        {span2 && (
                            <span className='text-primary '> {span2} ✦</span>
                        )}
                    </motion.h2>
                </div>
            </div>
        </motion.div>
    );
}

export default TitleHeading;