import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    console.log(auth)
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.roles
            ? <Navigate to="/products" state={{ from: location }} replace />
            : <Navigate to="/login/user" state={{ from: location }} replace />
    )
}

export default RequireAuth;