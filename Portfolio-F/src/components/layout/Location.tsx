import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import { MapData } from "@/Typeinterface/InterfaceType";

interface Props {
  data: MapData;
}

const Location: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full p-0">
      {/* Map Embed Container */}
      {/* relative added here so that fill image works correctly */}
      <div className="relative w-full  h-100 "> 
        
        {/* Optimized Image */}
        <Image 
          src={data.image} // Now it's a string, works perfectly
          alt="map location" 
          fill 
          className="object-contain" 
          priority
        />

        
        <a
          href={data.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 text-xl font-semibold text-gray-700 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl hover:bg-white transition-all duration-300 group"
        >
          <HiOutlineLocationMarker className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>{data.title}</span>
        </a>

        {/* Decorative Blur (Optional, kept from your design) */}
        <div className='absolute bottom-0 left-0 w-64 h-64 blur-[5rem] rounded-full  -z-0 pointer-events-none'></div>
      </div>
    </div>
  );
};

export default Location;