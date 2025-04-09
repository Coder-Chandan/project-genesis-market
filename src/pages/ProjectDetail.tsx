
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Check,
  Users,
  Download,
  Star,
  ShoppingCart
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard from '@/components/ui/ProjectCard';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<{
    ui: boolean;
    code: boolean;
    documentation: boolean;
  }>({
    ui: false,
    code: false,
    documentation: false
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    if (project) {
      calculateTotalPrice();
    }
  }, [selectedOptions, project]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      
      // Fetch project details
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
        
      if (projectError) throw projectError;
      
      setProject(projectData);
      
      // Fetch related projects
      const { data: relatedData, error: relatedError } = await supabase
        .from('projects')
        .select('*')
        .eq('category', projectData.category)
        .neq('id', id)
        .limit(4);
        
      if (relatedError) throw relatedError;
      
      setRelatedProjects(relatedData || []);
    } catch (error: any) {
      console.error('Error fetching project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load project details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!project) return;
    
    let price = 0;
    
    if (selectedOptions.ui && project.ui_price) {
      price += parseFloat(project.ui_price);
    }
    
    if (selectedOptions.code && project.code_price) {
      price += parseFloat(project.code_price);
    }
    
    if (selectedOptions.documentation && project.documentation_price) {
      price += parseFloat(project.documentation_price);
    }
    
    // If nothing selected, use base price
    if (price === 0 && !selectedOptions.ui && !selectedOptions.code && !selectedOptions.documentation) {
      price = parseFloat(project.price);
    }
    
    setTotalPrice(price);
  };

  const handleOptionChange = (option: 'ui' | 'code' | 'documentation') => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      
      // Store the current URL in session storage to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/login');
      return;
    }
    
    const selectedProductOptions = [];
    let itemTitle = project.title;
    
    if (selectedOptions.ui) {
      selectedProductOptions.push('UI');
    }
    
    if (selectedOptions.code) {
      selectedProductOptions.push('Code');
    }
    
    if (selectedOptions.documentation) {
      selectedProductOptions.push('Documentation');
    }
    
    if (selectedProductOptions.length > 0) {
      itemTitle += ` (${selectedProductOptions.join(', ')})`;
    }
    
    addToCart({
      id: `${project.id}-${selectedProductOptions.join('-')}`,
      title: itemTitle,
      price: totalPrice,
      image: project.image_url || 'https://source.unsplash.com/random/600x400/?tech'
    });
    
    toast({
      title: "Added to Cart",
      description: "Selected project options have been added to your cart.",
    });
  };

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
                src={project.image_url || 'https://source.unsplash.com/random/800x600/?tech'} 
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
                  <span>{project.rating || 0}</span>
                </div>
                <div className="flex items-center text-gray-500 mr-4">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{project.sales || 0} sales</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Added {new Date(project.date_added).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-brand-600">${totalPrice.toFixed(2)}</p>
              </div>
              
              {/* Purchase Options */}
              <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Purchase Options</h3>
                
                {project.ui_price && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ui-option"
                      checked={selectedOptions.ui}
                      onCheckedChange={() => handleOptionChange('ui')}
                    />
                    <div className="flex justify-between items-center w-full">
                      <label
                        htmlFor="ui-option"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        UI Only
                      </label>
                      <span className="text-sm font-medium">${project.ui_price}</span>
                    </div>
                  </div>
                )}
                
                {project.code_price && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="code-option"
                      checked={selectedOptions.code}
                      onCheckedChange={() => handleOptionChange('code')}
                    />
                    <div className="flex justify-between items-center w-full">
                      <label
                        htmlFor="code-option"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Code
                      </label>
                      <span className="text-sm font-medium">${project.code_price}</span>
                    </div>
                  </div>
                )}
                
                {project.documentation_price && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="documentation-option"
                      checked={selectedOptions.documentation}
                      onCheckedChange={() => handleOptionChange('documentation')}
                    />
                    <div className="flex justify-between items-center w-full">
                      <label
                        htmlFor="documentation-option"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Documentation
                      </label>
                      <span className="text-sm font-medium">${project.documentation_price}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <Button className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
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
                {[
                  "Complete source code with comments",
                  "Responsive user interface",
                  "Well-structured documentation",
                  "Installation guide",
                  "API documentation",
                  "Database schema"
                ].map((feature, index) => (
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
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} project={relatedProject} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
