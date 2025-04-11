
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/data/categoriesData';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
}

// Map of category IDs to specific Unsplash images for better visual consistency
const categoryImages: Record<string, string> = {
  'web-development': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&auto=format',
  'mobile-apps': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&auto=format',
  'ai-machine-learning': 'https://images.unsplash.com/photo-1526378800651-c91d939281ea?w=600&h=400&fit=crop&auto=format',
  'iot-projects': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format',
  'blockchain': 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=400&fit=crop&auto=format',
  'data-science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Use our mapped image if available, otherwise use the one from the category data
  const imageUrl = categoryImages[category.id] || category.icon;
  
  return (
    <Link to={`/categories/${category.id}`}>
      <Card className="overflow-hidden card-hover h-full">
        <div className="h-36 bg-gray-100 dark:bg-gray-800 relative">
          <img 
            src={imageUrl} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <h3 className="text-white font-semibold p-4">{category.name}</h3>
          </div>
        </div>
        <CardContent className="pt-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
          <p className="text-sm mt-2 font-medium text-brand-600">{category.count} projects</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
