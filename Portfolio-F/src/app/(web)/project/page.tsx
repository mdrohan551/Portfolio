import Breadcrumb from '@/components/ui/Breadcrumb';
import Projects from '@/components/WEB/project/Projects';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Projects | Rohan Mohammad",
  description: "Explore my portfolio of web development projects including Next.js, React, and MERN stack applications.",
  openGraph: {
    title: "My Projects | Rohan Mohammad",
    description: "Explore my portfolio of web development projects.",
    type: "website",
  },
};

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Project', href: '/project' },
];

const titles = {
  h1: "My Projects",
  span: "masterpieces "
};

const ProjectPage = async () => {
  return (
    <>
      <div className="mb-2 sm:mb-10 px-4 sm:px-0">
        <Breadcrumb link_items={breadcrumbItems} titles={titles} />
      </div>
      <Projects />
    </>
  );
};

export default ProjectPage;