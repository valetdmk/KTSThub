import "./index.scss";
import { Background } from "../../../shared/ui/Background/Background";
import logo from "../../../shared/assets/logo.png";
import participantRole from "../../../shared/assets/participantRole.png";
import partnerRole from "../../../shared/assets/partnerRole.png";

const ROLE_CARDS = [
  {
    index: "01",
    label: "участник",
    image: participantRole,
    imageAlt: "Роль участника",
    actionLabel: "Присоединиться к Миру КЦТхак",
    href: "https://t.me/kcthack",
  },
  {
    index: "02",
    label: "партнёр",
    image: partnerRole,
    imageAlt: "Роль партнёра",
    actionLabel: "Стать Нашим Партнёром",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSf8lYYBIzyrj-PJ3Vq2rscPzG_aRkwe_f6eJZFF4Mgxo6CGUQ/viewform?usp=publish-editor",
  },
] as const;

export const RoleSelectPage = () => {
  return (
    <div className="role-select-shell">
      <Background />
      <img className="hero_logo role-select-page__logo" src={logo} alt="Логотип KTSThub" />
      <header className="hero_header role-select-page__header">
        <div className="hero_header_inner">
          <nav className="hero_nav">
            <a href="/#slice2">Для кого</a>
            <a href="/#slice3">Платформа</a>
            <a href="/#slice4">Партнёры</a>
            <a href="/#slice5">Разработчики</a>
            <a href="/#slice6">FAQ</a>
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
                  <span className="role-card__label" data-label={card.label} />
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
