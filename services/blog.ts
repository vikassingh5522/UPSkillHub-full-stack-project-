import type { BlogPost } from "../types";
import { apiRequest } from "./api";

export interface BlogFilters {
  category?: string;
  limit?: number;
  offset?: number;
}

export async function getBlogPosts(
  filters?: BlogFilters
): Promise<{ data?: BlogPost[]; error?: string }> {
  const params = new URLSearchParams();

  if (filters?.category) params.append("category", filters.category);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.offset) params.append("offset", filters.offset.toString());

  const queryString = params.toString();
  const endpoint = `/blog${queryString ? `?${queryString}` : ""}`;

  return apiRequest<BlogPost[]>(endpoint);
}

export async function getBlogPostById(
  id: string
): Promise<{ data?: BlogPost; error?: string }> {
  return apiRequest<BlogPost>(`/blog/${id}`);
}
