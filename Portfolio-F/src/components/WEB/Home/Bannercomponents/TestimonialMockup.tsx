import { testimonialLinks } from '@/lib/data'
import { TestimonialMockupData } from '@/Typeinterface/InterfaceType'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import { FiArrowRight } from 'react-icons/fi'

type Props = {
    data: TestimonialMockupData
}

const TestimonialMockup: React.FC<Props> = ({ data }) => {

    return (

        <div className='w-full mt-5 grid grid-cols-12 gap-5 bg-transparent shadow-lg/3 px-3 py-3 rounded-2xl ring-[0.5px] ring-Light_primary/50 hover:shadow-xl transition-all duration-300 relative'>

            <div className="col-span-12">
                <Link href="/testimonial" className='relative rounded-xl group block'>
                    {/* Changed img to next/Image */}
                    <Image
                        src={data?.image}
                        alt={data?.title || 'Testimonial'}
                        width={800}
                        height={600}
                        className='w-full h-auto object-cover object-center rounded-xl group-hover:ring-2 group-hover:ring-secondary transition-all duration-300'
                    />

                    {/* overlay */}
                    <div className='absolute inset-0 bg-gray-950/40 flex flex-col justify-end p-2 rounded-xl'>

                        {/* hover icon */}
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <span className='text-sm text-white bg-primary rounded-xl px-3 py-1 hover:scale-110 transition-all duration-300 font-jakarta-Semibold capitalize'>
                                view more
                            </span>
                        </div>

                        {/* text */}
                        <span className='text-sm text-white'>{data?.slug}</span>
                        <h3 className='text-xl text-white font-Yanone-Semibold uppercase tracking-[0.2rem]'>
                            {data.title}
                        </h3>

                    </div>
                </Link>

                <div className='grid grid-cols-12 gap-2'>
                    {testimonialLinks.map((link, idx) => (
                        <div className="col-span-6" key={idx}>
                            <Link
                                href={link.to}
                                className={`flex rounded-xl px-2 py-1 flex-col mt-2 font-jakarta-Medium group 
                hover:bg-Light_primary dark:hover:bg-black 
                hover:ring-1 hover:ring-gray-900 dark:hover:ring-gray-500 
                transition-all duration-300 ${link.bg} ${link.textColor} relative`}
                            >

                                <span className='text-sm text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all duration-300'>
                                    {link.smallText}
                                </span>
                                <span className='text-2xl uppercase tracking-[0.2rem] font-Yanone-Semibold group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300'>
                                    {link.largeText}
                                </span>

                                {link.icon === true && (
                                    <FiArrowRight className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 bg-white w-8 h-8 rounded-full group-hover:text-white group-hover:bg-gray-900 dark:group-hover:bg-gray-700 group-hover:-rotate-45 transition-all duration-300" />
                                )}
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default TestimonialMockup