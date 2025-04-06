
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface AddToCartProps {
  project: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ 
  project, 
  variant = 'default',
  size = 'default',
  className = '' 
}) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: project.id,
      title: project.title,
      price: project.price,
      image: project.image,
    });
  };
  
  return (
    <Button 
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={className}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
