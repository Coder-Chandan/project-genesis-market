import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Star, StarHalf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PurchasedProject {
  id: string;
  title: string;
  description: string;
  purchase_date: string;
  rating?: number;
  review?: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [purchasedProjects, setPurchasedProjects] = useState<PurchasedProject[]>([]);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      fetchPurchasedProjects();
    }
  }, [user]);

  const fetchPurchasedProjects = async () => {
    try {
      // This is a placeholder - you'll need to implement the actual database query
      const mockProjects: PurchasedProject[] = [
        {
          id: "1",
          title: "Web Development Bootcamp",
          description: "Complete web development course covering HTML, CSS, and JavaScript",
          purchase_date: "2024-03-15",
          rating: 4,
          review: "Great course with comprehensive content",
        },
        {
          id: "2",
          title: "React Advanced Patterns",
          description: "Advanced React patterns and best practices",
          purchase_date: "2024-03-20",
        },
      ];
      setPurchasedProjects(mockProjects);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch purchased projects",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        data: profileData,
      });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRateProject = async (projectId: string, rating: number, review?: string) => {
    try {
      // This is a placeholder - you'll need to implement the actual database update
      setPurchasedProjects(prev =>
        prev.map(project =>
          project.id === projectId
            ? { ...project, rating, review }
            : project
        )
      );
      toast({
        title: "Rating Submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Please log in to view your profile.</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                        <span className="text-4xl text-gray-500">
                          {profileData.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold">{profileData.name || "User"}</h2>
                      <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                      <div className="mt-4">
                        <Badge variant="secondary">
                          {purchasedProjects.length} Purchases
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Purchases</p>
                        <p className="text-2xl font-bold">{purchasedProjects.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Rating Given</p>
                        <p className="text-2xl font-bold">
                          {purchasedProjects.filter(p => p.rating).length > 0
                            ? (purchasedProjects.reduce((acc, p) => acc + (p.rating || 0), 0) /
                                purchasedProjects.filter(p => p.rating).length).toFixed(1)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {profileData.bio || "No bio provided yet."}
                    </p>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profileData.github && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">GitHub:</span>
                          <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {profileData.github}
                          </a>
                        </div>
                      )}
                      {profileData.linkedin && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">LinkedIn:</span>
                          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {profileData.linkedin}
                          </a>
                        </div>
                      )}
                      {profileData.website && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Website:</span>
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {profileData.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="purchases" className="space-y-6">
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
                            handleRateProject(project.id, 5, "Great project!");
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="github" className="block text-sm font-medium mb-1">
                      GitHub Profile
                    </label>
                    <Input
                      id="github"
                      value={profileData.github}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, github: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
                      LinkedIn Profile
                    </label>
                    <Input
                      id="linkedin"
                      value={profileData.linkedin}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, linkedin: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium mb-1">
                      Website
                    </label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, website: e.target.value }))
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile; 