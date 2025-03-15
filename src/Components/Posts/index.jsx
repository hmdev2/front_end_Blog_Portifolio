import "./index.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export const Post = ({
    postTitle, 
    postDescription, 
    postImage,
    postUrlGitHubRepositore,
    postUrlSite,
    postSitePrev, 
    altImage, 
    onClick, 
    postId, 
    onDelete, 
    postAllDescription
}) => {
    const {
        isLoggedIn, setIsEditing,
        setTitleForEdite,
        setdescriptionForEdite,
        setimageUrlForEdite,
        setUrlGitHubRepositoreForEdite,
        setUrlSiteForEdite,
        setSitePrevForEdite
    } = useAuth();
    const navigate = useNavigate();

    const deletePost = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`https://blog-portifolio.onrender.com/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            });

            if(!response.ok) {
                throw new Error("Erro ao deletar o post");
            }

            onDelete(postId);
        } catch(err) {
            console.log(err.message);
        }
    };

    const updatePost = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        setTitleForEdite(postTitle);
        setdescriptionForEdite(postAllDescription);
        setimageUrlForEdite(postImage);
        setUrlGitHubRepositoreForEdite(postUrlGitHubRepositore || "");
        setUrlSiteForEdite(postUrlSite || "");
        setSitePrevForEdite(postSitePrev);

        setIsEditing(true);
        navigate(`/editePost/${postId}`);
    }
    
    return(
        <div className="PostContainer" onClick={onClick}>
            <div className="postContent">
                <h1>{postTitle}</h1>
                <ReactMarkdown>{postDescription}</ReactMarkdown>
                {
                    isLoggedIn ? (
                        <div className="buttons">
                            <button className="delete" onClick={deletePost}>
                                Apagar Post
                            </button>
                            <button className="edite" onClick={updatePost}>
                                Editar Post
                            </button>
                        </div>
                    ) : ""
                }
            </div>
            <div className="postImage">
                <img src={postImage} alt={altImage}></img>
            </div>
        </div>
    )
}