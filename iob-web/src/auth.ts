import type { AxiosInstance } from "axios";

const TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem(TOKEN_KEY) || "";
export const isAuthed = () => !!getToken();

export const setToken = (token?: string) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const applyAuthHeader = (api: AxiosInstance) => {
  const t = getToken();
  if (t) api.defaults.headers.common["Authorization"] = t;
  else delete api.defaults.headers.common["Authorization"];
};
