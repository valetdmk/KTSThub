import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Background } from "../../../shared/ui/Background/Background";
import logo from "../../../shared/assets/logo.png";
import participantRole from "../../../shared/assets/participantRole.png";
import partnerRole from "../../../shared/assets/partnerRole.png";

const ROLE_CARDS = [
  {
    index: "01",
    label: "Телеграм канал",
    image: participantRole,
    imageAlt: "Роль участника",
    actionLabel: "Присоединится К Миру КЦТхак",
    href: "https://t.me/kcthack",
  },
  {
    index: "02",
    label: "Партнёр",
    image: partnerRole,
    imageAlt: "Роль партнёра",
    actionLabel: "Стать Нашим Партнёром",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSf8lYYBIzyrj-PJ3Vq2rscPzG_aRkwe_f6eJZFF4Mgxo6CGUQ/viewform?usp=publish-editor",
  },
] as const;

export const RoleSelectPage = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.classList.add("role-select-mobile-scroll-hidden");
    document.documentElement.classList.add("role-select-mobile-scroll-hidden");

    return () => {
      document.body.classList.remove("role-select-mobile-scroll-hidden");
      document.documentElement.classList.remove("role-select-mobile-scroll-hidden");
    };
  }, []);

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
    <div className={`role-select-shell ${isMobileNavOpen ? "menu-open" : ""}`}>
      <Background />
      <img className="hero_logo role-select-page__logo" src={logo} alt="Логотип KTSThub" />
      <header ref={headerRef} className={`hero_header role-select-page__header ${isMobileNavOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="hero_menu_button"
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
          aria-expanded={isMobileNavOpen}
          aria-controls="role-select-navigation"
          aria-label={isMobileNavOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className="hero_menu_button-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <div className="hero_header_inner">
          <nav id="role-select-navigation" className="hero_nav">
            <a className="hero_nav_link" href="/#slice2" onClick={() => setIsMobileNavOpen(false)}>Для кого</a>
            <a className="hero_nav_link" href="/#slice3" onClick={() => setIsMobileNavOpen(false)}>Платформа</a>
            <a className="hero_nav_link" href="/#slice4" onClick={() => setIsMobileNavOpen(false)}>Партнёры</a>
            <a className="hero_nav_link" href="/#slice5" onClick={() => setIsMobileNavOpen(false)}>Разработчики</a>
            <a className="hero_nav_link" href="/#slice6" onClick={() => setIsMobileNavOpen(false)}>FAQ</a>
          </nav>
        </div>
      </header>
      <main className="role-select-page">
        <div className="role-select-page__inner">
          <h1 className="role-select-page__title">Выберите свою роль в нашем мире КЦТхак</h1>
          <section className="role-select-page__grid" aria-label="Выбор роли">
            {ROLE_CARDS.map((card) => (
              <article key={card.index} className="role-card">
                <div className="role-card__meta">
                  <span className="role-card__index">{card.index}</span>
                  <span className="role-card__label">{card.label}</span>
                </div>
                <div className="role-card__image-wrap">
                  <img className="role-card__image" src={card.image} alt={card.imageAlt} />
                </div>
                <a className="role-card__action" href={card.href}>
                  {card.actionLabel}
                </a>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};
