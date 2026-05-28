import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

export const Navigation = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);

    const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        event.preventDefault();

        const target = document.getElementById(sectionId);

        if (!target) {
            return;
        }

        target.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        setIsMobileNavOpen(false);
    };

    useEffect(() => {
        if (!isMobileNavOpen) {
            return;
        }

        const handlePointerDown = (event: globalThis.MouseEvent | TouchEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) {
                return;
            }

            if (!headerRef.current?.contains(target)) {
                setIsMobileNavOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("touchstart", handlePointerDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("touchstart", handlePointerDown);
        };
    }, [isMobileNavOpen]);

    return (
        <header ref={headerRef} className={`hero_header ${isMobileNavOpen ? "is-open" : ""}`}>
            <button
                type="button"
                className="hero_menu_button"
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                aria-expanded={isMobileNavOpen}
                aria-controls="home-navigation"
                aria-label={isMobileNavOpen ? "Закрыть меню" : "Открыть меню"}
            >
                <span className="hero_menu_button-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
            </button>
            <div className="hero_header_inner">
                <nav id="home-navigation" className="hero_nav">
                    <a className="hero_nav_link" href="/#slice2" onClick={(event) => handleSectionClick(event, "slice2")}>Для кого</a>
                    <a className="hero_nav_link" href="/#slice3" onClick={(event) => handleSectionClick(event, "slice3")}>Платформа</a>
                    <a className="hero_nav_link" href="/#slice4" onClick={(event) => handleSectionClick(event, "slice4")}>Партнёры</a>
                    <a className="hero_nav_link" href="/#slice5" onClick={(event) => handleSectionClick(event, "slice5")}>Разработчики</a>
                    <a className="hero_nav_link" href="/#slice6" onClick={(event) => handleSectionClick(event, "slice6")}>FAQ</a>
                </nav>
            </div>
        </header>
    );
};
