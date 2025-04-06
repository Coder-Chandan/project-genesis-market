
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Profile = Tables<'profiles'>;

interface ProfileOverviewProps {
  profileData: Partial<Profile>;
  purchasesCount: number;
  userEmail: string | undefined;
  averageRating: string | number;
}

const ProfileOverview = ({ profileData, purchasesCount, userEmail, averageRating }: ProfileOverviewProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-500">
                  {profileData.name?.[0]?.toUpperCase() || userEmail?.[0]?.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{profileData.name || "User"}</h2>
              <p className="text-gray-600 dark:text-gray-300">{userEmail}</p>
              <div className="mt-4">
                <Badge variant="secondary">
                  {purchasesCount} Purchases
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
                <p className="text-2xl font-bold">{purchasesCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Rating Given</p>
                <p className="text-2xl font-bold">{averageRating}</p>
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
  );
};

export default ProfileOverview;
