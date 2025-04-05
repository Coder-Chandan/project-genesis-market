
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-brand-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Project?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of students and businesses who have found success with ProjectMarket.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/projects">Browse Projects</Link>
            </Button>
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
