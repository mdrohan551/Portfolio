import React from "react";
import { categoryIcons } from "../Home/category/categoryIcons";
import { BiRightArrowAlt } from "react-icons/bi";


// Props Interface
interface Props {
    categories: string[];
    active: string;
    setActive: (cat: string) => void;
}
const CommonTabs: React.FC<Props> = ({ categories, active, setActive }) => {
    return (
        <div className="flex flex-col bg-white dark:bg-Dark_primary shadow-xl/3 rounded-lg overflow-hidden border border-gray-100 dark:border-Light_primary">
            <div className="text-2xl  font-semibold text-white bg-secondary p-6">
                Categories
            </div>
            <div className="gap-5 flex flex-col  px-3  py-3">
                {categories.map((cat) => {
                    const isActive = active.toLowerCase() === cat.toLowerCase();

                    return (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`
                                flex justify-between group items-center w-full px-5 py-5 rounded-lg text-left transition-all duration-300 ease-in-out cursor-pointer text-sm font-semibold uppercase hover:bg-primary hover:text-white
                                
                                ${isActive
                                    ? 'bg-primary text-white shadow-xl'
                                    : 'text-gray-700 ring-primary/50 ring-1 hover:bg-gray-50'
                                }
                            `}
                        >
                            <span className='flex items-center whitespace-nowrap text-gray-800 dark:text-gray-200 '>
                                {categoryIcons[cat.toLowerCase()]}
                                {cat}

                            </span>
                            <div className={`w-5 h-5 ml-2 group-hover:text-black bg-white flex items-center rounded-full ${isActive ? 'text-gray-800  ' : 'text-gray-400 dark:text-gray-600'}`}>

                                <BiRightArrowAlt size={24} className="group-hover:-rotate-45 transition-all duration-300" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CommonTabs;