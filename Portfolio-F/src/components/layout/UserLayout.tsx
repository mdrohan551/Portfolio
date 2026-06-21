"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { MasterLayoutProps } from "@/Typeinterface/InterfaceType";
import BackTotop from "../ui/button/BackTotop";
// import { Spotlight } from "../ui/animation/Spotlight";
import { mockFooterData } from "@/lib/data";

const UserLayout: React.FC<MasterLayoutProps> = ({
  children,
  hideFooter = false,
  className = "",
}) => {
  return (
    <div className={`${className} relative antialiased min-h-screen`}>
      {/* Background Spotlight Effect */}
      {/* <div className=" inset-0 pointer-events-none z-0 overflow-hidden fixed top-0 left-0 ">
        <Spotlight
          className="md:top-[-50%] -top-45 -left-65 sm:left-1 translate-x-[0%]  rotate-0 scale-x-[-1] origin-top blur"
          fill="var(--color-primary)"
        />
      </div> */}

      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-primary backdrop-blur-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-4">{children}</main>

      {/* Back to Top Button */}
      <BackTotop />

      {/* Footer Conditionally Rendered */}
      {!hideFooter && <Footer data={mockFooterData} />}
    </div>
  );
};

export default UserLayout;