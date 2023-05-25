import { Navigate } from "react-router-dom";

export default function PrivateRoute(props)
{
    return props.jwt ? <Navigate to="/play" /> : props.children;
}