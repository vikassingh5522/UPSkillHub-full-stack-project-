import { apiRequest } from "./api";

export interface ContactSubmissionRequest {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResponse {
  id: number;
  message: string;
}

export async function submitContactForm(
  request: ContactSubmissionRequest
): Promise<{ data?: ContactSubmissionResponse; error?: string }> {
  return apiRequest<ContactSubmissionResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
