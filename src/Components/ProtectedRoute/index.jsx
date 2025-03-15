import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../utils/checkAuth";

export const ProtectedRoute = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    useEffect(() => {
        const verifyLogin = async () => {
            const authenticated = await checkAuth();
            setIsLoggedIn(authenticated);
        };
        verifyLogin();
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }
    
    return isLoggedIn ? children : <Navigate to={"/admin"} />;
};