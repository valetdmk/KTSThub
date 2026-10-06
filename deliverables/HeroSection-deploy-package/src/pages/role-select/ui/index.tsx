import "./index.scss";

const PARTNER_APPLICATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf8lYYBIzyrj-PJ3Vq2rscPzG_aRkwe_f6eJZFF4Mgxo6CGUQ/viewform?usp=publish-editor";

const roles = [
  { number: "01", title: "Участник", detail: "Присоединиться к миру КЦТхак", href: "https://t.me/kcthack", action: "Открыть Telegram" },
  { number: "02", title: "Партнёр", detail: "Стать нашим партнёром", href: PARTNER_APPLICATION_URL, action: "Подать заявку" },
];

export const RoleSelectPage = () => (
  <main className="role-select-page">
    <header className="role-select-page__header">
      <a className="role-select-brand" href="/" aria-label="KTSThub — на главную">KTST<span>hub</span></a>
      <a className="role-select-back" href="/">На главную <span aria-hidden="true">↗</span></a>
    </header>
    <section className="role-select-page__inner">
      <p className="role-select-eyebrow">KTSTHUB · СООБЩЕСТВО</p>
      <h1 className="role-select-page__title">Выберите свою роль</h1>
      <p className="role-select-intro">Начните с того, как вы хотите участвовать в жизни КЦТхак.</p>
      <div className="role-select-page__grid">
        {roles.map((role) => (
          <article key={role.number} className="role-card">
            <span className="role-card__index">{role.number}</span>
            <div className="role-card__copy"><h2>{role.title}</h2><p>{role.detail}</p></div>
            <a className="role-card__action" href={role.href} target={role.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {role.action}<span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  </main>
);
