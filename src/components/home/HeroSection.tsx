
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-accent1-600 py-16 md:py-24">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full h-full opacity-10">
          <path fill="#ffffff" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,133.3C384,117,480,139,576,165.3C672,192,768,224,864,208C960,192,1056,128,1152,101.3C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Innovative Student Projects
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Explore, purchase, and implement final-year college projects from talented students around the world.
          </p>
          
          <div className="bg-white p-2 rounded-lg shadow-lg flex items-center max-w-xl mx-auto">
            <Input 
              type="text" 
              placeholder="Search for projects..." 
              className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="ml-2 bg-brand-600 hover:bg-brand-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-white/80 text-sm">
            <span>Popular:</span>
            {['Web Development', 'AI & ML', 'Mobile Apps', 'IoT', 'Blockchain'].map((tag) => (
              <a 
                key={tag} 
                href={`/categories/${tag.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="underline underline-offset-2 hover:text-white"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f8fafc" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
