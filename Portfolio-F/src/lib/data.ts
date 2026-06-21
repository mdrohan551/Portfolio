import type {
  AboutData,
  BlogCard,
  BlogDetail,
  ContactInfo,
  contactsociallink,
  ExperienceItem,
  FAQ,
  FooterData,
  HomeBannerData,
  MapData,
  menuInterface,
  ProjectCard,
  ProjectDetails,
  ProjectMokcupImages,
  ServiceDetail,
  SidebarBanner,
  SidebarBannerIcon,
  Skill,
  SpecializationItem,
  Testimonial,
  TestimonialLink,
  TestimonialMockupData,
} from "../Typeinterface/InterfaceType";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaWhatsapp, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

// my logo dark white 
// Note: In Next.js, ensure these paths are correct relative to this file or use '@/public/...' if configured
// import logoWhite from '/lightlogo.png';
// import darklogo from '/darklogo.png';
import myimage from '@/assets/images/myimage.png';
import react from '@/assets/images/react-logo.webp';
import nextjs from '@/assets/images/nextjs-logo.webp';
import mern from '@/assets/images/mern.webp';
import js from '@/assets/images/js-logo.webp';
import redux from '@/assets/images/redux-logo.webp';
import ts from '@/assets/images/typescript-logo.webp';
import html from '@/assets/images/html-logo.webp';
import bootsrap from '@/assets/images/bootstrap.webp';
import css from '@/assets/images/css.webp';
import fremermotion from '@/assets/images/fremermotion.webp';
import github from '@/assets/images/github-logo.webp';
import gsap from '@/assets/images/gsap.webp';
import Postman from '@/assets/images/Postman.webp';
import expressimg from '@/assets/images/express.webp';
import vs from '@/assets/images/vs.webp';
import node from '@/assets/images/node.webp';
import tailwind from '@/assets/images/tailwind.webp';
import fullstack from '@/assets/images/fullstack.webp';
import ux from '@/assets/images/ux.webp';
import mongodb from '@/assets/images/mongodb.webp';
import ai from '@/assets/images/ai.webp';
import ssl from '@/assets/images/ssl.webp';
import strip from '@/assets/images/stripe.webp';

// project mockup images
import mokcup1 from "@/assets/images/Website-Design-Mockup.jpg";
import mokcup2 from "@/assets/images/website_mockup.jpg";
import mokcup3 from "@/assets/images/website_mockup2jpg.jpg";

// testimonialMockupData
import testimonialImg from "@/assets/images/testimonialcover.png";

import { AiOutlineThunderbolt } from "react-icons/ai";

// map data
import mapImg from "@/assets/images/map.png";

// nav bar
export const navBar: menuInterface[] = [
  { title: "home", href: "/" },
  { title: "project", href: "/project" },
  { title: "services", href: "/services" },
  { title: "about us", href: "/about" },
  { title: "Testimonial", href: "/testimonial" },
  { title: "Blog", href: "/blog" },
  { title: "FAQs", href: "/faq" },
];

