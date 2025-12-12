import { apiRequest } from "./api";

export interface Payment {
  id: number;
  userId: number;
  courseId: number;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "card" | "credit_card" | "debit_card" | "upi" | "netbanking" | "wallet" | "subscription" | "one-time";
  transactionId: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePaymentRequest {
  courseId: number;
  amount: number;
  paymentMethod: "card" | "credit_card" | "debit_card" | "upi" | "netbanking" | "wallet" | "subscription" | "one-time";
  cardToken?: string;
  upiId?: string;
}

export async function createPayment(
  request: CreatePaymentRequest
): Promise<{ data?: Payment; error?: string }> {
  return apiRequest<Payment>("/payments", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function getPaymentById(
  id: number
): Promise<{ data?: Payment; error?: string }> {
  return apiRequest<Payment>(`/payments/${id}`);
}
