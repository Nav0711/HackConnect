import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HackathonCard, HackathonCardSkeleton } from "@/components/features/HackathonCard";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  Zap,
  Users,
  Trophy,
  Globe,
  ArrowRight,
  Sparkles,
  Code2,
  Calendar,
  MessageSquare,
  Star,
  ChevronRight,
  X,
  Rocket,
  Target,
  Lightbulb,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function fetchFeaturedHackathons() {
  const res = await fetch(`${API_URL}/hackathons`);
  if (!res.ok) throw new Error("Failed to load hackathons");
  const data = await res.json();
  return data.documents || [];
}

const stats = [
  { value: "50K+", label: "Hackers", icon: Users },
  { value: "1,200+", label: "Hackathons", icon: Calendar },
  { value: "$5M+", label: "Prizes Won", icon: Trophy },
  { value: "180+", label: "Countries", icon: Globe },
];

const features = [
  {
    icon: Sparkles,
    title: "Smart Team Matching",
    description: "AI-powered skill matching to find your perfect teammates based on experience and goals.",
  },
  {
    icon: Code2,
    title: "Integrated Workspace",
    description: "Kanban boards, real-time chat, and project management tools all in one place.",
  },
  {
    icon: Trophy,
    title: "XP & Achievements",
    description: "Level up, earn badges, and build your verified hackathon portfolio.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Collaboration",
    description: "Stay connected with your team through integrated chat and video calls.",
  },
];

// Counter component for stats
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
}

// Floating animation variants
const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const slideInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Index() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Redirect if logged in
  useEffect(() => {
    if (!isAuthLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isAuthLoading, navigate]);

  // Fetch Hackathons
  const { data: hackathons, isLoading: isHackathonsLoading } = useQuery({
    queryKey: ["featured_hackathons"],
    queryFn: fetchFeaturedHackathons,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Map backend data to frontend format
  const featuredHackathons = (hackathons || []).slice(0, 3).map((h: any) => ({
    id: h.$id || h.id,
    title: h.name,
    shortDescription: h.tagline || "",
    coverImage: h.image_url,
    startDate: new Date(h.start_date),
    location: { type: h.mode === "online" ? "online" : "in-person", city: h.location },
    totalPrizePool: parseInt(h.prize_pool) || 0,
    currency: "USD",
    status: h.status,
    tags: h.tags || [],
    participantCount: h.participants?.length || 0,
  }));

  const selectedHackathon = featuredHackathons.find((h: any) => h.id === selectedId);

  if (isAuthLoading) return null;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-[0.02]" />
          
          {/* Animated Gradients */}
          <motion.div
            className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating Shapes */}
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-2xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "0s" }}
          />
          
          <motion.div
            className="absolute bottom-40 left-20 w-64 h-64 bg-primary/5 rounded-full blur-2xl"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge 
                variant="outline" 
                className="mb-8 px-4 py-2 text-sm border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 mr-2 text-primary animate-pulse" />
                Trusted by 50,000+ hackers worldwide
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="block mb-4">Where Hackers</span>
                <motion.span
                  className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  Build the Future
                </motion.span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover hackathons, find your dream team, and showcase your projects. Join the ultimate platform for builders, creators, and innovators.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link to="/explore">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="xl" 
                    variant="neon" 
                    className="group h-14 px-8 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                  >
                    Explore Hackathons
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="xl" 
                    variant="outline" 
                    className="h-14 px-8 text-base font-semibold hover:bg-primary/5"
                  >
                    Create Account
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats - Animated Counters */}
            {/* <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  variants={scaleInVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative p-6 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"> */}
                    {/* Gradient Background on Hover */}
                    {/* <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    <div className="relative space-y-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-bold text-foreground">
                          <AnimatedCounter target={parseInt(stat.value)} />
                          {stat.value.replace(/[0-9]/g, "")}
                        </p>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Divider */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Featured Hackathons */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Hackathons</h2>
              <p className="text-muted-foreground">Discover trending events from around the world</p>
            </div>
            <Link to="/explore">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="group">
                  View All
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {isHackathonsLoading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <HackathonCardSkeleton key={i} />
              ))
            ) : (
              featuredHackathons.map((hackathon: any, index: number) => (
                <motion.div
                  key={hackathon.id}
                  layoutId={hackathon.id}
                  className="h-full group relative featured-hackathon-glow"
                  custom={index}
                  variants={slideInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Secondary Glow for all cards on hover */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <HackathonCard
                    hackathon={hackathon}
                    variant={index === 0 ? "featured" : "default"}
                    onClick={() => setSelectedId(hackathon.id)}
                  />

                  {/* Top accent line on hover */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedId && selectedHackathon && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
              <motion.div
                layoutId={selectedId}
                className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
              >
                <div className="relative h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedHackathon.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full"
                    onClick={() => setSelectedId(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedHackathon.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedHackathon.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-background/20 text-white hover:bg-background/30 border-none">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Prize Pool</p>
                      <p className="font-semibold text-lg text-primary">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: selectedHackathon.currency }).format(selectedHackathon.totalPrizePool)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Participants</p>
                      <p className="font-semibold text-lg">{selectedHackathon.participantCount}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                      <p className="font-semibold text-lg">
                        {selectedHackathon.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                      <p className="font-semibold text-lg capitalize">{selectedHackathon.location.type}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">About the Event</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedHackathon.shortDescription}. Join us for an incredible weekend of building, learning, and networking with the best minds in the industry.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-border">
                    <Link to={`/hackathons/${selectedHackathon.id}`} className="flex-1">
                      <Button size="lg" className="w-full font-semibold text-lg h-12" variant="neon">
                        Register Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="h-12" onClick={() => setSelectedId(null)}>
                      Maybe Later
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Features */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30 bg-primary/5">
              <Zap className="h-3.5 w-3.5 mr-2 text-primary" />
              Platform Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to Win
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From team formation to project submission, we've got you covered with powerful tools designed for hackers.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                variants={scaleInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="group relative"
              >
                {/* Card Background Gradient */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
                
                <Card className="relative p-8 h-full border border-primary/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Icon Container */}
                  <motion.div
                    className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon className="h-8 w-8 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary/50 to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Additional Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose HackConnect?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The most comprehensive platform for hackers to discover, compete, and succeed.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Rocket,
                title: "Launch Your Career",
                description: "Build an impressive portfolio and attract opportunities from top companies.",
              },
              {
                icon: Target,
                title: "Stay Organized",
                description: "Keep track of deadlines, team progress, and project milestones in one place.",
              },
              {
                icon: Lightbulb,
                title: "Get Inspired",
                description: "Learn from amazing projects and connect with the most talented hackers worldwide.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                variants={slideInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <item.icon className="h-10 w-10 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border border-primary/20 bg-gradient-to-br from-white/80 via-white/40 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/5 backdrop-blur-xl shadow-2xl">
              {/* Animated Border Glow */}
              <motion.div
                className="absolute -inset-px bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />

              <CardContent className="relative py-20 px-8 text-center">
                <motion.h2
                  className="text-4xl sm:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Ready to Start Building?
                </motion.h2>
                
                <motion.p
                  className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Join thousands of hackers who have found their teams, won prizes, and launched their careers through HackConnect.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Link to="/signup">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        variant="neon" 
                        className="h-14 px-10 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50"
                      >
                        Get Started Free
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/explore">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="h-14 px-10 text-base font-semibold hover:bg-primary/5"
                      >
                        Browse Hackathons
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
