import { Navigate, Outlet } from "react-router-dom";
import { getLogin } from "./repository";

function PrivateRoutes ({isLoggedIn}){
    
    const useAuth = () => {
        if(getLogin()!== null){
            return true;
        }else{
            return false;
        }
    }

    const auth = useAuth();

    return auth? <Outlet/> : <Navigate to="/" replace/>

    //return isLoggedIn ? <Outlet/> : <Navigate to="/" />;
}

export default PrivateRoutes;