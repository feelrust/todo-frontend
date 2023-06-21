import { Navigate, Outlet } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import NavBar from "../../components/navBar";

export default function ProtectedLayout({ role = "", redirectPath = "/" }) {
  const authUser = useSelector((state) => state.auth.user);
  const isAdmin = authUser ? authUser.roles.includes("Admin") : false;
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "" && !authUser.roles.includes(role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <NavBar isAdmin={isAdmin} />
      <Outlet />
    </>
  );
}

ProtectedLayout.propTypes = {
  role: PropTypes.string,
  redirectPath: PropTypes.string,
};
