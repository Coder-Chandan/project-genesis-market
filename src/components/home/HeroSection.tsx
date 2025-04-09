import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useEmblaCarousel from 'embla-carousel-react';

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2070&q=80",
      title: "Innovative Projects"
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2070&q=80",
      title: "Student Collaboration"
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2070&q=80",
      title: "Technology Innovation"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80",
      title: "Project Marketplace"
    }
  ];

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Add autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    let autoplayInterval: NodeJS.Timeout;
    
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      }, 5000); // Change slide every 5 seconds
    };
    
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };
    
    startAutoplay();
    
    // Stop autoplay when user interacts with the carousel
    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      stopAutoplay();
      emblaApi.off('pointerDown', stopAutoplay);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-600/90 to-accent1-600/90 py-16 md:py-24">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {backgroundImages.map((image, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 relative h-full"
              >
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url("${image.url}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.4,
                    width: '100vw'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>
        
        {/* Carousel Arrows */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/30 hover:bg-black/50 text-white"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/30 hover:bg-black/50 text-white"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
