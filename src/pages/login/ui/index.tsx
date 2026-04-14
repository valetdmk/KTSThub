import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../../shared/assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      <div className="login-form-container">
        <img className="logoLogin" src={logo} alt="Логотип KTSThub" />
        <h2>Welcome back<br />to platform</h2>
        <form>
          <input type="text" placeholder="Имя пользователя" />
          <input type="password" placeholder="Пароль" />
          <button type="submit">Войти</button>
        </form>
        <p className="login-link">
          Нет аккаунта? <span onClick={() => navigate("/register")}>Зарегистрироваться</span>
        </p>
      </div>
    </div>
  );
}