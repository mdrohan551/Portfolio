import React from 'react';
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
interface porps {
    service: Service
}
const ServicesCard: React.FC<porps> = ({ service }) => {
    const IconComponent = FaLaptopCode;
    return (
        <div className="
             bg-white dark:bg-Dark_primary/50 rounded-2xl shadow-xl/2 
            hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden
            transform flex flex-col h-full  border border-gray-100  dark:border-gray-500 p-2
        ">
            {service.thumbnail && (
                <div className="   bg-gray-50 dark:bg-Dark_primary">
                    <img
                        src={service.thumbnail}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-t-2xl"
                    />

                </div>
            )}
            <div className="px-2 py-3  flex flex-col flex-1">
                <div className="flex items-center mb-1">
                        <div className="mr-2 text-primary">
                            <IconComponent className="w-5 h-5" />
                        </div>
                    <h3 className="text-md  font-bold text-gray-900 dark:text-gray-300 uppercase">
                        {service.title}
                    </h3>
                </div>
                <p className="text-gray-600 text-sm  flex-1 dark:text-gray-400">
                    {service.shortDesc}
                </p>
                {service.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {service.stack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="bg-Light_primary dark:bg-gray-600 text-primary dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                        {service.stack.length > 3 && <span className="text-xs text-gray-400">+{service.stack.length - 3} more</span>}
                    </div>
                )}
                <div className='flex mt-5'>
                    <Button_link text='read more' href={`details/${service.id}`} className='text-sm px-3 py-2 capitalize' />
                </div>
            </div>

        </div>
    );
}

export default ServicesCard