export const checkAuth = async () => {
    const token = await localStorage.getItem("token");

    if(!token) return false;

    try {
        const response = await fetch("https://blog-portifolio.onrender.com/verifyToken", {
            headers: { 'Authorization': token },
        });

        if(response.ok) {
            return true;
        } else {
            localStorage.removeItem("token");
            return false;
        }
    } catch(err) {
        localStorage.removeItem("token");
        console.log(err);
        return false;
    }
};