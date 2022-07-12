import { Navigate } from 'react-router-dom';
import useAuth from "./index";

export const ProtecedRoute = ({children}) => {
    const {authenticated} = useAuth();
    return authenticated === true ? children : <Navigate to={"/signin"} replace/>;
}