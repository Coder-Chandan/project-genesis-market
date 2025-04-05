
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/data/categoriesData';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/categories/${category.id}`}>
      <Card className="overflow-hidden card-hover h-full">
        <div className="h-24 bg-gray-100 relative">
          <img 
            src={category.icon} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
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
