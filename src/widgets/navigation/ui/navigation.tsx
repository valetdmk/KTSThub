import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <header className="hero_header">
            <div className="hero_header_inner">
                <nav className="hero_nav">
                    <Link to={"/aboutus"}>О нас</Link>
                    <Link to={"/achievements"}>Достижения</Link>
                    <Link to={"/developers"}>Разработчики</Link>
                    <Link to={"/partners"}>Партнеры</Link> 
                    <Link to={"/faq"}>FAQ</Link> 
                </nav>
            </div>
        </header>
    );
};