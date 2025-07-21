const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com/api"
    : "http://localhost:3000/api";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MemberResponse {
  members: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("admin_token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  // Auth methods
  async login(
    password: string
  ): Promise<{ token: string; user: { role: string } }> {
    const result = await this.request<{
      token: string;
      user: { role: string };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    this.setToken(result.token);
    return result;
  }

  logout() {
    this.clearToken();
  }

  // Public member methods
  async getPublicMembers(
    page: number = 1,
    limit: number = 10,
    search?: string,
    department?: string
  ): Promise<MemberResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);
    if (department) params.append("department", department);

    return this.request<MemberResponse>(`/members/public?${params}`);
  }

  async getPublicMemberById(idNumber: string): Promise<any> {
    return this.request<any>(`/members/public/${encodeURIComponent(idNumber)}`);
  }

  // Member registration
  async createMember(memberData: any): Promise<any> {
    return this.request<any>("/members", {
      method: "POST",
      body: JSON.stringify(memberData),
    });
  }

  // Admin methods
  async getAdminMembers(
    page: number = 1,
    limit: number = 10,
    search?: string,
    department?: string,
    state?: string
  ): Promise<MemberResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);
    if (department) params.append("department", department);
    if (state) params.append("state", state);

    return this.request<MemberResponse>(`/admin/members?${params}`);
  }

  async getDepartments(): Promise<string[]> {
    return this.request<string[]>("/admin/departments");
  }

  async getStates(): Promise<string[]> {
    return this.request<string[]>("/admin/states");
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>("/health");
  }
}

export const apiClient = new ApiClient();
