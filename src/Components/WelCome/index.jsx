import { ScrollLink } from '../ButtonVerPosts';
import './index.css';

export const WelCome = () => {

    return (
        <section className="topHome">
            <div className="siteWelCome">
                <div>
                    <p>Aqui você encontra meus projetos e experimentos</p>
                    <span>Pedro Melo</span>
                </div>
                <ScrollLink targetId={"posts"}>
                    Ver Projetos
                </ScrollLink>
            </div>
        </section>
    );
}