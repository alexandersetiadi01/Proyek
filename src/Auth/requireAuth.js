import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    /*return (
        auth?.accountLevel?.find(accountLevel => allowedRoles?.includes(accountLevel))
            ? <Outlet />
            : auth?.user
                ? <Navigate to={location} state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );*/

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;