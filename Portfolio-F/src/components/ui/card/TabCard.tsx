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
        <div className="relative bg-white dark:bg-Dark_primary/30 dark:backdrop-blur-3xl p-4 ring-[0.5px] ring-Light_primary/50 shadow-lg/5 rounded-2xl font-sans   transition-all duration-300 hover:shadow-xl/7 group">
            <div className="flex items-center justify-between mb-6 ring-1 ring-gray-100 dark:ring-gray-700 p-4 rounded-xl">
                <div className="flex items-center">
                    {/* User Mockup Image */}
                    <div className="relative w-10 h-10 mr-3 shrink-0">
                        <Image
                            src={mydata?.image || ""}
                            alt="Author Mockup"
                            fill
                            sizes="40px"
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{mydata?.name}</p>
                        <p className="text-xs text-gray-500 capitalize dark:text-gray-400">{item.category}</p>
                    </div>
                </div>
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center cursor-pointer opacity-70 transition duration-300 hover:opacity-100">
                    <FiArrowRight className="w-4 h-4 text-green-700 transform -rotate-45" />
                </div>
            </div>

            {/* Project Image Section */}
            <div className="relative w-full rounded-xl h-64 mb-6 ">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-2xl"
                />
                <div className='mt-5 absolute -bottom-4 -right-3 px-2 py-2 bg-white dark:bg-Dark_primary rounded-xl flex items-center justify-center transform cursor-pointer duration-300 z-10'>
                    <Button_link text='view project' href={`/project/details/${item.id}`} className='text-sm px-3 py-2 capitalize' />
                </div>
            </div>

            <h2 className="text-xl font-semibold uppercase leading-tight text-gray-900 dark:text-gray-100">
                {item.title}
            </h2>
            <p className="text-md md:text-lg text-gray-600 mt-2 capitalize dark:text-gray-400">{item.slug.replace(/-/g, ' ')}</p>
        </div>
    );
};

export default TabCard;