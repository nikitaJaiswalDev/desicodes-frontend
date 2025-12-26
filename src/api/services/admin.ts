import { api as apiClient } from "../axios";

export interface UserAdminData {
    id: number;
    username: string;
    email: string;
    user_type: string;
    is_active: boolean;
    created_at: string;
    subscription_status: string | null;
    subscription_plan: string | null;
    execution_count: number;
    certificate_count: number;
}

export interface SubscriptionAdminData {
    id: number;
    user_email: string;
    plan_name: string;
    status: string;
    amount_paid: number;
    next_due_date: string | null;
    created_at: string;
    current_period_end: string | null;
}

export interface LanguageData {
    id: number;
    name: string;
    slug: string;
}

export interface LanguageCreate {
    name: string;
    slug: string;
}

export interface DashboardStats {
    total_users: number;
    total_admins: number;
    active_subscriptions: number;
    total_revenue: number;
    total_executions: number;
    total_languages: number;
}

// Admin API Client
export const adminApi = {
    // Dashboard Stats
    getStats: async (): Promise<DashboardStats> => {
        const response = await apiClient.get<DashboardStats>("/admin/stats");
        return response.data;
    },

    // Users Management
    getUsers: async (search?: string, skip = 0, limit = 100): Promise<UserAdminData[]> => {
        const params: any = { skip, limit };
        if (search) params.search = search;
        const response = await apiClient.get<UserAdminData[]>("/admin/users", { params });
        return response.data;
    },

    toggleUserStatus: async (userId: number): Promise<any> => {
        const response = await apiClient.patch(`/admin/users/${userId}/toggle-status`);
        return response.data;
    },

    deleteUser: async (userId: number): Promise<void> => {
        await apiClient.delete(`/admin/users/${userId}`);
    },

    // Subscriptions Management
    getSubscriptions: async (skip = 0, limit = 100): Promise<SubscriptionAdminData[]> => {
        const response = await apiClient.get<SubscriptionAdminData[]>("/admin/subscriptions", {
            params: { skip, limit },
        });
        return response.data;
    },

    // Languages Management
    getLanguages: async (): Promise<LanguageData[]> => {
        const response = await apiClient.get<LanguageData[]>("/admin/languages");
        return response.data;
    },

    createLanguage: async (language: LanguageCreate): Promise<LanguageData> => {
        const response = await apiClient.post<LanguageData>("/admin/languages", language);
        return response.data;
    },

    deleteLanguage: async (languageId: number): Promise<void> => {
        await apiClient.delete(`/admin/languages/${languageId}`);
    },
};
