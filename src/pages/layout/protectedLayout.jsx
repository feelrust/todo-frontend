import { Navigate, Outlet } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import NavBar from "../../components/navBar";
import { topMenu } from "../../helpers/menu.config";

export default function ProtectedLayout({ role = "", redirectPath = "/" }) {
  const authUser = useSelector((state) => state.auth.user);
  const userMenu = topMenu.filter(
    (menu) => menu.role === undefined || authUser?.roles.includes(menu.role)
  );

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "" && !authUser.roles.includes(role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <NavBar links={userMenu} />
      <Outlet />
    </>
  );
}

ProtectedLayout.propTypes = {
  role: PropTypes.string,
  redirectPath: PropTypes.string,
};
