import { api } from "../axios";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export const AuthService = {
  login: (data: LoginPayload): Promise<LoginResponse> =>
    api.post("/auth/login", data).then((res) => res.data),

  getProfile: () =>
    api.get("/auth/profile").then((res) => res.data),
};
