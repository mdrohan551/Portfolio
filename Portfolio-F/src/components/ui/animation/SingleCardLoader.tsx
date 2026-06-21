import React from 'react';

const SingleCardLoader: React.FC = () => {
    return (
        <div className="w-full rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden animate-pulse h-full flex flex-col">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0"></div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="h-3 w-24 sm:w-32 rounded-full bg-gray-300 dark:bg-gray-600 mb-1.5 sm:mb-2"></div>
                        <div className="h-2 w-16 sm:w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                </div>
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-green-200 dark:bg-green-900/40 flex-shrink-0"></div>
            </div>

            {/* Image Skeleton */}
            <div className="w-full h-40 sm:h-48 md:h-56 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-shimmer"></div>
                
                {/* View Button Skeleton */}
                <div className="absolute -bottom-4 -right-3 h-12 w-20 sm:w-24 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Content Skeleton */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="h-5 sm:h-6 w-3/4 rounded-full bg-gray-300 dark:bg-gray-600 mb-2 sm:mb-3"></div>
                <div className="h-4 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
        </div>
    );
};

export default SingleCardLoader;