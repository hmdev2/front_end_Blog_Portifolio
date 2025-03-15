import { useEffect, useState } from "react";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [urlGitHubRepositore, setUrlGitHubRepositore] = useState("");
    const [urlSite, setUrlSite] = useState("");
    const [sitePrev, setSitePrev] = useState(false);
    const postData = {
        title, 
        description,
        imageUrl,
        urlGitHubRepositore,
        urlSite,
        sitePrev
    };

    const [error, setError] = useState("");
    const [postCreated, setPostCreated] = useState(false);
    const {
        isEditing, setIsEditing,
        titleForEdite, setTitleForEdite,
        descriptionForEdite, setdescriptionForEdite,
        imageUrlForEdite, setimageUrlForEdite,
        urlGitHubRepositoreForEdite, setUrlGitHubRepositoreForEdite,
        urlSiteForEdite, setUrlSiteForEdite,
        sitePrevForEdite, setSitePrevForEdite
    } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        setTitle(titleForEdite || "");
        setDescription(descriptionForEdite || "");
        setImageUrl(imageUrlForEdite || "");
        setUrlGitHubRepositore(urlGitHubRepositoreForEdite || "");
        setUrlSite(urlSiteForEdite || "");
        setSitePrev(sitePrevForEdite || false);
    }, [
        isEditing, 
        titleForEdite, 
        descriptionForEdite, 
        imageUrlForEdite, 
        urlGitHubRepositoreForEdite, 
        urlSiteForEdite, 
        sitePrevForEdite
    ]);

    useEffect(() => {
        return () => {
            setTitle("");
            setDescription("");
            setImageUrl("");
            setUrlGitHubRepositore("");
            setUrlSite("");
            setSitePrev(false);
            setIsEditing(false);
            setTitleForEdite("");
            setdescriptionForEdite("");
            setimageUrlForEdite("");
            setUrlGitHubRepositoreForEdite("");
            setUrlSiteForEdite("");
            setSitePrevForEdite(false);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(title === "" || description === "" || imageUrl === "") {
            setError("Preencha todos os campos");
            return;
        }

        if(sitePrev && urlSite === "") {
            setError("Digite a Url do site");
            return;
        }


        if (isEditing) {

            try {
                const response = await fetch(`https://blog-portifolio.onrender.com/edite/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify(postData),
                });

                if (response.ok) {
                    await response.json();
                    setPostCreated(true);

                    setTitle("");
                    setDescription("");
                    setImageUrl("");
                    setUrlGitHubRepositore("");
                    setUrlSite("");
                    setSitePrev(false);
                    setTitleForEdite("");
                    setdescriptionForEdite("");
                    setimageUrlForEdite("");
                    setUrlGitHubRepositoreForEdite("");
                    setUrlSiteForEdite("");
                    setSitePrevForEdite(false);

                    setTimeout(() => {
                        setPostCreated(false);
                        setIsEditing(false);
                        navigate("/");
                    }, 1000);

                }

            } catch(err) {
                setError(err.message);
            }
        } else {
            try {
    
                const response = await fetch("https://blog-portifolio.onrender.com/admin/createPost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify(postData),
                });
    
                if(response.ok) {
                    await response.json();
                    setPostCreated(true);
                    setTitle("");
                    setDescription("");
                    setImageUrl("");
                    setUrlGitHubRepositore("");
                    setUrlSite("");
                    setSitePrev(false);
    
                    setTimeout(() => {
                        setPostCreated(false);
                    }, 3000);
                    
                } else {
                    throw new Error("Erro ao criar o post");
                }
    
            } catch(err) {
                setError(err.message);
            }
        }
    };
    
    return ( 
            <section className="createPostSection">
                <form className="formCreatePost" onSubmit={handleSubmit}>
                    <div style={{width: "100%"}}>
                        <button 
                            type="submit"
                            style={{
                                backgroundColor: `${isEditing ? "orange" : "lightgreen"}`
                            }}
                        >{
                            isEditing? "Editar" : "Criar"
                        }</button>
                    </div>

                    <label htmlFor="title">Nome do Post:</label>
                    <input 
                        placeholder="Digite o nome do post..."
                        autoComplete="off"
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="imageUrl">Url de Imagem:</label>
                    <input
                        placeholder="Url da imagem..."
                        autoComplete="off"
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <div className="siteAndGitUrls">
                    
                        <input 
                            autoComplete="off"
                            type="url"
                            id="urlGitHubRepositore"
                            placeholder="Url do repositório Git Hub"
                            name="urlGitHubRepositore"
                            value={urlGitHubRepositore}
                            onChange={(e) => setUrlGitHubRepositore(e.target.value)}
                        />

                        <div style={{
                            display: "flex", 
                            flexDirection:"column",
                            alignItems:"center",
                            }}>
                            <label htmlFor="sitePrev">Prévia do site?</label>
                            <input
                                className="checkBox"
                                type="checkbox"
                                id="sitePrev"
                                name="sitePrev"
                                checked={sitePrev}
                                onChange={(e) => setSitePrev(e.target.checked)}
                            />
                        </div>

                        <input 
                            className={sitePrev ? "appearInput" : "hiddenInput"}
                            autoComplete="off"
                            placeholder="Url do site"
                            type="url"
                            id="urlSite"
                            name="urlSite"
                            value={urlSite}
                            onChange={(e) => setUrlSite(e.target.value)}
                        />
                    
                    </div>

                    <label htmlFor="description">Descrição do Post:</label>
                    <textarea
                        placeholder="Digite algo (Use Markdown)..."
                        className="descriptionArea" 
                        type="text" 
                        id="description" 
                        name="description"
                        value={description} 
                        onChange={(e) => {
                            setDescription(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}
                    />

                    {postCreated && <p style={{color: "green"}}>{
                        isEditing ? "Post Editado" : "Post Criado"
                    }</p>}
                    {error && <p style={{color: "red"}}>{error}</p>}
                </form>
            </section>
        
    );
};