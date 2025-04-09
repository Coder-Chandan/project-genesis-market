
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectService } from '@/services/projectService';

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const projects = await projectService.getFeaturedProjects(4);
      setFeaturedProjects(projects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // If no featured projects are found, show some defaults
  const displayProjects = featuredProjects.length > 0 
    ? featuredProjects 
    : Array(4).fill({}).map((_, index) => ({
        id: `placeholder-${index}`,
        title: "Loading...",
        description: "Project description loading...",
        category: "Category",
        price: 0,
        author: "Author",
        rating: 0,
        sales: 0
      }));

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
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No featured projects available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
