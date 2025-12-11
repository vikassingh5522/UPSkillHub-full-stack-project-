import type { Course } from "../types";
import { apiRequest } from "./api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface CourseFilters {
  category?: string;
  price?: "free" | "paid" | "all";
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getCourses(
  filters?: CourseFilters
): Promise<{ data?: Course[]; error?: string }> {
  const params = new URLSearchParams();

  if (filters?.category) params.append("category", filters.category);
  if (filters?.price) params.append("price", filters.price);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.offset) params.append("offset", filters.offset.toString());

  const queryString = params.toString();
  const endpoint = `/courses${queryString ? `?${queryString}` : ""}`;

  return apiRequest<Course[]>(endpoint);
}

export async function getCourseById(
  id: string
): Promise<{ data?: Course; error?: string }> {
  return apiRequest<Course>(`/courses/${id}`);
}
