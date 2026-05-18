import type { MouseEvent } from "react";

export const Navigation = () => {
    const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        event.preventDefault();

        const target = document.getElementById(sectionId);

        if (!target) {
            return;
        }

        target.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    return (
        <header className="hero_header">
            <div className="hero_header_inner">
                <nav className="hero_nav">
                    <a href="/#slice2" onClick={(event) => handleSectionClick(event, "slice2")}>Для кого</a>
                    <a href="/#slice3" onClick={(event) => handleSectionClick(event, "slice3")}>Платформа</a>
                    <a href="/#slice4" onClick={(event) => handleSectionClick(event, "slice4")}>Партнёры</a>
                    <a href="/#slice5" onClick={(event) => handleSectionClick(event, "slice5")}>Разработчики</a>
                    <a href="/#slice6" onClick={(event) => handleSectionClick(event, "slice6")}>FAQ</a>
                </nav>
            </div>
        </header>
    );
};
