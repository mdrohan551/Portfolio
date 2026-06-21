import Banner from "@/components/WEB/Home/HomeBanner";
import ProjectMockup from "@/components/WEB/Home/HomeProject/ProjectMockup";
import HomeSidebar from "@/components/WEB/Home/HomeSidebar";

import { projectMokcupImagesData, specializationData, testimonialMockupData ,homeBannerData,SKILLS_DATA} from '@/lib/data'


const HomePage = async () => {
    return (
        <>
            {/* Page content */}
            <div className="grid grid-cols-12 container  mx-auto gap-0 md:gap-5 px-2 pt-1 md:pt-10">
                <div className="col-span-12 md:col-span-3 ">
                    <HomeSidebar />
                </div>
                <div className="col-span-12 md:col-span-9 ">
                    <Banner SKILLS_DATA={SKILLS_DATA} data={homeBannerData} projectMokcupImagesData={projectMokcupImagesData} specializationData={specializationData} testimonialMockupData={testimonialMockupData} />
                </div>
                <div className="col-span-12">
                    <ProjectMockup />
                </div>
            </div>

        </>
    );
};

export default HomePage;