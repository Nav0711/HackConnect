import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export interface CreateTeamData {
  name: string;
  hackathon_id: string;
  looking_for: string[];
  project_repo?: string;
}

export function useTeams() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createTeam = useCallback(async (data: CreateTeamData) => {
    if (!user) return { success: false, error: "You must be logged in to create a team." };
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/teams/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          leader_id: user.id,
          members: [user.id], // Leader is automatically a member
          status: "open"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create team");
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return {
    createTeam,
    isLoading
  };
}
