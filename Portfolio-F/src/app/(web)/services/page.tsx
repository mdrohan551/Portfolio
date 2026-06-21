import Breadcrumb from "@/components/ui/Breadcrumb";
import Services from "@/components/WEB/services/Services";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professional Web Development Services | Rohan Mohammad",
    description: "Explore premium web development services including Frontend, Backend, Fullstack, and UI/UX Design. High-performance Next.js & MERN stack solutions.",
    keywords: ["web development", "nextjs developer", "mern stack", "frontend services", "backend api", "rohan mohammad"],
    openGraph: {
        title: "Professional Web Development Services",
        description: "Premium web development services tailored for modern businesses.",
        type: "website",
    },
};

const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
];

const titles = {
    h1: "Explore -my",
    span: "Services ✦ "
};

const ServicesPage = async () => {
    return (
        <>
            <div className="mb-10">
                <Breadcrumb link_items={breadcrumbItems} titles={titles} />
                <Services />
            </div>
        </>
    );
};

export default ServicesPage;