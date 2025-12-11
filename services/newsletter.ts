import { apiRequest } from "./api";

export interface NewsletterSubscribeRequest {
  email: string;
}

export async function subscribeNewsletter(
  email: string
): Promise<{ data?: { message: string }; error?: string }> {
  return apiRequest<{ message: string }>("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function unsubscribeNewsletter(
  email: string
): Promise<{ data?: { message: string }; error?: string }> {
  return apiRequest<{ message: string }>("/newsletter/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