// side bar banner data
export const mydata: SidebarBanner<SidebarBannerIcon> = {
  image: myimage,
  entryName: "Hy! i'm",
  name: " Rohan Mohammad",
  slug: "Software Engineer || Next.js || MERN",
  email: "armanhossain0175019@gmail.com",
  phone: "01750192098",
  icons: [
    { Icon: FaFacebook, href: "https://www.facebook.com/rohanmohammad404" },
    { Icon: FaInstagram, href: "https://www.instagram.com/rohan_webp/" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/in/rohanmohammad" },
    { Icon: FaGithub, href: "https://github.com/mdrohan551" },
  ],
};

// home  banner data

export const homeBannerData: HomeBannerData = {
  entryName: "Hi! there, I'm ✦",
  title: ["Professional", "Web Application", "Specialist "],
  description:
    " Full-stack web developer skilled in building high-performance, responsive web applications. Experienced in both front-end (JavaScript, TypeScript, React, Next.js) and back-end (Node.js, Express, MongoDB) development. Proficient in Redux, Tailwind CSS, and Git for delivering production-ready applications.",

  // skillTags = website keywords / filters (lowercase, concise)
  skillTags: [
    "javascript",
    "es6",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "express",
    "mongodb",
    "redux",
    "redux-toolkit",
    "tailwindcss",
    "html5",
    "css3",
    "rest",
    "testing-library",
    "git",
    "cupcut",
    "python basic"
  ],
};

// experience about us
export const experienceData: ExperienceItem[] = [
  { title: "HTML", percentage: 100 },
  { title: "CSS", percentage: 90 },
  { title: "JavaScript", percentage: 85 },
  { title: "React.js", percentage: 80 },
  { title: "Next.js", percentage: 75 },
  { title: "MERN Stack", percentage: 75 },
];

//  specialization services offer
export const specializationData: SpecializationItem = {
  logo: [
    { images: react },
    { images: nextjs },
    { images: js },
    { images: redux },
  ],
  slug: "specialization",
  title: "Services Offer",
};

// project mokcup images data
export const projectMokcupImagesData: ProjectMokcupImages = {
  images: [mokcup1, mokcup2, mokcup3],
  slug: "showcase view ",
  title: "Projects",
};

// what client say testimonial mockup
export const testimonialMockupData: TestimonialMockupData = {
  image: testimonialImg,
  slug: "What Client Say?",
  title: "testimonials",
};

// Example: src/constants/Data/data.ts
export const testimonialLinks: TestimonialLink[] = [
  {
    to: "/blog",
    smallText: "visit our blog",
    largeText: "blog",
    bg: "bg-gray-900",
    textColor: "text-white",
    icon: null, // যদি icon না থাকে
  },
  {
    to: "/contact-us",
    smallText: "Let's work",
    largeText: "contact",
    bg: "bg-primary",
    textColor: "text-white",
    icon: true, // icon দেখাতে চাইলে
  },
];

// footer

export const mockFooterData: FooterData = {
  logoText: "logoWhite",
  darklogo: "darklogo",
  cta: {
    iconPlaceholder: AiOutlineThunderbolt,
    title: "Ready to Build Something Extraordinary?",
    subtitle:
      "Let’s turn your ideas into scalable, high-performance digital experiences.",
    buttonText: "Start Now",
    buttonLink: "/contact-us",
  },

  navigation: [
    { link: "#contact", label: "Contact" },
    { link: "#privacy", label: "Privacy" },
    { link: "#faqs", label: "FAQs" },
  ],

  socialLinks: [
    { name: "Github", url: "https://github.com/mdrohan551", icon: FaGithub },
    {
      name: "Instagram",
      url: "https://www.instagram.com/rohan_webp/",
      icon: FaInstagram,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/rohanmohammad404",
      icon: FaFacebook,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rohanmohammad",
      icon: FaLinkedin,
    },
  ],
};

export const myMap: MapData = {
  title: "My Location",
  mapLink: "https://maps.app.goo.gl/3MzbzwkgcvEdsmU36",
  image: mapImg,
};

// home project mockup data

export const projectData: ProjectCard[] = [
  {
    id: 1,
    title: "UI Design Concept",
    slug: "modern minimal ui",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    category: "design",
  },
  {
    id: 2,
    title: "Brand Design System",
    slug: "creative brand ui",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    category: "design",
  },
  {
    id: 3,
    title: "Dashboard Mockup",
    slug: "analytics dashboard",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    category: "design",
  },
  {
    id: 4,
    title: "REST API Service",
    slug: "node express api",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    category: "api",
  },
  {
    id: 5,
    title: "Auth API System",
    slug: "jwt passport",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    category: "api",
  },
  {
    id: 6,
    title: "Payment API",
    slug: "stripe integration",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "api",
  },
  {
    id: 7,
    title: "Inventory Manager",
    slug: "warehouse software",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    category: "inventory",
  },
  {
    id: 8,
    title: "Stock Tracker",
    slug: "product stock module",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    category: "inventory",
  },
  {
    id: 9,
    title: "Barcode Scanner",
    slug: "auto scan system",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381",
    category: "inventory",
  },
  {
    id: 10,
    title: "E-commerce Store",
    slug: "fashion ecommerce",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "ecommerce",
  },
  {
    id: 11,
    title: "Digital Shop",
    slug: "gadget shop",
    image: "https://images.unsplash.com/photo-1588591795212-48e8f67ed1fd",
    category: "ecommerce",
  },
  {
    id: 12,
    title: "Digital Shop",
    slug: "gadget shop",
    image: "https://images.unsplash.com/photo-1588591795212-48e8f67ed1fd",
    category: "ecommerce",
  },
  {
    id: 13,
    title: "Online Store UI",
    slug: "modern ecommerce ui",
    image: "https://images.unsplash.com/photo-1557825835-30c1eacc3d32",
    category: "ecommerce",
  },
];

export const projectDetails: ProjectDetails[] = [
  {
    id: 101,
    cardId: 1,
    projectName: "UI Design Concept",
    category: "design",
    date: "12 Oct 2024",
    // Fixed: Use public path starting with /
    bannerImg: "/original-c6a72b1649c9ba7b49f8b363761c669f.webp",
    overview:
      "A clean and modern UI design concept for web and mobile applications.",
    keyFeatures: [
      "Minimalist design",
      "Responsive layout",
      "User-friendly navigation",
    ],
    technologies: ["Figma", "Adobe XD", "TailwindCSS"],
    liveLink: "https://example.com/ui-design-concept",
  },
  {
    id: 102,
    cardId: 2,
    projectName: "Brand Design System",
    category: "design",
    date: "15 Oct 2024",
    bannerImg: "https://images.unsplash.com/photo-1581091870627-3a684eec73ec",
    overview:
      "A comprehensive brand design system for consistent visual identity.",
    keyFeatures: [
      "Color palette",
      "Typography system",
      "UI components library",
    ],
    technologies: ["Figma", "Sketch", "Illustrator"],
    liveLink: "https://example.com/ui-design-concept",
  },
  {
    id: 103,
    cardId: 3,
    projectName: "Dashboard Mockup",
    category: "design",
    date: "20 Oct 2024",
    bannerImg: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    overview: "A mockup of analytics dashboard for monitoring key metrics.",
    keyFeatures: [
      "Data visualization",
      "Charts & graphs",
      "Interactive widgets",
    ],
    technologies: ["Figma", "Chart.js", "React"],
    liveLink: "https://example.com/ui-design-concept",
  },
  {
    id: 104,
    cardId: 4,
    projectName: "REST API Service",
    category: "api",
    date: "25 Oct 2024",
    bannerImg: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    overview:
      "RESTful API service built with Node.js and Express for backend integration.",
    keyFeatures: ["CRUD operations", "Authentication", "Error handling"],
    technologies: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 105,
    cardId: 5,
    projectName: "Auth API System",
    category: "api",
    date: "01 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    overview: "Secure authentication API using JWT and Passport.js.",
    keyFeatures: ["Token-based auth", "Role management", "Password encryption"],
    technologies: ["Node.js", "Express", "JWT", "Passport.js"],
  },
  {
    id: 106,
    cardId: 6,
    projectName: "Payment API",
    category: "api",
    date: "05 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    overview:
      "Payment API integration for handling online transactions securely.",
    keyFeatures: [
      "Stripe integration",
      "Secure transactions",
      "Webhook support",
    ],
    technologies: ["Node.js", "Stripe API", "Express"],
  },
  {
    id: 107,
    cardId: 7,
    projectName: "Inventory Manager",
    category: "inventory",
    date: "10 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1581091012184-5c1f9f7b6858",
    overview:
      "Inventory management system for tracking warehouse stock efficiently.",
    keyFeatures: [
      "Stock tracking",
      "Low inventory alerts",
      "Reports generation",
    ],
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 108,
    cardId: 8,
    projectName: "Stock Tracker",
    category: "inventory",
    date: "15 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    overview: "Module for real-time stock tracking and updates.",
    keyFeatures: [
      "Live updates",
      "Detailed product info",
      "Barcode scanning support",
    ],
    technologies: ["React", "Redux", "Firebase"],
  },
  {
    id: 109,
    cardId: 9,
    projectName: "Barcode Scanner",
    category: "inventory",
    date: "20 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1527430253228-e93688616381",
    overview:
      "Automated barcode scanning system for faster inventory management.",
    keyFeatures: ["Fast scanning", "Product lookup", "History logs"],
    technologies: ["React", "QuaggaJS", "Node.js"],
  },
  {
    id: 110,
    cardId: 10,
    projectName: "E-commerce Store",
    category: "ecommerce",
    date: "25 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    overview:
      "A modern fashion e-commerce store with smooth shopping experience.",
    keyFeatures: ["Product catalog", "Cart & checkout", "Responsive UI"],
    technologies: ["React", "Next.js", "Stripe API"],
  },
  {
    id: 111,
    cardId: 11,
    projectName: "Digital Shop",
    category: "ecommerce",
    date: "30 Nov 2024",
    bannerImg: "https://images.unsplash.com/photo-1588591795212-48e8f67ed1fd",
    overview: "Online store for digital gadgets with secure payment options.",
    keyFeatures: ["Product listing", "Order tracking", "Secure payment"],
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 112,
    cardId: 13,
    projectName: "Online Store UI",
    category: "ecommerce",
    date: "05 Dec 2024",
    bannerImg: "https://images.unsplash.com/photo-1557825835-30c1eacc3d32",
    overview: "Modern e-commerce UI design for smooth user experience.",
    keyFeatures: ["Clean UI", "Mobile friendly", "Easy navigation"],
    technologies: ["Figma", "React", "TailwindCSS"],
  },
];

// services desgin

export const services = [
  {
    id: "svc-1",
    title: "Next.js Production Website",
    shortDesc: "SEO-friendly and fast-loading Next.js websites (SSR/SSG).",
    tag: "Frontend",
    hasIcon: true,
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-2",
    title: "MERN Full-Stack Development",
    shortDesc:
      "Full production-ready MERN apps with secure backend and dashboards.",
    tag: "Full-Stack",
    hasIcon: true,
    stack: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-3",
    title: "UI/UX Implementation (Tailwind/Bootstrap)",
    shortDesc: "Pixel-perfect responsive UI development.",
    tag: "Design",
    hasIcon: true,
    stack: ["Tailwind CSS", "Bootstrap", "Framer Motion", "GSAP"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-4",
    title: "Performance Optimization & SEO",
    shortDesc: "Lighthouse score improvement and bundle optimization.",
    tag: "Performance",
    hasIcon: true,
    stack: ["Next.js", "Lighthouse", "Image CDN", "Bundle Analyzer"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-5",
    title: "API Development & Integration",
    shortDesc: "REST/GraphQL APIs, Stripe, Cloudinary integrations.",
    tag: "API",
    hasIcon: true,
    stack: ["Node.js", "Express", "GraphQL", "Stripe", "Cloudinary"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-6",
    title: "Admin Dashboards & Analytics",
    shortDesc: "Dashboard, charts, role-based access, and analytics.",
    tag: "Dashboard",
    hasIcon: true,
    stack: ["React", "Chart.js", "Recharts", "WebSocket"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-7",
    title: "E-commerce Implementation",
    shortDesc: "Product catalog, cart, checkout & payment systems.",
    tag: "E-commerce",
    hasIcon: true,
    stack: ["React/Next.js", "Stripe", "MongoDB", "Cloudinary/S3"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-8",
    title: "Bug Fixing, Refactor & Code Review",
    shortDesc: "Bug fixing, TypeScript migration, and full code review.",
    tag: "Maintenance",
    hasIcon: true,
    stack: ["React", "TypeScript", "ESLint", "Prettier"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-9",
    title: "DevOps & Deployment",
    shortDesc: "Vercel, Netlify, Docker & CI/CD setup.",
    tag: "DevOps",
    hasIcon: true,
    stack: ["Vercel", "Netlify", "Docker", "GitHub Actions"],
    thumbnail: "/images/demoThumnai.webp",
  },
  {
    id: "svc-10",
    title: "Training & Mentorship",
    shortDesc: "Next.js, MERN, TypeScript training with interview prep.",
    tag: "Training",
    hasIcon: true,
    stack: ["Next.js", "React", "TypeScript", "MERN"],
    thumbnail: "/images/demoThumnai.webp",
  },
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: "sd-1",
    serviceId: "svc-1",
    title: "Next.js Production Website — Details",
    description:
      "SEO-friendly, high-performance websites using Next.js with SSR/SSG/ISR.",
    features: [
      "SSR/SSG setup",
      "Next/Image optimization",
      "SEO meta & Open Graph",
      "Lighthouse performance tuning",
    ],
    faqs: [
      {
        question: "How long does it take to complete a Next.js website?",
        answer: "Simple sites take 2–4 weeks, advanced sites 6–10 weeks.",
      },
      {
        question: "What do you need before starting?",
        answer: "Design references, content, branding assets, feature list.",
      },
    ],
    notes: ["Recommended deployment: Vercel", "Optional: TypeScript migration"],
    images: [
      "/images/website_mockup2jpg.jpg",
      "/images/website_mockup2jpg.jpg",
    ],
  },
  {
    id: "sd-2",
    serviceId: "svc-2",
    title: "MERN Full-Stack — Details",
    description:
      "Complete MERN apps including authentication, dashboard, API, and cloud storage.",
    features: [
      "REST API",
      "JWT Authentication",
      "Role-based access",
      "File upload & Cloudinary",
    ],
    faqs: [
      {
        question: "How long does a MERN project take?",
        answer: "Basic: 3–5 weeks; advanced with dashboards: 6–12 weeks.",
      },
      {
        question: "Will you provide documentation?",
        answer: "Yes, full API docs and project setup guides are included.",
      },
    ],
    notes: ["Preferred DB: MongoDB Atlas", "Security: Helmet, Rate-limiting"],
    images: [
      "/images/website_mockup2jpg.jpg",
      "/images/website_mockup2jpg.jpg",
    ],
  },
  {
    id: "sd-3",
    serviceId: "svc-3",
    title: "UI/UX Implementation — Details",
    description:
      "Pixel-perfect, responsive UI with Tailwind, Bootstrap, and Framer Motion.",
    features: [
      "Pixel perfect",
      "Responsive",
      "Accessible UI",
      "Smooth animations",
    ],
    faqs: [
      {
        question: "Do you convert Figma to code?",
        answer: "Yes, full Figma/XD/PSD to modern UI conversion.",
      },
      {
        question: "Do you support animations?",
        answer: "Yes, Framer Motion and GSAP animations included.",
      },
    ],

    images: [
      "/images/website_mockup2jpg.jpg",
      "/images/website_mockup2jpg.jpg",
    ],
  },
];

// skills

export const SKILLS_DATA: Skill[] = [
  // Fullstack & Dev
  {
    name: "Full Stack Web Development",
    iconPath: fullstack,
    category: "Fullstack & Dev",
  },
  { name: "MERN Stack", iconPath: mern, category: "Fullstack & Dev" },
  {
    name: "Payment Integration (Stripe)",
    iconPath: strip,
    category: "Fullstack & Dev",
  },
  {
    name: "Payment Integration ( SSL Commerz)",
    iconPath: ssl,
    category: "Fullstack & Dev",
  },

  // Frontend
  { name: "React", iconPath: react, category: "Frontend" },
  { name: "Next.js", iconPath: nextjs, category: "Frontend" },
  { name: "JavaScript (ES6+)", iconPath: js, category: "Frontend" },
  { name: "HTML", iconPath: html, category: "Frontend" },
  { name: "CSS", iconPath: css, category: "Frontend" },
  { name: "Bootstrap", iconPath: bootsrap, category: "Frontend" },
  { name: "Tailwind CSS", iconPath: tailwind, category: "Frontend" },
  { name: "GSAP", iconPath: gsap, category: "Frontend" },
  { name: "Framer Motion", iconPath: fremermotion, category: "Frontend" },
  { name: "UI with Coding", iconPath: ux, category: "Frontend" },

  // Backend & DB
  { name: "Node.js", iconPath: node, category: "Backend & DB" },
  { name: "Express.js", iconPath: expressimg, category: "Backend & DB" },
  { name: "MongoDB", iconPath: mongodb, category: "Backend & DB" },
  { name: "TypeScript", iconPath: ts, category: "Backend & DB" },

  // Tools & Other
  { name: "Git & GitHub", iconPath: github, category: "Tools & Other" },
  { name: "Postman", iconPath: Postman, category: "Tools & Other" },
  { name: "VS Code", iconPath: vs, category: "Tools & Other" },
  {
    name: "AI / LLM Basic Integration",
    iconPath: ai,
    category: "Tools & Other",
  },
];

export type SkillCategory = Skill["category"];

// about us
export const aboutData: AboutData = {
  title: "✦ About Me",

  tagline: {
    prefix: "Remote-ready Full-Stack Engineer specializing in ",
    highlight1: "Next.js",
    mid: " & ",
    highlight2: "MERN. ",
    suffix:
      "Ecosystem I build secure, scalable, and high-performance web applications.",
  },

  description: [
    "I am a MERN Stack Developer with experience in building full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
    "I specialize in secure authentication systems, role-based dashboards, and scalable backend architectures.",
    "I focus on writing clean, maintainable code while delivering reliable performance and a great user experience.",
  ],

  contributions: [
    "Build and maintain full-stack MERN applications",
    "Implement secure JWT authentication with HttpOnly cookies",
    "Develop admin and role-based dashboard systems",
    "Integrate REST APIs using Redux Toolkit and RTK Query",
    "Create responsive and modern UI with Tailwind CSS",
    "Optimize performance and refactor existing codebases",
  ],

  remoteMindset:
    "I am self-motivated, organized, and comfortable working independently in remote environments. I value clear communication, regular updates, and well-documented code to ensure smooth collaboration across teams.",

  tools: [
    "JavaScript (ES6+)",
    "React.js & Next.js",
    "Redux Toolkit & RTK Query",
    "Node.js & Express.js",
    "MongoDB & Mongoose",
    "JWT Authentication",
    "Tailwind CSS",
    "GSAP Animations",
    "Git & GitHub",
    "Postman",
  ],

  closing:
    "I am currently seeking remote opportunities where I can contribute my skills, grow with a collaborative team, and build software that creates real impact.",
};

// back to top buktton data
export const backtoTopData = {
  myNumber: "8801750192098",
  email: "learningcell555@gmail.com",
  linkedIn: "https://www.linkedin.com/in/rohanmohammad",
};

// Blog data

export const blogCards: BlogCard[] = [
  {
    id: "bc-1",
    img: "/images/blog/design-2026.jpg",
    title: "Mastering Modern Web Design in 2026",
    shortDes:
      "Explore how GSAP and Framer Motion are shaping the future of immersive UI/UX.",
    tag: ["Design", "UX", "Animation"],
    date: "Jan 15, 2026", // Date field added
  },
  {
    id: "bc-2",
    img: "/images/blog/api-evolution.jpg",
    title: "The Evolution of APIs: Smart & Secure",
    shortDes:
      "Deep dive into building intelligent REST and GraphQL APIs using Node.js and TypeScript.",
    tag: ["API", "Backend", "Security"],
    date: "Feb 10, 2026",
  },
  {
    id: "bc-3",
    img: "/images/blog/fullstack-future.jpg",
    title: "Fullstack Mastery: Beyond the MERN Stack",
    shortDes:
      "How to architect scalable applications with Next.js, Stripe, and SSL Commerz.",
    tag: ["Fullstack", "Next.js", "Payments"],
    date: "Mar 05, 2026",
  },
  {
    id: "bc-4",
    img: "/images/blog/llm-integration.jpg",
    title: "LLM Integration: Making Apps Smarter",
    shortDes:
      "Practical guide to integrating AI and Large Language Models into modern web apps.",
    tag: ["AI", "LLM", "Future Tech"],
    date: "Apr 22, 2026",
  },
];

// details for blog
export const blogDetails: BlogDetail[] = [
  {
    id: "bd-1",
    blogCardId: "bc-1",
    title: "Mastering Modern Web Design in 2026",
    description:
      "A comprehensive guide to building immersive and high-performance user interfaces.",
    images: [
      "/images/walmartproject.png", // Fixed path: removed /client/public
      "/images/blog/design-ui-demo.jpg",
    ],
    tags: ["Design", "GSAP", "Next.js"],
    contentSections: [
      {
        heading: "The Rise of Motion Design",
        body: "In 2026, static websites are a thing of the past. Using GSAP and Framer Motion, we create layouts that feel alive.",
      },
      {
        heading: "UI with Coding",
        body: "Bridging the gap between design and development. Every pixel is crafted with performance-first CSS and Tailwind.",
      },
    ],
    author: "Ami As Developer",
    date: "January 2026",
  },
  {
    id: "bd-2",
    blogCardId: "bc-2",
    title: "The Evolution of APIs: Smart & Secure",
    description:
      "Building the backbone of modern web applications with precision.",
    images: ["/images/blog/api-architecture.jpg"],
    tags: ["API", "Node.js", "Postman"],
    contentSections: [
      {
        heading: "Intelligent Endpoint Design",
        body: "Next-gen APIs now use AI for better data fetching and predictive response caching.",
      },
      {
        heading: "Securing the Flow",
        body: "Implementing advanced security protocols and testing extensively with Postman to ensure zero-vulnerability data flow.",
      },
    ],
    author: "Ami As Developer",
    date: "February 2026",
  },
  {
    id: "bd-3",
    blogCardId: "bc-3",
    title: "Fullstack Mastery: Beyond the MERN Stack",
    description: "Building end-to-end solutions that scale globally.",
    images: ["/images/blog/fullstack-system.jpg"],
    tags: ["MERN", "Next.js", "Stripe"],
    contentSections: [
      {
        heading: "Seamless Payments",
        body: "Integrating Stripe and SSL Commerz for a global yet local payment experience.",
      },
      {
        heading: "Performance with Next.js",
        body: "Optimizing full-stack apps using Server Components and advanced MongoDB aggregation.",
      },
    ],
    author: "Ami As Developer",
    date: "March 2026",
  },
  {
    id: "bd-4",
    blogCardId: "bc-4",
    title: "LLM Integration: Making Apps Smarter",
    description:
      "Integrating Artificial Intelligence directly into the MERN ecosystem.",
    images: ["/images/blog/llm-nodes.jpg"],
    tags: ["AI", "LLM", "JavaScript"],
    contentSections: [
      {
        heading: "Why LLMs for Developers?",
        body: "Adding smart search, auto-summarization, and chatbots using OpenAI and custom LLM APIs.",
      },
      {
        heading: "Practical Integration",
        body: "How to use Node.js to bridge the gap between user data and AI intelligence safely.",
      },
    ],
    author: "Ami As Developer",
    date: "April 2026",
  },
];

// faqs page

export const faqData: FAQ[] = [
  {
    id: "faq-1",
    category: "technical",
    question: "What is your primary tech stack for full-stack development?",
    answer:
      "I specialize in the MERN stack (MongoDB, Express.js, React, and Node.js). For performance-heavy applications, I use Next.js with TypeScript and Tailwind CSS.",
  },
  {
    id: "faq-2",
    category: "service",
    question: "Do you provide website maintenance after deployment?",
    answer:
      "Yes, I provide 3 to 6 months of free technical support and maintenance after project delivery to ensure everything runs smoothly.",
  },
  {
    id: "faq-3",
    category: "general",
    question: "How do you handle project communication?",
    answer:
      "I prefer using Slack, Discord, or WhatsApp for daily updates. For project management and milestones, I use Trello or Jira.",
  },
  {
    id: "faq-4",
    category: "technical",
    question: "Can you convert Figma or Adobe XD designs to functional code?",
    answer:
      "Absolutely! I can convert any complex Figma, XD, or PSD design into a fully responsive, pixel-perfect React or Next.js application.",
  },
  {
    id: "faq-5",
    category: "payment",
    question: "What are your payment terms?",
    answer:
      "Usually, I work with a 30% upfront payment, 40% after the first milestone, and the remaining 30% upon final delivery.",
  },
  {
    id: "faq-6",
    category: "service",
    question: "How long does it take to build a standard business website?",
    answer:
      "Depending on the complexity, a standard landing page takes 3-5 days, while a full-scale web application may take 3-6 weeks.",
  },
];

// Interface onujayi data update kora hoyeche
export const contactInfo: ContactInfo[] = [
  {
    platform: "WhatsApp",
    value: "+880 1750-192098",
    icon: FaWhatsapp,
  },
  {
    platform: "Email Us",
    value: "armanhossain0175019@gmail.com",
    icon: FaEnvelope,
  },
];

export const socialLinks: contactsociallink[] = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/rohanmohammad404",
    icon: FaFacebookF,
  },
  {
    platform: "Twitter",
    url: "https://twitter.com",
    icon: FaTwitter,
  },
  {
    platform: "Linkedin",
    url: "https://www.linkedin.com/in/rohanmohammad",
    icon: FaLinkedinIn,
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/rohan_webp/",
    icon: FaInstagram,
  },
];

export const headTextContact = {
  title: "let's chat",
  subtitle:
    "Feel free to contact us through twitter or facebook if you prefer.!",
};

// input data input
export const contactInputs = [
  { id: 1, type: "text", name: "name", placeholder: "Name", limit: 50, col: "col-span-6" },
  { id: 2, type: "email", name: "email", placeholder: "Enter your email", limit: 40, col: "col-span-6" },

  { id: 3, type: "text", name: "phone", placeholder: "Enter your phone", limit: 15, col: "col-span-6" },
  { id: 4, type: "text", name: "subject", placeholder: "Subject", limit: 50, col: "col-span-6" },
];

// Testimonial

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Full Stack Dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    feedback:
      "Exceptional code quality and architecture. The logic is clean and the performance is top-notch. Highly recommended for complex React projects.",
    rating: 5,
  },
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Full Stack Dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    feedback:
      "Exceptional code quality and architecture. The logic is clean and the performance is top-notch. Highly recommended for complex React projects.",
    rating: 5,
  },
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Full Stack Dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    feedback:
      "Exceptional code quality and architecture. The logic is clean and the performance is top-notch. Highly recommended for complex React projects.",
    rating: 5,
  },
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Full Stack Dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    feedback:
      "Exceptional code quality and architecture. The logic is clean and the performance is top-notch. Highly recommended for complex React projects.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    feedback:
      "The way they handle UI components with Tailwind is amazing. Every micro-interaction is perfectly implemented as per the design.",
    rating: 5,
  },
];