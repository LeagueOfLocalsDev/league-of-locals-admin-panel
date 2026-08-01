import { getServerAccessToken } from "@/lib/auth0";

export type UserProfile = {
  userId: string;
  auth0UserId: string;
  username: string;
  homeCity?: string;
  sex?: string;
  lifetimeRaces?: number;
};

const API_BASE = process.env.USER_API_BASE_URL || "http://localhost:8080";

export const getUsers = async (): Promise<UserProfile[]> => {
  const { token } = await getServerAccessToken();
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${token}`
  };

  const response = await fetch(`${API_BASE}/profiles`, { headers });
  if (!response.ok) throw new Error(`Failed to fetch users: ${response.status}`);
  return response.json();
};

// Fetch a single user profile by id. Automatically fetches the access token internally.
export const getUser = async (userId: string): Promise<UserProfile | null> => {
  const { token } = await getServerAccessToken();
  const response = await fetch(`${API_BASE}/profiles/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch user ${userId}: ${response.status}`);

  return response.json();
};

