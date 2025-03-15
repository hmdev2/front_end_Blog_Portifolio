import { Link } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";


export const Header = () => {
    const {isLoggedIn, logout} = useAuth();

    return (
        <header>
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