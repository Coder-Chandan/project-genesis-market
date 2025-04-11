
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PurchasedProject {
  id: string;
  title: string;
  description: string;
  purchase_date: string;
  rating?: number;
  review?: string;
}

interface ProfilePurchasesProps {
  purchasedProjects: PurchasedProject[];
  onRateProject: (projectId: string, rating: number, review?: string) => Promise<void>;
}

const ProfilePurchases = ({ purchasedProjects, onRateProject }: ProfilePurchasesProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Purchased Projects</h2>
      <div className="grid gap-6">
        {purchasedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Purchased on: {new Date(project.purchase_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  {project.rating ? (
                    <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < project.rating!
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-brand-50 to-accent-50 hover:from-brand-100 hover:to-accent-100 border-brand-200"
                      onClick={() => {
                        // This would typically open a modal or form
                        onRateProject(project.id, 5, "Great project!");
                      }}
                    >
                      Rate Project
                    </Button>
                  )}
                </div>
              </div>
              {project.review && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium text-sm">Your Review</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">{project.review}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePurchases;
