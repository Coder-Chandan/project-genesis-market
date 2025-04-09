
import React from 'react';
import ProjectCard from '@/components/ui/ProjectCard';

interface RelatedProjectsProps {
  projects: any[];
}

const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
