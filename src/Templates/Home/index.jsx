import { useNavigate } from "react-router-dom";
import { Post } from "../../Components/Posts";
import "./index.css";

import { useEffect, useState } from "react";
import { WelCome } from "../../Components/WelCome";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async() => {
      await fetch("https://blog-portifolio.onrender.com")
      .then((response) => response.json())
      .then((data) =>{
        setPosts(data);
      })
      .catch((error) => console.log(error));
    }
    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/postPage/${id}`);
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const cutDescription = (text) => {
    if(!text) return;
    const n = 10;

    const words = text.split(" ");
    if(words.length < n) return text;
    
    return words.slice(0, n).join(" ") + "...";
  }

  useEffect(() => {
    const elements = document.querySelectorAll('.PostContainer');
    elements.forEach(element => {
      element.classList.add('block');
    });
  });

  return ( 
    <section className="Home">

      <WelCome />

      <div id="posts">

       {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postTitle={post.title}
              postAllDescription={post.description}
              postDescription={cutDescription(post.description)}
              postImage={post.imageUrl}
              postId={post._id}
              postUrlGitHubRepositore={post.urlGitHubRepositore}
              postUrlSite={post.urlSite}
              postSitePrev={post.sitePrev}
              onDelete={handleDelete}
              onClick={() => handleClick(post._id)}
            />
        ))
      ) : (
        <p>Carregando...</p>
      )}
      </div>
    </section>
  );
}

export default Home;
