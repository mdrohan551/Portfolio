import React from 'react';
const SingleCardLoader: React.FC = () => {
    return (
        <div className="w-full max-w-sm md:max-w-md rounded-xl bg-white shadow-xl overflow-hidden animate-pulse">
        
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
                    
                    <div>
                        <div className="h-3 w-28 rounded-full bg-gray-200 mb-1"></div>
                        <div className="h-2 w-16 rounded-full bg-gray-200"></div>
                    </div>
                </div>
                <div className="h-6 w-12 rounded-full bg-green-100"></div>
            </div>
            <div className="w-full h-48 bg-gray-200">
                <div className="relative h-full">
                    <div className="absolute bottom-4 right-4 h-12 w-12 rounded-xl bg-green-400"></div>
                </div>
            </div>
            <div className="p-4">
                <div className="h-5 w-3/4 rounded-full bg-gray-300 mb-2"></div>
                <div className="h-3 w-1/2 rounded-full bg-gray-200"></div>
            </div>
        </div>
    );
};

export default SingleCardLoader;