
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    author: string;
    rating: number;
    sales: number;
    image_url?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="overflow-hidden card-hover h-full flex flex-col">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={project.image_url || 'https://source.unsplash.com/random/600x400/?tech'} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="pt-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{project.category}</Badge>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-amber-500">
              <Star className="h-4 w-4 fill-amber-500 mr-1" />
              <span className="text-sm font-medium">{project.rating}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.sales} sales</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex items-center justify-between bg-gray-50">
          <span className="text-sm text-gray-500">By {project.author}</span>
          <span className="font-bold text-brand-600">${project.price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
