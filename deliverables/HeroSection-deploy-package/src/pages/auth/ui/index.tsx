import { useNavigate } from "react-router-dom";
import "./index.scss";

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <main className="auth-page">
      <a className="account-wordmark" href="/">KTST<span>hub</span></a>
      <section className="auth-choice">
        <p className="auth-eyebrow">KTSTHUB · СООБЩЕСТВО</p>
        <h1>Начните свой путь в IT</h1>
        <p>Создайте аккаунт или войдите, чтобы участвовать в событиях, находить команду и собирать портфолио.</p>
        <div className="auth-buttons">
          <button className="auth-button register-btn" onClick={() => navigate("/register")}>Регистрация</button>
          <button className="auth-button login-btn" onClick={() => navigate("/login")}>Вход</button>
        </div>
      </section>
    </main>
  );
};
