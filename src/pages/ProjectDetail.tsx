
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useProjectDetail } from '@/hooks/useProjectDetail';
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectPurchaseOptions from '@/components/projects/ProjectPurchaseOptions';
import ProjectTabs from '@/components/projects/ProjectTabs';
import RelatedProjects from '@/components/projects/RelatedProjects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    project,
    relatedProjects,
    loading,
    selectedOptions,
    totalPrice,
    handleOptionChange,
    handleAddToCart
  } = useProjectDetail(id);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading project details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/projects">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Images and Header (Mobile) */}
          <div className="lg:hidden">
            <ProjectHeader 
              title={project.title}
              category={project.category}
              rating={project.rating}
              sales={project.sales}
              dateAdded={project.date_added}
            />
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mt-4">
              <img 
                src={project.image_url || 'https://source.unsplash.com/random/800x600/?tech'} 
                alt={project.title} 
                className="w-full object-cover aspect-video"
              />
            </div>
          </div>
          
          {/* Project Images */}
          <div className="lg:col-span-2 hidden lg:block">
            <ProjectHeader 
              title={project.title}
              category={project.category}
              rating={project.rating}
              sales={project.sales}
              dateAdded={project.date_added}
            />
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mt-4">
              <img 
                src={project.image_url || 'https://source.unsplash.com/random/800x600/?tech'} 
                alt={project.title} 
                className="w-full object-cover aspect-video"
              />
            </div>
          </div>
          
          {/* Project Purchase Options */}
          <div className="lg:col-span-1">
            <ProjectPurchaseOptions 
              project={project}
              totalPrice={totalPrice}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
        
        {/* Project Information Tabs */}
        <div className="mt-8">
          <ProjectTabs description={project.description} />
        </div>
        
        {/* Related Projects */}
        <RelatedProjects projects={relatedProjects} />
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
