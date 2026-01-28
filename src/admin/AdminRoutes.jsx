
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth/auth";

export default function AdminRoutes({ children }) {
  return isAuthenticated() ? children : <Navigate to="/admin/login" />;
}