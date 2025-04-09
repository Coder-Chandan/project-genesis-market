import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/categoriesData';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-accent1-600 bg-clip-text text-transparent">
              ProjectMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-foreground hover:text-accent font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/categories/${category.id}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-600">
                  {cartCount}
                </Badge>
              )}
            </Button>
            
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isLoading ? (
                  <DropdownMenuItem disabled>
                    Loading...
                  </DropdownMenuItem>
                ) : isAuthenticated ? (
                  <>
                    <DropdownMenuItem className="font-medium">
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link to="/login" className="w-full">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/register" className="w-full">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-600">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block py-2 px-4 text-foreground hover:bg-muted rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Categories */}
            <div className="px-4 py-2">
              <div className="font-medium mb-2">Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className="block py-2 px-3 text-sm text-foreground hover:bg-muted rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex justify-around pt-4 border-t border-border">
              {isLoading ? (
                <div className="text-foreground">Loading...</div>
              ) : isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-foreground" onClick={() => setIsMenuOpen(false)}>
                    Account
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="text-foreground">
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-foreground" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="text-foreground" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
              <Link to="/cart" className="text-foreground" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
