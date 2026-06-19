import type { Metadata } from "next";
import UserLayout from "@/components/layout/UserLayout";
export const metadata: Metadata = {
  title: {
    default: "Rohan Mohammad | Full-Stack Developer & Next.js Specialist",
    template: "%s | Rohan Mohammad",
  },
  description:
    "Professional Full-Stack Web Developer specializing in Next.js, MERN Stack, and TypeScript. I build high-performance, SEO-friendly web applications.",
  keywords: [
    "Next.js Developer",
    "MERN Stack Developer",
    "Full-Stack Web Development",
    "React.js Expert",
    "TypeScript Developer",
    "UI/UX Implementation",
    "Freelance Developer Bangladesh",
    "Redux Toolkit",
    "Tailwind CSS",
  ],
  authors: [{ name: "Rohan Mohammad", url: "https://yourportfolio.com" }],
  creator: "Rohan Mohammad",
  publisher: "Rohan Mohammad",
  openGraph: {
    title: "Rohan Mohammad | Full-Stack Developer & Next.js Specialist",
    description:
      "Building scalable, high-performance web applications with Next.js & MERN Stack. Check out my projects and services.",
    url: "https://yourportfolio.com",
    siteName: "Rohan Mohammad Portfolio",
    images: [
      {
        url: "/images/myimage.png",
        width: 1200,
        height: 630,
        alt: "Rohan Mohammad - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Mohammad | Full-Stack Developer",
    description: "Expert in Next.js, MERN Stack, and Modern Web Technologies.",
    images: ["/images/myimage.png"],
    creator: "@rohan_webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserLayout>
      {children}
    </UserLayout>
  );
}