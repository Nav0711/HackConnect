import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, DollarSign, Tag, Image as ImageIcon, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useHackathons } from "@/hooks/useHackathons";
import { useAuth } from "@/hooks/useAuth";

export default function CreateHackathon() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createHackathon, isLoading } = useHackathons();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    mode: "online",
    prizePool: "",
    tags: "",
    minTeamSize: "1",
    maxTeamSize: "4",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t.length > 0);

    // Ensure dates are in ISO format
    const startDateISO = new Date(formData.startDate).toISOString();
    const endDateISO = new Date(formData.endDate).toISOString();

    const result = await createHackathon({
      name: formData.title,
      tagline: formData.tagline,
      description: formData.description,
      start_date: startDateISO,
      end_date: endDateISO,
      location: formData.location,
      mode: formData.mode,
      prize_pool: formData.prizePool,
      tags: tagsArray,
      organizer_id: user?.id,
      min_team_size: parseInt(formData.minTeamSize),
      max_team_size: parseInt(formData.maxTeamSize),
      image_url: formData.imageUrl,
      status: "upcoming", // Default to upcoming when created
    });

    if (result.success) {
      toast({
        title: "Hackathon Created!",
        description: "Your hackathon has been successfully published.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create hackathon",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Hackathon</h1>
        <p className="text-muted-foreground">Launch your event and attract top talent from around the world.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Hackathon Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Global AI Summit 2024"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  placeholder="A short, catchy slogan for your event"
                  value={formData.tagline}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the theme, goals, and what participants can expect..."
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Logistics and prizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="pl-10"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      className="pl-10"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Online or City, Country"
                      className="pl-10"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select name="mode" value={formData.mode} onValueChange={(val) => handleSelectChange("mode", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minTeamSize">Min Team Size</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="minTeamSize"
                      name="minTeamSize"
                      type="number"
                      min="1"
                      className="pl-10"
                      value={formData.minTeamSize}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTeamSize">Max Team Size</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxTeamSize"
                      name="maxTeamSize"
                      type="number"
                      min="1"
                      className="pl-10"
                      value={formData.maxTeamSize}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prizePool">Total Prize Pool</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="prizePool"
                    name="prizePool"
                    type="number"
                    placeholder="10000"
                    className="pl-10"
                    value={formData.prizePool}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags / Tech Stack</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="React, AI, Blockchain (comma separated)"
                    className="pl-10"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Cover Image URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://..."
                    className="pl-10"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button variant="neon" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Hackathon"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
