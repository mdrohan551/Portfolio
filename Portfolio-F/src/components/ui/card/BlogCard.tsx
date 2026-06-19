import React from 'react';
import { FaBookOpen, FaCalendarAlt } from 'react-icons/fa'; // Added Calendar Icon
import Button_link from '../button/Button_link';
import type { BlogCard as BlogCardType } from '../Typeinterface/InterfaceType';

interface Props {
  data: BlogCardType;
}

const BlogCard: React.FC<Props> = ({ data }) => {
  const IconComponent = FaBookOpen;

  return (
    <div className="
      bg-white dark:bg-Dark_primary rounded-2xl shadow-lg/3 
      hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden
      transform flex flex-col h-full border border-gray-100 dark:border-gray-600 p-2
    ">
      {/* Thumbnail Section */}
      {data.img && (
        <div className="relative aspect-video bg-gray-50 dark:bg-gray-500/20 overflow-hidden rounded-t-xl">
          <img
            src={data.img}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
             <span className="bg-white/90 dark:bg-Dark_primary backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border dark:border-gray-600 border-gray-100 uppercase tracking-wider">
               Tech Blog
             </span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="px-3 py-4 flex flex-col flex-1">
        {/* Date Section */}
        <div className="flex items-center gap-2 mb-2 text-gray-400">
          <FaCalendarAlt className="w-3 h-3" />
          <span className="text-[11px] font-medium tracking-wide">{data.date}</span>
        </div>

        <div className="flex items-start mb-2">
          <div className="mr-2 mt-1 text-primary">
            <IconComponent className="w-4 h-4" />
          </div>
          <h3 className="text-[15px] font-bold text-gray-900 dark:text-gray-200 uppercase leading-tight">
            {data.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm flex-1 leading-relaxed line-clamp-3 dark:text-gray-300">
          {data.shortDes}
        </p>

        {/* Tags Section */}
        {data.tag && data.tag.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {data.tag.map((t) => (
              <h1
                key={t}
                className="bg-Light_primary dark:bg-gray-50/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-md border border-primary/5"
              >
                #{t}
              </h1>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="flex mt-5 pt-3 border-t border-gray-50">
          <Button_link 
            text="Read Full Blog" 
            href={`/blog-details/${data.id}`} 
            className="text-xs px-4 py-2 capitalize font-semibold tracking-wide" 
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;