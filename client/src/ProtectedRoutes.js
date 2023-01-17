import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";


const ProtectedRoutes = () => {
    const { user } = useAuth();
    console.log(user);
    return user ? <Outlet /> : <Navigate to="/" /> ;
};

export default ProtectedRoutes;