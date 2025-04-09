
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { Tables } from "@/integrations/supabase/types";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfilePurchases from "@/components/profile/ProfilePurchases";
import ProfileSettings from "@/components/profile/ProfileSettings";

interface PurchasedProject {
  id: string;
  title: string;
  description: string;
  purchase_date: string;
  rating?: number;
  review?: string;
}

type Profile = Tables<'profiles'>;

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [purchasedProjects, setPurchasedProjects] = useState<PurchasedProject[]>([]);
  const [profileData, setProfileData] = useState<Partial<Profile>>({
    name: user?.user_metadata?.name || "",
    bio: "",
    github: "",
    linkedin: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      fetchPurchasedProjects();
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileData({
          name: data.name || user.user_metadata?.name || "",
          bio: data.bio || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          website: data.website || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

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
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            name: profileData.name,
            bio: profileData.bio,
            github: profileData.github,
            linkedin: profileData.linkedin,
            website: profileData.website,
            updated_at: new Date().toISOString() // Fix: Convert Date to string using toISOString()
          });

        if (error) throw error;
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Update error:", error);
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

  // Calculate average rating for stats
  const averageRating = purchasedProjects.filter(p => p.rating).length > 0
    ? (purchasedProjects.reduce((acc, p) => acc + (p.rating || 0), 0) /
      purchasedProjects.filter(p => p.rating).length).toFixed(1)
    : "N/A";

  if (!user) {
    return (
      <MainLayout>
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
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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
              <ProfileOverview 
                profileData={profileData}
                purchasesCount={purchasedProjects.length}
                userEmail={user?.email}
                averageRating={averageRating}
              />
            </TabsContent>

            <TabsContent value="purchases" className="space-y-6">
              <ProfilePurchases 
                purchasedProjects={purchasedProjects}
                onRateProject={handleRateProject}
              />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <ProfileSettings
                profileData={profileData}
                onProfileDataChange={setProfileData}
                onSubmit={handleUpdateProfile}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
