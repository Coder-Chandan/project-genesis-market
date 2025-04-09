
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectHeaderProps {
  title: string;
  category: string;
  rating: number;
  sales: number;
  dateAdded: string;
}

const ProjectHeader = ({ 
  title, 
  category, 
  rating, 
  sales, 
  dateAdded 
}: ProjectHeaderProps) => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Link to="/projects" className="flex items-center text-brand-600 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>
      
      <Badge className="mb-2">{category}</Badge>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      
      <div className="flex items-center mb-4 text-sm">
        {rating !== undefined && (
          <div className="flex items-center text-amber-500 mr-4">
            <span className="flex items-center">
              <svg
                className="h-4 w-4 fill-amber-500 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {rating}
            </span>
          </div>
        )}
        {sales !== undefined && (
          <div className="flex items-center text-gray-500 mr-4">
            <svg
              className="h-4 w-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{sales} sales</span>
          </div>
        )}
        <div className="flex items-center text-gray-500">
          <svg
            className="h-4 w-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Added {new Date(dateAdded).toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
