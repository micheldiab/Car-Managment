import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";


const ProtectedRoutes = (props) => {
    const { user } = props;
    console.log(user);
    return user ? <Outlet /> : <Navigate to="/" /> ;
};

export default ProtectedRoutes;