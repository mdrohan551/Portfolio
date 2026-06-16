import { prisma } from "../src/config/db";
import bcrypt from "bcrypt";

// Transform your frontend data to match database schema
const seedPortfolioData = async () => {
  try {
    console.log("🌱 Starting portfolio data seeding...");

    // Clear existing data
    await prisma.user.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.socialLink.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.fAQ.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.blogDetail.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.serviceDetail.deleteMany();
    await prisma.service.deleteMany();
    await prisma.projectDetail.deleteMany();
    await prisma.project.deleteMany();
    await prisma.category.deleteMany();

    console.log("🗑️ Cleared existing data");

    // Seed Demo User
    const hashedPassword = await bcrypt.hash('rohan123', 12);
    await prisma.user.create({
      data: {
        name: 'Demo Admin',
        email: 'learningcell555@gmail.com',
        password: hashedPassword,
      },
    });
    console.log("✅ Demo user seeded");

    // 1. Seed Categories
    const categoriesData = [
      // Skill categories
      { name: "Fullstack & Dev", slug: "fullstack-dev" },
      { name: "Frontend", slug: "frontend" },
      { name: "Backend & DB", slug: "backend-db" },
      { name: "Tools & Other", slug: "tools-other" },
      // Project categories
      { name: "Design", slug: "design" },
      { name: "E-commerce", slug: "ecommerce" },
      { name: "Web Development", slug: "web-development" },
    ];

    const categories = await Promise.all(
      categoriesData.map((category) =>
        prisma.category.create({ data: category })
      )
    );
    console.log("✅ Categories seeded");

    // 2. Seed Skills
    const skillsData = [
      // Fullstack & Dev
      {
        name: "Full Stack Web Development",
        iconPath: "fullstack",
        categoryId: categories.find((c) => c.slug === "fullstack-dev")!.id,
      },
      {
        name: "MERN Stack",
        iconPath: "mern",
        categoryId: categories.find((c) => c.slug === "fullstack-dev")!.id,
      },
      {
        name: "Payment Integration (Stripe)",
        iconPath: "strip",
        categoryId: categories.find((c) => c.slug === "fullstack-dev")!.id,
      },
      {
        name: "Payment Integration ( SSL Commerz)",
        iconPath: "ssl",
        categoryId: categories.find((c) => c.slug === "fullstack-dev")!.id,
      },

      // Frontend
      {
        name: "React",
        iconPath: "react",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "Next.js",
        iconPath: "nextjs",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "JavaScript (ES6+)",
        iconPath: "js",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "HTML",
        iconPath: "html",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "CSS",
        iconPath: "css",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "Bootstrap",
        iconPath: "bootsrap",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "Tailwind CSS",
        iconPath: "tailwind",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "GSAP",
        iconPath: "gsap",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "Framer Motion",
        iconPath: "fremermotion",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },
      {
        name: "UI with Coding",
        iconPath: "ux",
        categoryId: categories.find((c) => c.slug === "frontend")!.id,
      },

      // Backend & DB
      {
        name: "Node.js",
        iconPath: "node",
        categoryId: categories.find((c) => c.slug === "backend-db")!.id,
      },
      {
        name: "Express.js",
        iconPath: "expressimg",
        categoryId: categories.find((c) => c.slug === "backend-db")!.id,
      },
      {
        name: "MongoDB",
        iconPath: "mongodb",
        categoryId: categories.find((c) => c.slug === "backend-db")!.id,
      },
      {
        name: "TypeScript",
        iconPath: "ts",
        categoryId: categories.find((c) => c.slug === "backend-db")!.id,
      },

      // Tools & Other
      {
        name: "Git & GitHub",
        iconPath: "github",
        categoryId: categories.find((c) => c.slug === "tools-other")!.id,
      },
      {
        name: "Postman",
        iconPath: "Postman",
        categoryId: categories.find((c) => c.slug === "tools-other")!.id,
      },
      {
        name: "VS Code",
        iconPath: "vs",
        categoryId: categories.find((c) => c.slug === "tools-other")!.id,
      },
      {
        name: "AI / LLM Basic Integration",
        iconPath: "ai",
        categoryId: categories.find((c) => c.slug === "tools-other")!.id,
      },
    ];

    await prisma.skill.createMany({ data: skillsData });
    console.log("✅ Skills seeded");

    // 3. Seed Site Profile (mydata, homeBannerData, aboutData combined)
    const profile = await prisma.profile.create({
      data: {
        // Personal Info (shared)
        name: "Rohan Mohammad",
        email: "armanhossain0175019@gmail.com",
        phone: "01750192098",
        image: "https://res.cloudinary.com/demo/image/upload/profile.jpg", // Replace with actual image

        // Sidebar data (mydata)
        entryName: "Hy! i'm",
        slug: "Software Engineer || Next.js || MERN",

        // Home Banner data (homeBannerData)
        bannerTitle: ["Professional", "Web Application", "Specialist"],
        bannerEntryName: "Hi! there, I'm ✦",
        bannerDescription:
          "Full-stack web developer skilled in building high-performance, responsive web applications. Experienced in both front-end (JavaScript, TypeScript, React, Next.js) and back-end (Node.js, Express, MongoDB) development. Proficient in Redux, Tailwind CSS, and Git for delivering production-ready applications.",
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
        ],

        // About data
        aboutTitle: "✦ About Me",
        aboutTagline: {
          prefix: "Remote-ready Full-Stack Engineer specializing in ",
          highlight1: "Next.js",
          mid: " & ",
          highlight2: "MERN. ",
          suffix:
            "Ecosystem I build secure, scalable, and high-performance web applications.",
        },
        aboutDescription: [
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
        aboutClosing:
          "I am currently seeking remote opportunities where I can contribute my skills, grow with a collaborative team, and build software that creates real impact.",

        isActive: true,

        // Social Links
        socialLinks: {
          create: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/rohanmohammad404",
              iconName: "FaFacebook",
              order: 1,
            },
            {
              platform: "instagram",
              url: "https://www.instagram.com/rohan_webp/",
              iconName: "FaInstagram",
              order: 2,
            },
            {
              platform: "linkedin",
              url: "https://www.linkedin.com/in/rohanmohammad",
              iconName: "FaLinkedin",
              order: 3,
            },
            {
              platform: "github",
              url: "https://github.com/mdrohan551",
              iconName: "FaGithub",
              order: 4,
            },
          ],
        },
      },
    });
    console.log("✅ Site Profile seeded");

    // 4. Seed Experiences

    // 5. Seed Projects with Details
    const projectsWithDetails = [
      {
        project: {
          title: "UI Design Concept",
          slug: "ui-design-concept",
          image: "https://images.unsplash.com/photo-1640622658992-3f89d831bdb1",
          categoryId: categories.find((c) => c.slug === "design")!.id,
        },
        details: {
          date: new Date("2024-10-12"),
          bannerImg:
            "https://images.unsplash.com/photo-1640622658992-3f89d831bdb1",
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
      },
      {
        project: {
          title: "Brand Design System",
          slug: "brand-design-system",
          image: "https://images.unsplash.com/photo-1581091870627-3a684eec73ec",
          categoryId: categories.find((c) => c.slug === "design")!.id,
        },
        details: {
          date: new Date("2024-10-15"),
          bannerImg:
            "https://images.unsplash.com/photo-1581091870627-3a684eec73ec",
          overview:
            "A comprehensive brand design system for consistent visual identity.",
          keyFeatures: [
            "Color palette",
            "Typography system",
            "UI components library",
          ],
          technologies: ["Figma", "Sketch", "Illustrator"],
          liveLink: "https://example.com/brand-design-system",
        },
      },
      {
        project: {
          title: "E-commerce Store",
          slug: "ecommerce-store",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          categoryId: categories.find((c) => c.slug === "ecommerce")!.id,
        },
        details: {
          date: new Date("2024-11-25"),
          bannerImg:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          overview:
            "A modern fashion e-commerce store with smooth shopping experience.",
          keyFeatures: ["Product catalog", "Cart & checkout", "Responsive UI"],
          technologies: ["React", "Next.js", "Stripe API"],
          liveLink: "https://example.com/ecommerce-store",
        },
      },
    ];

    for (const projectData of projectsWithDetails) {
      const project = await prisma.project.create({
        data: projectData.project,
      });

      await prisma.projectDetail.create({
        data: {
          ...projectData.details,
          projectId: project.id,
        },
      });
    }
    console.log("✅ Projects with details seeded");

    // 4. Seed Services with Details
    const servicesWithDetails = [
      {
        service: {
          title: "Next.js Production Website",
          shortDesc:
            "SEO-friendly and fast-loading Next.js websites (SSR/SSG).",
          tag: "Frontend",
          hasIcon: true,
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
          thumbnail: "/images/demoThumnai.webp",
        },
        details: {
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
              answer:
                "Design references, content, branding assets, feature list.",
            },
          ],
          notes: [
            "Recommended deployment: Vercel",
            "Optional: TypeScript migration",
          ],
          images: [
            "/images/website_mockup2jpg.jpg",
            "/images/website_mockup2jpg.jpg",
          ],
        },
      },
      {
        service: {
          title: "MERN Full-Stack Development",
          shortDesc:
            "Full production-ready MERN apps with secure backend and dashboards.",
          tag: "Full-Stack",
          hasIcon: true,
          stack: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
          thumbnail: "/images/demoThumnai.webp",
        },
        details: {
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
              answer:
                "Yes, full API docs and project setup guides are included.",
            },
          ],
          notes: [
            "Preferred DB: MongoDB Atlas",
            "Security: Helmet, Rate-limiting",
          ],
          images: [
            "/images/website_mockup2jpg.jpg",
            "/images/website_mockup2jpg.jpg",
          ],
        },
      },
    ];

    for (const serviceData of servicesWithDetails) {
      const service = await prisma.service.create({
        data: serviceData.service,
      });

      await prisma.serviceDetail.create({
        data: {
          ...serviceData.details,
          serviceId: service.id,
        },
      });
    }
    console.log("✅ Services with details seeded");

    // 5. Seed Blogs with Details
    const blogsWithDetails = [
      {
        blog: {
          img: "/images/blog/design-2026.jpg",
          title: "Mastering Modern Web Design in 2026",
          shortDes:
            "Explore how GSAP and Framer Motion are shaping the future of immersive UI/UX.",
          tag: ["Design", "UX", "Animation"],
          date: new Date("2026-01-15"),
        },
        details: {
          title: "Mastering Modern Web Design in 2026",
          description:
            "A comprehensive guide to building immersive and high-performance user interfaces.",
          images: [
            "/client/public/images/walmartproject.png",
            "/images/blog/design-ui-demo.jpg",
          ],
          tags: ["Design", "GSAP", "Next.js"],
          contentSections: [
            {
              type: "heading",
              content: "The Rise of Motion Design",
            },
            {
              type: "paragraph",
              content:
                "In 2026, static websites are a thing of the past. Using GSAP and Framer Motion, we create layouts that feel alive.",
            },
            {
              type: "heading",
              content: "UI with Coding",
            },
            {
              type: "paragraph",
              content:
                "Bridging the gap between design and development. Every pixel is crafted with performance-first CSS and Tailwind.",
            },
          ],
          author: "Ami As Developer",
        },
      },
      {
        blog: {
          img: "/images/blog/api-evolution.jpg",
          title: "The Evolution of APIs: Smart & Secure",
          shortDes:
            "Deep dive into building intelligent REST and GraphQL APIs using Node.js and TypeScript.",
          tag: ["API", "Backend", "Security"],
          date: new Date("2026-02-10"),
        },
        details: {
          title: "The Evolution of APIs: Smart & Secure",
          description:
            "Building the backbone of modern web applications with precision.",
          images: ["/images/blog/api-architecture.jpg"],
          tags: ["API", "Node.js", "Postman"],
          contentSections: [
            {
              type: "heading",
              content: "Intelligent Endpoint Design",
            },
            {
              type: "paragraph",
              content:
                "Next-gen APIs now use AI for better data fetching and predictive response caching.",
            },
            {
              type: "heading",
              content: "Securing the Flow",
            },
            {
              type: "paragraph",
              content:
                "Implementing advanced security protocols and testing extensively with Postman to ensure zero-vulnerability data flow.",
            },
          ],
          author: "Ami As Developer",
        },
      },
    ];

    for (const blogData of blogsWithDetails) {
      const blog = await prisma.blog.create({
        data: blogData.blog,
      });

      await prisma.blogDetail.create({
        data: {
          ...blogData.details,
          blogId: blog.id,
        },
      });
    }
    console.log("✅ Blogs with details seeded");

    // 6. Seed Testimonials
    const testimonialsData = [
      {
        name: "Alex Rivera",
        role: "Senior Full Stack Dev",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        feedback:
          "Exceptional code quality and architecture. The logic is clean and the performance is top-notch. Highly recommended for complex React projects.",
        rating: 5,
      },
      {
        name: "Sarah Chen",
        role: "UI/UX Designer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        feedback:
          "The way they handle UI components with Tailwind is amazing. Every micro-interaction is perfectly implemented as per the design.",
        rating: 5,
      },
      {
        name: "Michael Johnson",
        role: "Product Manager",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        feedback:
          "Great communication and delivery on time. The MERN stack implementation exceeded our expectations.",
        rating: 4,
      },
    ];

    await prisma.testimonial.createMany({ data: testimonialsData });
    console.log("✅ Testimonials seeded");

    // 7. Seed FAQs
    const faqsData = [
      {
        category: "technical",
        question: "What is your primary tech stack for full-stack development?",
        answer:
          "I specialize in the MERN stack (MongoDB, Express.js, React, and Node.js). For performance-heavy applications, I use Next.js with TypeScript and Tailwind CSS.",
      },
      {
        category: "service",
        question: "Do you provide website maintenance after deployment?",
        answer:
          "Yes, I provide 3 to 6 months of free technical support and maintenance after project delivery to ensure everything runs smoothly.",
      },
      {
        category: "general",
        question: "How do you handle project communication?",
        answer:
          "I prefer using Slack, Discord, or WhatsApp for daily updates. For project management and milestones, I use Trello or Jira.",
      },
      {
        category: "technical",
        question:
          "Can you convert Figma or Adobe XD designs to functional code?",
        answer:
          "Absolutely! I can convert any complex Figma, XD, or PSD design into a fully responsive, pixel-perfect React or Next.js application.",
      },
      {
        category: "payment",
        question: "What are your payment terms?",
        answer:
          "Usually, I work with a 30% upfront payment, 40% after the first milestone, and the remaining 30% upon final delivery.",
      },
      {
        category: "service",
        question: "How long does it take to build a standard business website?",
        answer:
          "Depending on the complexity, a standard landing page takes 3-5 days, while a full-scale web application may take 3-6 weeks.",
      },
    ];

    await prisma.fAQ.createMany({ data: faqsData });
    console.log("✅ FAQs seeded");

    console.log("🎉 Portfolio data seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding portfolio data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run if this file is executed directly
seedPortfolioData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedPortfolioData;
