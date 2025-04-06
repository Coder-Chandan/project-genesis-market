import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Project Genesis Market</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Project Genesis Market is dedicated to revolutionizing the way developers and creators connect, 
              collaborate, and bring innovative projects to life. We believe in fostering a community where 
              creativity meets opportunity.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Connect talented developers with exciting projects</li>
                <li>Provide a secure platform for project collaboration</li>
                <li>Facilitate seamless communication between team members</li>
                <li>Offer tools and resources for project management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Innovation in technology and collaboration</li>
                <li>Transparency in all operations</li>
                <li>Community-driven development</li>
                <li>Excellence in project delivery</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Whether you're a developer looking for exciting projects or a creator seeking talented 
              collaborators, Project Genesis Market is the platform for you. Join our growing community 
              and be part of something extraordinary.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="default" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About; 