import { Link } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";
import CloudAdvancedImage from "../CloudAdvancedImage";


export const Header = () => {
    const {isLoggedIn, logout} = useAuth();

    return (
        <header>
            <div className="logo">
                <CloudAdvancedImage imageName={"iconeLogo_kbr7g4"}/> 
            </div>
            <Link className="Link" to={"/"}>Home</Link>
            <Link className="Link" to={"/sobre"}>Sobre</Link>
            {
                isLoggedIn ? (
                    <Link 
                    className="Link" 
                    to={"/admin/createPost"}>
                        Criar Post
                    </Link>
                ) : ""
            }
            {
                isLoggedIn ? (
                    <Link 
                    className="Link"
                    to={"/"}
                    onClick={logout}>
                        Logout
                    </Link>
                ) : ""
            }
        </header>
    );
}