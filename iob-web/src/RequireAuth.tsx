import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  const loc = useLocation();
  return token ? <>{children}</> : <Navigate to="/login" replace state={{ from: loc }} />;
}