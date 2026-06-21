import React from "react";
import Image from "next/image"; 
import { FiArrowRight } from "react-icons/fi";

import Button_link from "../button/Button_link";
import { ProjectCard } from "@/Typeinterface/InterfaceType";
import { mydata } from "@/lib/data";

type Props = {
    item: ProjectCard;
};

const TabCard: React.FC<Props> = ({ item }) => {
    return (
        <article 
            className="relative bg-white dark:bg-Dark_primary/30 dark:backdrop-blur-3xl p-1 sm:p-3 ring-[0.5px] ring-Light_primary/50 shadow-lg/2 rounded-xl sm:rounded-2xl font-sans transition-all duration-300 hover:shadow-xl/7 group h-full flex flex-col"
            itemScope
          
        >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 ring-1 ring-gray-100 dark:ring-gray-700 p-3 sm:p-4 rounded-lg sm:rounded-xl flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {/* Author Avatar */}
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={mydata?.image || ""}
                            alt={mydata?.name || "Author"}
                            fill
                            sizes="40px"
                            className="object-cover"
                            loading="eager"
                            quality={85}
                        />
                    </div>

                    {/* Author Info */}
                    <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate" itemProp="creator">
                            {mydata?.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize dark:text-gray-400 truncate">
                            {item.category}
                        </p>
                    </div>
                </div>

                {/* Arrow Icon Button */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-200 dark:bg-green-900/40 rounded-full flex items-center justify-center cursor-pointer opacity-70 transition duration-300 hover:opacity-100 flex-shrink-0">
                    <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-700 dark:text-green-300 transform -rotate-45" />
                </div>
            </div>

            {/* Project Image Section */}
            <div className="relative w-full rounded-lg sm:rounded-xl h-40 sm:h-48 md:h-56 mb-4 sm:mb-5  flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 768px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 40px), calc(33vw - 40px)"
                    className="object-cover rounded-lg sm:rounded-xl "
                    loading="lazy"
                    quality={80}
                    itemProp="image"
                />

                {/* View Project Button */}
                <div className='absolute -bottom-3 sm:-bottom-4  -right-1 z-10 transform transition-all duration-300'>
                    <div className='bg-white dark:bg-Dark_primary rounded-lg sm:rounded-xl  p-1 sm:p-1 hover:shadow-xl hover:-bottom-5 sm:hover:-bottom-6'>
                        <Button_link 
                          
                            text='view project' 
                            href={`/project/details/${item.id}`} 
                            className='text-[10px] sm:text-sm px-2 sm:px-3 py-1 sm:py-2 capitalize font-semibold whitespace-nowrap' 
                         
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col">
                <h3 
                    className="text-xs sm:text-lg md:text-xl font-semibold uppercase leading-tight text-gray-900 dark:text-gray-100 line-clamp-2 sm:line-clamp-3"
                    itemProp="name"
                >
                    {item.title}
                </h3>
                <p 
                    className="text-xs sm:text-base text-gray-600  sm:mt-2 capitalize dark:text-gray-400 line-clamp-2"
                    itemProp="description"
                >
                    {item.slug.replace(/-/g, ' ')}
                </p>
            </div>
        </article>
    );
};

export default TabCard;