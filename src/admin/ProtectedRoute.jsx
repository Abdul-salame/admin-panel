
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");          
  const adminData = localStorage.getItem("gmi_admin");  

  // Not logged in at all
  if (!token || !adminData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const admin = JSON.parse(adminData);

    // Only allow SUPERADMIN
    if (admin.role !== "SUPERADMIN") {
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // Corrupted data in localStorage
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and authorized
  return children;
}
