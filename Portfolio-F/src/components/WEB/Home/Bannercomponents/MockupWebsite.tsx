import { ProjectMokcupImages } from '@/Typeinterface/InterfaceType'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Button_link from '@/components/ui/button/Button_link'

type Props = {
    data: ProjectMokcupImages
}

const MockupWebsite: React.FC<Props> = ({ data }) => {
    return (
        <div className='w-full mt-5 relative group rounded-2xl z-20'>
            {/* Main Card Container */}
            <div className='w-full h-full grid grid-cols-12 gap-1 md:gap-1 bg-transparent shadow-lg/3 px-3 md:px-5 py-6 md:py-8 rounded-2xl ring-[0.5px] ring-Light_primary/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden'>

                {/* Mockup Images */}
                {data.images && data.images.map((item, index) => (
                    <div key={index} className='col-span-4 md:col-span-4 flex justify-center dark:bg-white/15 dark:ring-1 dark:ring-primary/50'>
                        <div className="shadow-sm md:shadow-lg p-1 w-full h-full rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-95">
                            <Image
                                src={item}
                                alt={typeof item === 'string' ? item : 'Project Mockup'}
                                width={300}
                                height={200}
                                className='w-full h-auto object-cover rounded-md'
                            />
                        </div>
                    </div>
                ))}

                {/* Bottom Info */}
                <div className='grid grid-cols-12 col-span-12 relative z-10 mt-2 md:mt-0'>
                    <div className='col-span-6'>
                        <span className='text-xs md:text-sm text-gray-500'>{data?.slug}</span>
                        <h3 className='text-lg md:text-xl text-secondary font-Yanone-Semibold uppercase tracking-[0.1rem] md:tracking-[0.2rem]'>{data?.title}</h3>
                    </div>
                    <div className='col-span-6 flex flex-col items-end justify-center'>
                        <span className='text-xs md:text-sm text-gray-500'>Client work</span>
                        <h3 className='text-lg md:text-xl text-secondary font-Yanone-Semibold uppercase tracking-[0.1rem] md:tracking-[0.2rem]'>production</h3>
                    </div>
                </div>

                {/* Background blur circle */}
                <div className="absolute inset-0 bottom-0 -z-10 pointer-events-none">
                    <div className="w-50 h-50 bg-primary/25 rounded-full blur-3xl"></div>
                </div>

                {/* Desktop Hover Overlay (Hidden on Mobile) */}
                <Link href={`/project`} className='hidden md:flex absolute inset-0 bg-black/80 backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-30 rounded-2xl cursor-pointer'>
                    <span className='text-white text-2xl font-Yanone-Semibold uppercase tracking-[0.3rem] translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                        See Projects
                    </span>
                </Link>
            </div>

            {/* Mobile Action Button (Visible only on Mobile) */}
            <div className='md:hidden -mt-3 flex justify-center'>
               <Button_link text='Project' className='uppercase px-2 py-1' href='/project'/>
            </div>
        </div>
    )
}

export default MockupWebsite