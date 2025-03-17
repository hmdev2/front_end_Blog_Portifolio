import { useLocation} from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/free-brands-svg-icons';
import { faLink} from '@fortawesome/free-solid-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons';
import ReactMarkdown from 'react-markdown';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript.min.js';


export const ProjectPage = () => {
    const location = useLocation();
    const id = location.state.postId;
    const [postInfo, setPostInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`https://blog-portifolio.onrender.com/postPage/${id}`)
            .then((response) => response.json())
            .then((data) =>{       
                setPostInfo(...data);
            })
            .catch((error) => console.log(error));
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        document.querySelectorAll('p').forEach(p => {
            if (p.querySelector('img')) {  
                p.style.width = '100%';
                p.style.backgroundColor = 'transparent';
                p.style.display = 'flex';
                p.style.alignItems = 'center';
                p.style.justifyContent = 'center';
                p.style.marginLeft = '0.7rem';
            }
        });

        const codeBlocks = document.querySelectorAll('code');
        codeBlocks.forEach(block => {
            block.classList.add('language-javascript');
                Prism.highlightElement(block);
        });
    }, [postInfo]);


     if (!postInfo) {
        return <p>Carregando...</p>;
    }

    
    return (
    
            <section className='sectionProjectPage'>
                <div className='projectPageContent'>
                    {postInfo.sitePrev ? (
                        <>
                            <p className='prevSiteLabel'>Prévia do site</p>
                            <div className='inframeContent'>
                                <iframe 
                                    title={`${postInfo.title}Demonstration`}
                                    src={postInfo.urlSite} 
                                    width="100%" 
                                    height="100%" 
                                    className='siteWindow'
                                ></iframe>
                            </div>
                        </>
                    ) : (
                        <div className='imageContainer'>
                            <img src={postInfo.imageUrl} alt={postInfo.title}/>
                        </div>
                    )}
                    <div className='textContainer'>
                        <h1>{postInfo.title}</h1>
                        <ReactMarkdown>{postInfo.description}</ReactMarkdown>
                        {/* <p dangerouslySetInnerHTML={{ __html: formatedText }}></p> */}
                    </div>
                    <div className='links'>
                        <a href={postInfo.urlGitHubRepositore}
                            target="_blank" 
                            rel="noreferrer noopener"
                        >
                            <FontAwesomeIcon className='fontAwesomeIcon' icon={faGithub} />
                        </a>
                        <a href={postInfo.urlSite}
                           target="_blank" 
                           rel="noreferrer noopener"
                        >
                            <FontAwesomeIcon className='fontAwesomeIcon' icon={faLink} />
                        </a>
                    </div>
                </div>

            </section>
        
    );
}