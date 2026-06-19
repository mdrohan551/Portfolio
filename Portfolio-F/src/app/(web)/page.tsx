import Banner from "@/components/WEB/Home/HomeBanner";
import HomeSidebar from "@/components/WEB/Home/HomeSidebar";
import { homeBannerData } from "@/lib/data";



const HomePage = async () => {
  return (
    <>
      

            {/* Page content */}
            <div className="grid grid-cols-12 container mx-auto gap-5 px-2 pt-10">
                <div className="col-span-12 md:col-span-3 ">
                    <HomeSidebar  />
                </div>
                <div className="col-span-12 md:col-span-9 ">
                    <Banner data={homeBannerData} />
                </div>
                {/* <div className="col-span-12">

                <ProjectMockup />
                </div> */}

                
            </div>
           
        </>
  );
};

export default HomePage;