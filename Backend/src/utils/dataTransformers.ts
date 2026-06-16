// Data transformation utilities for API responses
export const transformProjectForFrontend = (project: any) => {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    image: project.image,
    category: project.category,
    // Include details if available
    ...(project.details && {
      date: project.details.date,
      bannerImg: project.details.bannerImg,
      overview: project.details.overview,
      keyFeatures: project.details.keyFeatures,
      technologies: project.details.technologies,
      liveLink: project.details.liveLink,
    })
  };
};

export const transformServiceForFrontend = (service: any) => {
  return {
    id: service.id,
    title: service.title,
    shortDesc: service.shortDesc,
    tag: service.tag,
    hasIcon: service.hasIcon,
    stack: service.stack,
    thumbnail: service.thumbnail,
    // Include details if available
    ...(service.details && {
      detailTitle: service.details.title,
      description: service.details.description,
      features: service.details.features,
      faqs: service.details.faqs,
      notes: service.details.notes,
      images: service.details.images,
    })
  };
};

export const transformBlogForFrontend = (blog: any) => {
  return {
    id: blog.id,
    img: blog.img,
    title: blog.title,
    shortDes: blog.shortDes,
    tag: blog.tag,
    date: blog.date,
    // Include details if available
    ...(blog.details && {
      detailTitle: blog.details.title,
      description: blog.details.description,
      images: blog.details.images,
      tags: blog.details.tags,
      contentSections: blog.details.contentSections,
      author: blog.details.author,
    })
  };
};

// API base URL configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Projects
  projects: {
    getAll: `${API_BASE_URL}/projects`,
    getById: (id: string) => `${API_BASE_URL}/projects/id/${id}`,
    getBySlug: (slug: string) => `${API_BASE_URL}/projects/slug/${slug}`,
    create: `${API_BASE_URL}/projects`,
    update: (id: string) => `${API_BASE_URL}/projects/${id}`,
    delete: (id: string) => `${API_BASE_URL}/projects/${id}`,
  },
  
  // Services
  services: {
    getAll: `${API_BASE_URL}/services`,
    getById: (id: string) => `${API_BASE_URL}/services/${id}`,
    create: `${API_BASE_URL}/services`,
    update: (id: string) => `${API_BASE_URL}/services/${id}`,
    delete: (id: string) => `${API_BASE_URL}/services/${id}`,
  },
  
  // Blogs
  blogs: {
    getAll: `${API_BASE_URL}/blogs`,
    getById: (id: string) => `${API_BASE_URL}/blogs/${id}`,
    create: `${API_BASE_URL}/blogs`,
    update: (id: string) => `${API_BASE_URL}/blogs/${id}`,
    delete: (id: string) => `${API_BASE_URL}/blogs/${id}`,
  },
  
  // Skills
  skills: {
    getAll: `${API_BASE_URL}/skills`,
    getByCategory: `${API_BASE_URL}/skills/categories`,
    getById: (id: string) => `${API_BASE_URL}/skills/${id}`,
    create: `${API_BASE_URL}/skills`,
    createBulk: `${API_BASE_URL}/skills/bulk`,
    update: (id: string) => `${API_BASE_URL}/skills/${id}`,
    delete: (id: string) => `${API_BASE_URL}/skills/${id}`,
  },
  
  // Experiences
  experiences: {
    getAll: `${API_BASE_URL}/experiences`,
    getById: (id: string) => `${API_BASE_URL}/experiences/${id}`,
    create: `${API_BASE_URL}/experiences`,
    createBulk: `${API_BASE_URL}/experiences/bulk`,
    update: (id: string) => `${API_BASE_URL}/experiences/${id}`,
    delete: (id: string) => `${API_BASE_URL}/experiences/${id}`,
  },
  
  // Testimonials
  testimonials: {
    getAll: `${API_BASE_URL}/testimonials`,
    getById: (id: string) => `${API_BASE_URL}/testimonials/${id}`,
    create: `${API_BASE_URL}/testimonials`,
    createBulk: `${API_BASE_URL}/testimonials/bulk`,
    update: (id: string) => `${API_BASE_URL}/testimonials/${id}`,
    delete: (id: string) => `${API_BASE_URL}/testimonials/${id}`,
  },
  
  // FAQs
  faqs: {
    getAll: `${API_BASE_URL}/faqs`,
    getByCategory: `${API_BASE_URL}/faqs/categories`,
    getById: (id: string) => `${API_BASE_URL}/faqs/${id}`,
    create: `${API_BASE_URL}/faqs`,
    createBulk: `${API_BASE_URL}/faqs/bulk`,
    update: (id: string) => `${API_BASE_URL}/faqs/${id}`,
    delete: (id: string) => `${API_BASE_URL}/faqs/${id}`,
  },
};

// Generic API fetch function
export const fetchFromAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Specific API functions for frontend use
export const portfolioAPI = {
  // Projects
  getProjects: () => fetchFromAPI(API_ENDPOINTS.projects.getAll),
  getProjectBySlug: (slug: string) => fetchFromAPI(API_ENDPOINTS.projects.getBySlug(slug)),
  
  // Services
  getServices: () => fetchFromAPI(API_ENDPOINTS.services.getAll),
  getService: (id: string) => fetchFromAPI(API_ENDPOINTS.services.getById(id)),
  
  // Blogs
  getBlogs: () => fetchFromAPI(API_ENDPOINTS.blogs.getAll),
  getBlog: (id: string) => fetchFromAPI(API_ENDPOINTS.blogs.getById(id)),
  
  // Skills
  getSkills: () => fetchFromAPI(API_ENDPOINTS.skills.getAll),
  getSkillsByCategory: () => fetchFromAPI(API_ENDPOINTS.skills.getByCategory),
  
  // Experiences
  getExperiences: () => fetchFromAPI(API_ENDPOINTS.experiences.getAll),
  
  // Testimonials
  getTestimonials: () => fetchFromAPI(API_ENDPOINTS.testimonials.getAll),
  
  // FAQs
  getFAQs: () => fetchFromAPI(API_ENDPOINTS.faqs.getAll),
  getFAQsByCategory: () => fetchFromAPI(API_ENDPOINTS.faqs.getByCategory),
};

export default portfolioAPI;