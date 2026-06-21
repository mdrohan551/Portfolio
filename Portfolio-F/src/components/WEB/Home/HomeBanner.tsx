


import React from 'react'

import BannerHeading from './Bannercomponents/BannerHeading'
import SpecializationLogo from './Bannercomponents/SpecializationLogo'

import MockupWebsite from './Bannercomponents/MockupWebsite'
import TestimonialMockup from './Bannercomponents/TestimonialMockup'
import { HomeBannerData, ProjectMokcupImages, Skill, SpecializationItem, TestimonialMockupData } from '@/Typeinterface/InterfaceType'


type props = {
  SKILLS_DATA?:Skill[],
  data: HomeBannerData,
  projectMokcupImagesData: ProjectMokcupImages,
  specializationData: SpecializationItem,
  testimonialMockupData: TestimonialMockupData
}
const Banner: React.FC<props> = ({SKILLS_DATA, data, projectMokcupImagesData, specializationData, testimonialMockupData }) => {
  const { entryName, title, description, skillTags } = data;
  return (
    <div className="w-full flex flex-col  ">
      <BannerHeading entryName={entryName} title={title} description={description} skillTags={skillTags} />

      <div className="grid grid-cols-12 gap-2 z-20">
        <div className="col-span-12 md:col-span-4">
          <SpecializationLogo data={specializationData} SKILLS_DATA={SKILLS_DATA} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <MockupWebsite data={projectMokcupImagesData} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <TestimonialMockup data={testimonialMockupData} />
        </div>

      </div>


    </div>
  )
}

export default Banner
