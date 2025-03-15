import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from "../utils/checkAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [titleForEdite, setTitleForEdite] = useState("");
    const [descriptionForEdite, setdescriptionForEdite] = useState("");
    const [imageUrlForEdite, setimageUrlForEdite] = useState("");
    const [urlGitHubRepositoreForEdite, setUrlGitHubRepositoreForEdite] = useState("");
    const [urlSiteForEdite, setUrlSiteForEdite] = useState("");
    const [sitePrevForEdite, setSitePrevForEdite] = useState(false);

    useEffect(() => {
        const loginAuth = async() => {
            const authenticated = await checkAuth();
            setIsLoggedIn(authenticated);
        };

        loginAuth();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider 
            value={
                {
                    isLoggedIn, setIsLoggedIn, 
                    login, 
                    logout, 
                    isEditing, setIsEditing,
                    titleForEdite, setTitleForEdite,
                    descriptionForEdite, setdescriptionForEdite,
                    imageUrlForEdite, setimageUrlForEdite,
                    urlGitHubRepositoreForEdite, setUrlGitHubRepositoreForEdite,
                    urlSiteForEdite, setUrlSiteForEdite,
                    sitePrevForEdite, setSitePrevForEdite
                }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}