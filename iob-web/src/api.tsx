import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";

const baseURL = "http://localhost:3000/api/v1";
export const api = axios.create({ baseURL });

export const getToken = () => localStorage.getItem("token") || undefined;
export const setToken = (t?: string) =>
  t ? localStorage.setItem("token", t) : localStorage.removeItem("token");
export const logout = () => setToken(undefined);

function applyAuthHeader(instance = api) {
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const headers = (config.headers ?? {}) as RawAxiosRequestHeaders;
    headers["Accept"] = "application/json";
    const token = getToken();
    if (token) headers["Authorization"] = token;
    config.headers = headers;
    return config;
  });

  instance.interceptors.response.use(
    (r: AxiosResponse) => r,
    (err: AxiosError) => {
      if ((err.response?.status ?? 0) === 401) {
        logout();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );
}
applyAuthHeader(api);

export async function login(email: string, password: string) {
  const res = await api.post("/login", { user: { email, password } });
  const token =
    (res.headers.authorization as string | undefined) ||
    (res.data as any)?.token;
  if (token) setToken(token.startsWith("Bearer ") ? token : `Bearer ${token}`);
  return res.data;
}

export async function signup(name: string, email: string, password: string) {
  const res = await api.post("/signup", {
    user: { name, email, password, password_confirmation: password },
  });
  return res.data;
}

export async function fetchCountries() {
  const res = await api.get("/countries");
  return res.data;
}

export async function fetchCountry(code: string) {
  const res = await api.get(`/countries/${code}`);
  return res.data;
}
