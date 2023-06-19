import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const authUser = useSelector((state) => state.auth.user);
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
