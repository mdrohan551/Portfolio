'use client';

import React from 'react';
import Image from 'next/image'; 
import { FaLaptopCode } from 'react-icons/fa';
import Button_link from '../button/Button_link';

interface Service {
    id: string;
    title: string;
    shortDesc: string;
    tag?: string;
    stack: string[];
    thumbnail?: string;
    packages?: {
        name: string;
        features: string[];
    }[];
}

interface Props {
    service: Service;
}

const ServicesCard: React.FC<Props> = ({ service }) => {
    const IconComponent = FaLaptopCode;

    return (
        <div className="
            bg-white dark:bg-Dark_primary/50 rounded-2xl shadow-xl/2 
            hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden
            transform flex flex-col h-full border border-gray-100 dark:border-gray-700 p-2
        ">
            {service.thumbnail && (
                <div className="bg-gray-50 dark:bg-Dark_primary relative aspect-video w-full overflow-hidden rounded-t-2xl">
                    {/* ✅ SEO Friendly Next.js Image with proper sizes */}
                    <Image
                        src={service.thumbnail}
                        alt={`${service.title} service thumbnail`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                        quality={85}
                    />
                </div>
            )}

            <div className="px-2 py-3 flex flex-col flex-1">
                <div className="flex items-center mb-1">
                    <div className="mr-2 text-primary shrink-0">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-sm sm:text-md font-bold text-gray-900 dark:text-gray-300 uppercase leading-tight line-clamp-1">
                        {service.title}
                    </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 flex-1 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                </p>

                {service.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {service.stack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="bg-Light_primary dark:bg-gray-600 text-primary dark:text-gray-300 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                            >
                                {tech}
                            </span>
                        ))}
                        {service.stack.length > 3 && (
                            <span className="text-[10px] sm:text-xs text-gray-400 self-center">+{service.stack.length - 3}</span>
                        )}
                    </div>
                )}

                <div className='flex mt-4 sm:mt-5'>
                    <Button_link 
                        text='read more' 
                        href={`/services/details/${service.id}`} 
                        className='text-xs sm:text-sm px-3 py-2 capitalize' 
                    />
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;