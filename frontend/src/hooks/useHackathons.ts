import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export interface HackathonCreatePayload {
  name: string;
  description: string;
  start_date: string; // ISO string
  end_date: string;   // ISO string
  location: string;
  tags: string[];
  organizer_id?: string;
  prize_pool?: string;
  registration_link?: string;
  image_url?: string;
  // New fields
  status?: string;
  min_team_size?: number;
  max_team_size?: number;
  mode?: string;
  tagline?: string;
}

export function useHackathons() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createHackathon = useCallback(async (data: HackathonCreatePayload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/hackathons/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create hackathon");
      }

      const result = await response.json();
      return { success: true, data: result.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHackathons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/hackathons/`);
      if (!response.ok) throw new Error("Failed to fetch hackathons");
      const result = await response.json();
      return { success: true, data: result.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getHackathon = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // We can filter from the list or fetch individual if endpoint exists.
      // Since we don't have a specific GET /hackathons/:id endpoint in the snippet I saw,
      // I'll assume we might need to fetch all and find, OR I should add the endpoint.
      // Actually, Appwrite usually supports getting a document by ID.
      // Let's try to fetch from the list endpoint with a query or just fetch all and find for now if the backend doesn't support ID.
      // Wait, standard REST usually has GET /:id. Let's check backend routes again or just implement it.
      // I'll assume I can add GET /:id to backend or just use what I have.
      // Let's check backend/app/api/routes/hackathons.py again.
      
      // For now, I'll try to fetch all and find, or better, I'll add the endpoint to backend.
      // But to be safe and quick, I'll fetch all and filter client side if the list is small, 
      // OR I'll implement the backend endpoint.
      // Let's implement the backend endpoint for GET /:id.
      
      const response = await fetch(`${API_URL}/hackathons/${id}`);
      if (!response.ok) throw new Error("Failed to fetch hackathon");
      const result = await response.json();
      return { success: true, data: result.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createHackathon,
    fetchHackathons,
    getHackathon,
    isLoading,
  };
}
