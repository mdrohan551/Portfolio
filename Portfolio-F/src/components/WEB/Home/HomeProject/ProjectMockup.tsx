'use client'

import TabCard from "@/components/ui/card/TabCard";
import Tabs from "@/components/ui/Tabs/Tabs";
import TitleHeading from "@/components/ui/Titleheading.tsx/TitleHeading";
import { projectData } from "@/lib/data";
import React, { useState } from "react";


// same categories jeno bar bar na ase uniq ekta ase 
const categories = [...new Set(projectData.map(item => item.category))];
const ProjectMockup: React.FC = () => {
    const [active, setActive] = useState("design");

    const filtered = projectData
        .filter((item) => item.category === active);

    return (
        <div className=" sm:py-25 relative z-30 overflow-hidden">
            <div className='w-100 h-100 dark:blur-[7rem] blur-3xl rounded-full bg-primary/25 dark:bg-primary/15 absolute top-15 left-1/3 -z-10'></div>
            <TitleHeading title="my work " span="latest " span2="projects " className='dark:text-primary/10 text-gray-100  text-5xl left-1/5 md:left-1/4 md:text-[10rem] font-bold uppercase absolute -z-30  top-1 ' />
            <div className="flex justify-center">
                <Tabs categories={categories} active={active} setActive={setActive} />
            </div>

            {/* 3-card grid */}
            <div className="grid mt-1 md:mt-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 animate-fadeIn">

                {filtered.map((item) => (
                    <TabCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ProjectMockup;
