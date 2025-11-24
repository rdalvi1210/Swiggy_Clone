import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useSelector((state) => state.user);

  // ⏳ Wait for user to load before checking role
  if (loading) return null; // you can add a loader here

  // ❌ Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // ❌ Role not allowed → redirect
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // ✔ Allowed → show content
  return children;
}

export default ProtectedRoute;
