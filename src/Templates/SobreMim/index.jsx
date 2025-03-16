import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import CloudAdvancedImage from "../../Components/CloudAdvancedImage"

export const SobreMim = () => {
    return (
    
            <section className="sobreSection">
                <div className="sobreContent">
                    <div className="imageContent">
                        <CloudAdvancedImage imageName={"Pedro_Melo_Photo"} />
                    </div>
                    <div className="sobreText">
                        <div className="logoSobre">
                            <CloudAdvancedImage imageName={"logoNomeVermelho_oejmww"}/> 
                        </div>

                        <p>
                        Desenvolvedor fullstack com foco em aplicações modernas e 
                        bem estruturadas. Venho sempre aprimorando 
                        minhas habilidades para criar soluções eficientes e 
                        visualmente atraentes.
                        </p>
                        <p>
                            Atualmente, curso Análise e Desenvolvimento de Sistemas 
                            (ADS) na Universidade Católica e já concluí formações em 
                            desenvolvimento web, JavaScript, TypeScript, React, C# e 
                            .NET. Também estou aprofundando meus conhecimentos em SQL 
                            e bancos de dados relacionais.
                        </p>
                        <div className="buttonsContent">
                            <a href={"https://github.com/hmdev2"}
                                target="_blank" 
                                rel="noreferrer noopener"
                            >
                                <FontAwesomeIcon className='fontAwesomeIcon' icon={faGithub} />
                            </a>
                            <a href={""}
                                target="_blank" 
                                rel="noreferrer noopener"
                            >
                                <FontAwesomeIcon className='fontAwesomeIcon' icon={faLink} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        
    );
}