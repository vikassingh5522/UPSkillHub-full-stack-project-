import { apiRequest } from "./api";

export interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  icon: string;
  url: string;
  accessCount: number;
}

export interface ResourceFilters {
  type?: string;
}

export async function getResources(
  filters?: ResourceFilters
): Promise<{ data?: Resource[]; error?: string }> {
  const params = new URLSearchParams();

  if (filters?.type) params.append("type", filters.type);

  const queryString = params.toString();
  const endpoint = `/resources${queryString ? `?${queryString}` : ""}`;

  return apiRequest<Resource[]>(endpoint);
}

export async function trackResourceAccess(
  id: string
): Promise<{ data?: { message: string }; error?: string }> {
  return apiRequest<{ message: string }>(`/resources/${id}/access`, {
    method: "POST",
  });
}
