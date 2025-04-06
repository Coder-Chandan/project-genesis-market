
import { Tables } from "@/integrations/supabase/types";
import { FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Profile = Tables<'profiles'>;

interface ProfileSettingsProps {
  profileData: Partial<Profile>;
  onProfileDataChange: (updatedData: Partial<Profile>) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
}

const ProfileSettings = ({ profileData, onProfileDataChange, onSubmit }: ProfileSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              value={profileData.name || ''}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Bio
            </label>
            <Textarea
              id="bio"
              value={profileData.bio || ''}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, bio: e.target.value })
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
              value={profileData.github || ''}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, github: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
              LinkedIn Profile
            </label>
            <Input
              id="linkedin"
              value={profileData.linkedin || ''}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, linkedin: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website
            </label>
            <Input
              id="website"
              value={profileData.website || ''}
              onChange={(e) =>
                onProfileDataChange({ ...profileData, website: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
