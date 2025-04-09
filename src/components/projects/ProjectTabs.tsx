
import React from 'react';
import { Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectTabsProps {
  description: string;
}

const ProjectTabs = ({ description }: ProjectTabsProps) => {
  return (
    <Tabs defaultValue="description">
      <TabsList className="w-full border-b mb-0 rounded-none">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="bg-white p-6 rounded-b-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
        <p className="mb-4">{description}</p>
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
  );
};

export default ProjectTabs;
