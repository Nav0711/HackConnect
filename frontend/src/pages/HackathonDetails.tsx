import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHackathons } from "@/hooks/useHackathons";
import { useTeams } from "@/hooks/useTeams";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users, Trophy, Share2, Globe, Monitor, Clock } from "lucide-react";
import { format } from "date-fns";

export default function HackathonDetails() {
  const { id } = useParams<{ id: string }>();
  const { getHackathon, isLoading: isHackathonLoading } = useHackathons();
  const { createTeam, isLoading: isTeamLoading } = useTeams();
  const { toast } = useToast();
  const [hackathon, setHackathon] = useState<any>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Team Registration Form State
  const [teamForm, setTeamForm] = useState({
    name: "",
    description: "",
    looking_for: "",
    tech_stack: "",
    project_repo: ""
  });

  useEffect(() => {
    if (id) {
      getHackathon(id).then((result) => {
        if (result.success) {
          setHackathon(result.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to load hackathon details",
            variant: "destructive",
          });
        }
      });
    }
  }, [id, getHackathon, toast]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Hackathon link copied to clipboard.",
    });
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hackathon) return;

    const result = await createTeam({
      name: teamForm.name,
      description: teamForm.description,
      hackathon_id: hackathon.$id || hackathon.id,
      looking_for: teamForm.looking_for.split(",").map(s => s.trim()).filter(Boolean),
      tech_stack: teamForm.tech_stack.split(",").map(s => s.trim()).filter(Boolean),
      project_repo: teamForm.project_repo
    });

    if (result.success) {
      toast({
        title: "Team Registered!",
        description: "Your team has been successfully registered for this hackathon.",
      });
      setIsRegisterOpen(false);
    } else {
      toast({
        title: "Registration Failed",
        description: result.error || "Could not register team.",
        variant: "destructive",
      });
    }
  };

  if (isHackathonLoading || !hackathon) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img 
          src={hackathon.image_url || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"} 
          alt={hackathon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-8">
          <div className="max-w-4xl">
            <Badge className="mb-4" variant="secondary">{hackathon.status || "Upcoming"}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{hackathon.name}</h1>
            {hackathon.tagline && (
              <p className="text-xl text-gray-200 mb-6">{hackathon.tagline}</p>
            )}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setIsRegisterOpen(true)}>
                Register Team
              </Button>
              <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About the Hackathon</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {hackathon.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Prizes</h2>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Prize Pool</p>
                    <p className="text-2xl font-bold">${hackathon.prize_pool || "0"}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Dates</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(hackathon.start_date), "MMM d")} - {format(new Date(hackathon.end_date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{hackathon.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Mode</p>
                    <p className="text-sm text-muted-foreground capitalize">{hackathon.mode || "Online"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Team Size</p>
                    <p className="text-sm text-muted-foreground">
                      {hackathon.min_team_size || 1} - {hackathon.max_team_size || 4} members
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hackathon.tags && hackathon.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Register Your Team</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTeamSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input 
                id="teamName" 
                value={teamForm.name}
                onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                required 
                placeholder="e.g. Code Crusaders"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamDesc">Description</Label>
              <Textarea 
                id="teamDesc" 
                value={teamForm.description}
                onChange={(e) => setTeamForm({...teamForm, description: e.target.value})}
                required 
                placeholder="What are you building?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
              <Input 
                id="techStack" 
                value={teamForm.tech_stack}
                onChange={(e) => setTeamForm({...teamForm, tech_stack: e.target.value})}
                placeholder="React, Python, Appwrite"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lookingFor">Looking For (comma separated)</Label>
              <Input 
                id="lookingFor" 
                value={teamForm.looking_for}
                onChange={(e) => setTeamForm({...teamForm, looking_for: e.target.value})}
                placeholder="Frontend Dev, Designer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repo">Project Repo (Optional)</Label>
              <Input 
                id="repo" 
                value={teamForm.project_repo}
                onChange={(e) => setTeamForm({...teamForm, project_repo: e.target.value})}
                placeholder="https://github.com/..."
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isTeamLoading}>
                {isTeamLoading ? "Registering..." : "Register Team"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
