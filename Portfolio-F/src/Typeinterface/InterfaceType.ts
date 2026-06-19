import type { StaticImageData } from "next/image";

// masterLayout interface 
export interface MasterLayoutProps {
  hideFooter?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface menuInterface {
  title: string;
  href?: string;
}


// sidebar banner data 
export interface SidebarBannerIcon {
  Icon: React.ComponentType<{ size?: number; className?: string }>; 
  href?: string;
}

export interface SidebarBanner<T> {
  image: string | StaticImageData;
  entryName: string;
  name: string;
  slug: string;
  email: string;
  phone: number | string;
  icons: T[];
}


// home banner interface 
export interface HomeBannerData {
  entryName: string,
  title: string[];
  description: string,
  skillTags: string[],
}

// Experience
export interface ExperienceItem {
  title: string;
  percentage: number;
}

// Services specialization data
export interface techologyItem {
  images: string | StaticImageData;
}
export interface SpecializationItem {
  logo?: techologyItem[];
  slug: string;
  title: string;
}


// project mokcup images data 
export interface ProjectMokcupImages {
  images: (string | StaticImageData)[];
  slug: string;
  title: string;
}

// testimonial mockup data
export interface TestimonialMockupData {
  image: string | StaticImageData;
  slug: string;
  title: string;
}
export interface TestimonialLink {
  to: string;
  bg: string;
  textColor: string;
  smallText: string;
  largeText: string;
  icon?: React.ComponentType | boolean | null;
}


// footer interface 
export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavLink {
  link: string;
  label: string;
}

export interface FooterData {
  logoText: string | StaticImageData;
  darklogo: string | StaticImageData;
  cta: {
    iconPlaceholder: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  navigation: NavLink[];
  socialLinks: SocialLink[];
}

export interface FooterProps {
  data: FooterData;
}

// footer map 
export interface MapData {
  title: string;
  mapLink: string;
  image: string | StaticImageData;
}


// work project mockup 
export interface ProjectCard {
  id: number;
  title: string;
  slug: string;
  image: string | StaticImageData;
  category: "design" | "api" | "inventory" | "ecommerce";
}

export interface ProjectDetails {
  id: number;
  cardId: number;
  projectName: string;
  category: string;
  date: string;
  bannerImg: string | StaticImageData;
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  liveLink?: string;
}

// services 
export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  tag?: string;
  showIcon?: boolean;
  stack: string[];
  thumbnail?: string | StaticImageData;
  packages?: {
    name: string;
    features: string[];
  }[];
}

export interface ServiceDetail {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  features: string[];
  faqs?: { question: string; answer: string }[];
  notes?: string[];
  images?: (string | StaticImageData)[];
}

// skills 
export interface Skill {
  name: string;
  iconPath: string | StaticImageData;
  category: 'Frontend' | 'Backend & DB' | 'Tools & Other' | 'Fullstack & Dev';
}

// about us 
interface tagline {
  prefix: string;
  highlight1: string;
  mid: string;
  highlight2: string;
  suffix: string;
}
export interface AboutData {
  title: string;
  tagline: tagline;
  description: string[];
  contributions: string[];
  remoteMindset: string;
  tools: string[];
  closing: string;
}


// blog page 
export interface BlogCard {
  id: string;
  img: string | StaticImageData;
  title: string;
  shortDes: string;
  tag: string[];
  date: string;
}

export interface BlogDetail {
  id: string;
  blogCardId: string;
  title: string;
  description: string;
  images: (string | StaticImageData)[];
  tags: string[];
  contentSections: {
    heading: string;
    body: string;
  }[];
  author: string;
  date: string;
}

// faqs 
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'service' | 'payment';
}


// contact us 
export interface ContactInfo {
  platform: string;
  value: string;
  icon?: React.ComponentType | boolean | null;
}

export interface contactsociallink {
  platform: string;
  url: string;
  icon?: React.ComponentType | boolean | null;
}

// Testimonial
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  feedback: string;
  rating: number;
}