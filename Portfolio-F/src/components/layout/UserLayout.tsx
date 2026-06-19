"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { MasterLayoutProps } from "@/Typeinterface/InterfaceType";
import BackTotop from "./BackTotop";
import { Spotlight } from "../ui/animation/Spotlight";
import { mockFooterData } from "@/lib/data";

const UserLayout: React.FC<MasterLayoutProps> = ({
  children,
  hideFooter = false,
  className = "",
}) => {
  return (
    <div className={`${className} relative antialiased min-h-screen`}>
      {/* Background Spotlight Effect */}
      <div className="hidden dark:block inset-0 pointer-events-none z-0 overflow-hidden fixed top-0 left-0 w-full h-full">
        <Spotlight
          className="top-[-12%] -left-65 sm:left-30 translate-x-[0%] rotate-[-0deg] scale-x-[-1] origin-top"
          fill="#78c841"
        />
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-black/20 backdrop-blur-md">
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