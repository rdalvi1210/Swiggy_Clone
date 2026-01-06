import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, initialized } = useSelector((state) => state.user);
  const location = useLocation();

  // Wait until `/auth/me` finishes
  if (!initialized) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "seller" || user.role === "admin")
      return <Navigate to="/seller-dashboard" replace />;
    if (user.role === "user") return <Navigate to="/" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
