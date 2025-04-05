
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jason Miller",
    role: "Computer Science Student",
    image: "https://source.unsplash.com/random/100x100/?portrait,man,1",
    quote: "The AI project I purchased exceeded my expectations. It was well-documented and easy to understand, which helped me complete my final semester with flying colors.",
    rating: 5
  },
  {
    id: 2,
    name: "Sophia Garcia",
    role: "Startup Founder",
    image: "https://source.unsplash.com/random/100x100/?portrait,woman,1",
    quote: "As a non-technical founder, finding a fully-functional e-commerce solution saved me thousands in development costs. Now our business is thriving!",
    rating: 5
  },
  {
    id: 3,
    name: "Raj Patel",
    role: "IT Department Head",
    image: "https://source.unsplash.com/random/100x100/?portrait,man,2",
    quote: "We've implemented several projects from this marketplace in our company. The quality and support have been consistently excellent.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from students, professors, and businesses who have found success with our marketplace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center space-x-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
