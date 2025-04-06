
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
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Purchased on: {new Date(project.purchase_date).toLocaleDateString()}
                  </p>
                </div>
                {project.rating ? (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(project.rating!)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < project.rating!
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      // This would typically open a modal or form
                      onRateProject(project.id, 5, "Great project!");
                    }}
                  >
                    Rate Project
                  </Button>
                )}
              </div>
              {project.review && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300">{project.review}</p>
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
