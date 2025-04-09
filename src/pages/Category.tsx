import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { projectService } from '@/services/projectService';
import { getCategoryById } from '@/data/categoriesData';
import { Project } from '@/data/projectsData';
import { useToast } from '@/hooks/use-toast';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const category = getCategoryById(categoryId || '');

  useEffect(() => {
    fetchProjects();
  }, [categoryId]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const allProjects = await projectService.getProjects();
      const categoryProjects = allProjects.filter(
        project => project.category.toLowerCase() === categoryId?.toLowerCase()
      );
      setProjects(categoryProjects);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!category) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
            <Link to="/projects">
              <Button>Browse All Projects</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Link to="/projects" className="flex items-center text-brand-600 hover:text-brand-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found in this category</h3>
              <p className="text-gray-600 mb-4">Check back later for new projects</p>
              <Link to="/projects">
                <Button>Browse All Projects</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoryPage; 