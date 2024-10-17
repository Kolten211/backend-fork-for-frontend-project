
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ( {children }) => {
    const sessionUser = useSelector(state => state.session.user);

    return sessionUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute