import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../../shared/assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <img 
        className="logo" 
        src={logo} 
        alt="Логотип KTSThub" 
      />
      
      <div className="greeting">
        <p>Welcome back<br />to platform</p>
      </div>

      <div className="login-form-container">
        <h2>Вход в систему</h2>
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