
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Download } from 'lucide-react';

interface ProjectPurchaseOptionsProps {
  project: any;
  totalPrice: number;
  selectedOptions: {
    ui: boolean;
    code: boolean;
    documentation: boolean;
  };
  handleOptionChange: (option: 'ui' | 'code' | 'documentation') => void;
  handleAddToCart: () => void;
}

const ProjectPurchaseOptions = ({
  project,
  totalPrice,
  selectedOptions,
  handleOptionChange,
  handleAddToCart
}: ProjectPurchaseOptionsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
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
            {project.author?.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{project.author}</p>
            <p className="text-sm text-gray-500">Project Creator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPurchaseOptions;
