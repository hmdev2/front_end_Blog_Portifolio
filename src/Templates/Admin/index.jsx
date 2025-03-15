import { useState } from "react";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";

export const Admin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {isLoggedIn, logout, login} = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://blog-portifolio.onrender.com/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Login Failed");
            }

            login(data.token);

            setUsername("");
            setPassword("");
        } catch(err) {
            setError(err.message);
        }
    };

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    return (
            <section className="adminSection">
                {!isLoggedIn ? (

                    <form className="loginForm" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username: </label>
                        <input 
                            autoComplete="off"
                            type="text" 
                            id="username" 
                            name="username"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <label htmlFor="login">Password: </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button type="submit">Login</button>
                        {error && <p style={{color: "red"}}>{error}</p>}
                    </form>
                ) : (
                    <div>
                        <p>Você está logado!</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </section> 
    );
};