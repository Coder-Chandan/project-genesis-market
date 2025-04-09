
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectService } from '@/services/projectService';
import { Project } from '@/integrations/supabase/custom-types';

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const projects = await projectService.getFeaturedProjects(4);
      setFeaturedProjects(projects);
      console.log('Fetched featured projects:', projects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const placeholderProjects = Array(4).fill(null).map((_, index) => ({
    id: `placeholder-${index}`,
    title: "Example Project",
    description: "This is an example project description.",
    category: "Web Development",
    price: 99,
    author: "John Doe",
    rating: 4.5,
    sales: 25,
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&auto=format",
    code_price: null,
    created_at: null,
    date_added: null,
    documentation_price: null,
    is_featured: true,
    ui_price: null,
    updated_at: null
  }));

  // If no featured projects are found, show placeholders
  const displayProjects = featuredProjects.length > 0 
    ? featuredProjects 
    : placeholderProjects;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="text-brand-600 hover:text-brand-700 flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
