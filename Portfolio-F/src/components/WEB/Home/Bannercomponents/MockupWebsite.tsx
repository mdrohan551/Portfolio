import { ProjectMokcupImages } from '@/Typeinterface/InterfaceType'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

type Props = {
    data: ProjectMokcupImages
}

const MockupWebsite: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Link href={`/project`} className='w-full z-20 mt-5 grid grid-cols-12 gap-1 bg-transparent shadow-lg/3 px-5 py-8 rounded-2xl ring-[0.5px] ring-Light_primary/50 hover:shadow-xl transition-all duration-300 relative'>

                {data.images && data.images.map((item, index) => (
                    <div key={index} className='col-span-4 md:col-span-4 flex justify-center dark:bg-white/15 dark:ring-1 dark:ring-primary/50'>
                        <div className="shadow-lg p-1 w-full h-full rounded-lg  flex items-center justify-center">
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




                <div className='grid grid-cols-12 col-span-12 '>
                    <div className='col-span-6 mt-1 '>
                        <span className='text-sm text-gray-500 '>{data?.slug}</span>
                        <h3 className='text-xl text-secondary font-Yanone-Semibold uppercase tracking-[0.2rem]'>{data?.title}</h3>
                    </div>
                    <div className='col-span-6 flex flex-col items-end justify-center'>
                        <span className='text-sm text-gray-500 '>Client work</span>
                        <h3 className='text-xl text-secondary font-Yanone-Semibold uppercase tracking-[0.2rem]'>production</h3>
                    </div>

                </div>

                {/* Background blur circle */}
                <div className="absolute inset-0 bottom-0 -z-10">
                    <div className="w-50 h-50 bg-primary/25 rounded-full blur-3xl"></div>
                </div>

            </Link>
        </>
    )
}

export default MockupWebsite