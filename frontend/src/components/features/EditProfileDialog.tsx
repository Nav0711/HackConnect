import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/user";
import { Edit } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface EditProfileDialogProps {
  user: User;
}

export function EditProfileDialog({ user }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || "",
    githubUrl: user.githubUrl || "",
    portfolioUrl: user.portfolioUrl || "",
    skills: user.skills.join(", "), // Comma separated for input
    techStack: (user.techStack || []).join(", "), // Comma separated for input
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const techStackArray = formData.techStack
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const result = await updateProfile({
      name: formData.name,
      bio: formData.bio,
      githubUrl: formData.githubUrl,
      portfolioUrl: formData.portfolioUrl,
      skills: skillsArray,
      techStack: techStackArray,
    });

    setIsLoading(false);

    if (result.success) {
      // Invalidate the user query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setOpen(false);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Problem solving, API development, UI/UX design..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="techStack" className="text-right">
                Tech Stack
              </Label>
              <Input
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="React, Python, AWS..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="githubUrl" className="text-right">
                GitHub
              </Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="portfolioUrl" className="text-right">
                Portfolio
              </Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
