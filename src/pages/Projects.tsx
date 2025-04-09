
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sliders } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { projectService } from '@/services/projectService';
import { Project } from '@/integrations/supabase/custom-types';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      const projectData = await projectService.getProjects();
      console.log('Fetched projects:', projectData);
      setProjects(projectData || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(projectData.map(project => project.category) || []));
      setCategories(['all', ...uniqueCategories]);
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
  
  // If there are no real projects, add some placeholder data
  useEffect(() => {
    if (!loading && projects.length === 0) {
      const placeholderProjects: Project[] = Array(8).fill(null).map((_, index) => ({
        id: `placeholder-${index}`,
        title: `Example Project ${index + 1}`,
        description: "This is an example project description that shows what a project would look like.",
        category: ["Web Development", "Mobile App", "Data Science", "Machine Learning"][index % 4],
        price: 79 + (index * 10),
        author: "Example Author",
        rating: 4 + (index % 2),
        sales: 10 + (index * 5),
        image_url: `https://images.unsplash.com/photo-${1550000000 + index}?w=600&h=400&fit=crop&auto=format`,
        code_price: null,
        created_at: null,
        date_added: null,
        documentation_price: null,
        is_featured: index < 2,
        ui_price: null,
        updated_at: null
      }));
      
      setProjects(placeholderProjects);
      setCategories(['all', 'Web Development', 'Mobile App', 'Data Science', 'Machine Learning']);
    }
  }, [loading, projects]);
  
  // Filter projects based on search term and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort projects based on selected sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.date_added || '').getTime() - new Date(a.date_added || '').getTime();
      case 'bestselling':
        return (b.sales || 0) - (a.sales || 0);
      case 'highest-rated':
        return (b.rating || 0) - (a.rating || 0);
      default: // 'featured'
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    }
  });

  return (
    <MainLayout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Project Catalog</h1>
              <p className="text-gray-600">
                Browse our collection of high-quality final-year college projects
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
              <div className="flex items-center">
                <Input
                  placeholder="Search projects..."
                  className="flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" className="ml-2" onClick={() => setShowFilters(!showFilters)}>
                  <Sliders className="h-4 w-4 mr-2" /> Filters
                </Button>
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select 
                      value={selectedCategory} 
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Featured" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="bestselling">Best Selling</SelectItem>
                        <SelectItem value="highest-rated">Highest Rated</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {sortedProjects.length} projects
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg">Loading projects...</p>
            </div>
          ) : sortedProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('featured');
              }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
