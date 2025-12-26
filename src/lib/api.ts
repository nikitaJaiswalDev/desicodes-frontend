// src/lib/api.ts
export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

async function request<T>(path: string, options: RequestInit & { skipAuthRedirect?: boolean } = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    if (res.status === 401 && !options.skipAuthRedirect) {
      localStorage.removeItem('dc_token');
      localStorage.removeItem('dc_user');
      window.location.href = '/login';
    }
    const message = (data && (data.detail || data.message)) || res.statusText;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }

  return data as T;
}

export async function registerUser(payload: RegisterPayload) {
  const result = await request<{
    access_token: string;
    token_type: string;
    user: { id: number; username: string; email: string; user_type: string; is_active: boolean };
  }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (result.access_token && result.user) {
    try {
      localStorage.setItem('dc_token', result.access_token);
      localStorage.setItem('dc_user', JSON.stringify(result.user));
    } catch {
      // ignore
    }
  }

  return result;
}

export async function loginUser(payload: LoginPayload) {
  const result = await request<{
    access_token: string;
    token_type: string;
    user: { id: number; username: string; email: string; user_type: string; is_active: boolean };
  }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Persist token for subsequent calls
  try {
    localStorage.setItem('dc_token', result.access_token);
    localStorage.setItem('dc_user', JSON.stringify(result.user));
  } catch {
    // ignore storage errors
  }

  return result;
}

export async function socialLogin(payload: { provider: string; email?: string; name?: string; token?: string; code?: string }) {
  const result = await request<{
    access_token: string;
    token_type: string;
    user: { id: number; username: string; email: string; user_type: string; is_active: boolean };
  }>('/auth/social-login', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuthRedirect: true,
  });

  // Persist token for subsequent calls
  try {
    localStorage.setItem('dc_token', result.access_token);
    localStorage.setItem('dc_user', JSON.stringify(result.user));
  } catch {
    // ignore storage errors
  }

  return result;
}

export function authHeader(): Record<string, string> {
  const token = localStorage.getItem('dc_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type Plan = {
  id: number;
  name: string;
  type: string;
  price: number;
  currency: string;
  features: Record<string, any>;
};

export async function getAvailablePlans() {
  return request<Plan[]>('/plans', {
    headers: authHeader(),
  });
}

export type Subscription = {
  id: number;
  user_id: number;
  plan_id: number;
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  created_at: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end?: boolean;
  cancelled_at?: string | null;
};

export async function getUserSubscriptions() {
  return request<Subscription[]>('/subscriptions', {
    headers: authHeader(),
  });
}

export type Invoice = {
  id: number;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  invoice_url?: string;
};

export type PaymentHistory = {
  id: number;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  plan_name?: string;
  payment_method?: string;
  created_at: string;
};

export async function getInvoices() {
  return request<Invoice[]>('/billing/invoices', {
    headers: authHeader(),
  });
}

export async function getPaymentHistory() {
  return request<PaymentHistory[]>('/payments/history', {
    headers: authHeader(),
  });
}

export type RazorpayOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
};

export async function createRazorpayOrder(planId: number, currency = 'USD') {
  return request<RazorpayOrderResponse>('/payments/razorpay/create-subscription', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ plan_id: planId, currency }),
  });
}

export type RazorpayVerifyRequest = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function verifyRazorpayPayment(payload: RazorpayVerifyRequest) {
  return request<{ status: string; message: string }>('/payments/razorpay/verify', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(payload),
  });
}

export type CodeRunResponse = {
  output: string;
};

export async function executeCode(language: string, code: string) {
  return request<CodeRunResponse>('/execute', {
    method: 'POST',
    headers: authHeader(), // Always include auth header (will be empty if no token)
    body: JSON.stringify({ language, code }),
  });
}

export async function getUserStats() {
  return request<{ total_executions: number; ai_requests: number }>('/auth/stats', {
    headers: authHeader(),
  });
}

export type Certificate = {
  id: string;
  language: string;
  slug: string;
  issued_at: string;
  download_url: string;
};

export async function getCertificates() {
  return request<{ eligible: boolean; message?: string; certificates: Certificate[] }>('/certificates', {
    headers: authHeader(),
  });
}

export async function sendContactMessage(payload: { name: string; email: string; query_type: string; message: string }) {
  return request<{ message: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: authHeader(), // Optional, could be public too but likely better authenticated if possible. 
    // Wait, is sidebar visible to logged out users? 
    // The sidebar is on CertificationsPage which redirects if not logged in? 
    // Actually user might not be logged in if used elsewhere.
    // But my `request` helper sends auth header if exists.
  });
}

export async function cancelSubscription() {
  return request<{
    status: string;
    message: string;
    period_end?: string;
    access_until?: string;
  }>('/subscriptions/cancel', {
    method: 'POST',
    headers: authHeader(),
  });
}

export async function resumeSubscription() {
  return request<{
    status: string;
    message: string;
  }>('/subscriptions/resume', {
    method: 'POST',
    headers: authHeader(),
  });
}

export async function downloadInvoice(invoiceId: number) {
  return request<{ invoice_url: string; invoice_id: number }>(`/invoices/download/${invoiceId}`, {
    method: 'GET',
    headers: authHeader(),
  });
}

export async function getCurrentPaymentMethod() {
  return request<{
    has_payment_method: boolean;
    payment_method?: {
      type: string;
      card_brand?: string;
      card_last4?: string;
      card_exp_month?: number;
      card_exp_year?: number;
    };
    message?: string;
  }>('/payment-method/current', {
    method: 'GET',
    headers: authHeader(),
  });
}

