
import React from 'react';
import { Search, ShoppingCart, Download } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-brand-600" />,
      title: "Browse Projects",
      description: "Explore our extensive collection of final-year projects across various categories."
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-brand-600" />,
      title: "Purchase",
      description: "Securely purchase the projects that meet your requirements with flexible payment options."
    },
    {
      icon: <Download className="h-10 w-10 text-brand-600" />,
      title: "Download & Use",
      description: "Instantly download your purchased projects and start implementing them right away."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with ProjectMarket in just a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 rounded-lg border bg-white shadow-sm">
              <div className="inline-flex items-center justify-center p-3 bg-brand-50 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
