import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { projectService } from '@/services/projectService';
import { Project } from '@/data/projectsData';

export const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
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
      const projectData = await projectService.getProjectById(id!);
      
      if (!projectData) {
        setProject(null);
        return;
      }
      
      setProject(projectData);
      
      // Fetch related projects
      const relatedData = await projectService.getRelatedProjects(
        projectData.category,
        projectData.id,
        4
      );
      
      setRelatedProjects(relatedData);
    } catch (error: any) {
      console.error('Error fetching project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load project details",
        variant: "destructive",
      });
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!project) return;
    
    let price = 0;
    
    if (selectedOptions.ui && project.ui_price) {
      price += project.ui_price;
    }
    
    if (selectedOptions.code && project.code_price) {
      price += project.code_price;
    }
    
    if (selectedOptions.documentation && project.documentation_price) {
      price += project.documentation_price;
    }
    
    // If nothing selected, use base price
    if (price === 0 && !selectedOptions.ui && !selectedOptions.code && !selectedOptions.documentation) {
      price = project.price;
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
    let itemTitle = project!.title;
    
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
      id: `${project!.id}-${selectedProductOptions.join('-')}`,
      title: itemTitle,
      price: totalPrice,
      image: project!.image_url || 'https://source.unsplash.com/random/600x400/?tech'
    });
    
    toast({
      title: "Added to Cart",
      description: "Selected project options have been added to your cart.",
    });
  };

  return {
    project,
    relatedProjects,
    loading,
    selectedOptions,
    totalPrice,
    handleOptionChange,
    handleAddToCart
  };
};
