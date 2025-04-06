
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Check,
  Users,
  Download,
  Star
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProjectById, featuredProjects } from '@/data/projectsData';
import ProjectCard from '@/components/ui/ProjectCard';
import AddToCart from '@/components/ui/AddToCart';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');
  
  // Show related projects (exclude current project)
  const relatedProjects = featuredProjects
    .filter(p => p.id !== id)
    .slice(0, 4);
  
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
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link to="/projects" className="flex items-center text-brand-600 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full object-cover aspect-video"
              />
            </div>
          </div>
          
          {/* Project Details and Purchase */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Badge className="mb-2">{project.category}</Badge>
              <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
              
              <div className="flex items-center mb-4 text-sm">
                <div className="flex items-center text-amber-500 mr-4">
                  <Star className="h-4 w-4 fill-amber-500 mr-1" />
                  <span>{project.rating}</span>
                </div>
                <div className="flex items-center text-gray-500 mr-4">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{project.sales} sales</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Added {new Date(project.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-brand-600">${project.price}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <AddToCart project={project} className="w-full" />
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Demo Version
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Author</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-700 font-semibold">
                    {project.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{project.author}</p>
                    <p className="text-sm text-gray-500">Project Creator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Information Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b mb-0 rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="bg-white p-6 rounded-b-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
              <p className="mb-4">{project.description}</p>
              <p>
                This project is perfect for college students looking for a comprehensive and well-documented 
                final-year project. It includes all source code, documentation, and implementation guides
                to help you understand and customize it to your specific requirements.
              </p>
            </TabsContent>
            <TabsContent value="features" className="bg-white p-6 rounded-b-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="requirements" className="bg-white p-6 rounded-b-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">System Requirements</h2>
              <p className="mb-4">
                To successfully implement and run this project, you'll need the following:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic understanding of the technologies used</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Development environment set up on your computer</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Internet connection for downloading dependencies</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Minimum 4GB RAM and moderate processor speed</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
