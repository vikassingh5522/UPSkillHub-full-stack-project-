import { apiRequest } from "./api";

export interface Enrollment {
  id: number;
  courseId: number;
  paymentStatus: "pending" | "completed" | "free";
  progress: number;
  enrolledAt: string;
  course?: {
    id: string;
    title: string;
    instructor: string;
    rating: number;
    students: number;
    price: number;
    category: string;
    image: string;
    duration: string;
    level: string;
    description: string;
  };
}

export interface CreateEnrollmentRequest {
  courseId: number;
  paymentMethod?: "one-time" | "subscription";
}

export async function createEnrollment(
  request: CreateEnrollmentRequest
): Promise<{ data?: Enrollment; error?: string }> {
  return apiRequest<Enrollment>("/enrollments", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function getEnrollments(
  status?: "pending" | "completed" | "free"
): Promise<{ data?: Enrollment[]; error?: string }> {
  const params = new URLSearchParams();
  if (status) params.append("status", status);

  const queryString = params.toString();
  const endpoint = `/enrollments${queryString ? `?${queryString}` : ""}`;

  return apiRequest<Enrollment[]>(endpoint);
}

export async function getEnrollmentByCourseId(
  courseId: number
): Promise<{ data?: Enrollment; error?: string }> {
  return apiRequest<Enrollment>(`/enrollments/${courseId}`);
}
