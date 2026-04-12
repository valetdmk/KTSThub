import { useNavigate } from "react-router-dom";
import "./index.scss";

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="vertical-lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="horizontal-lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="auth-circle-small-1"></div>
      <div className="auth-circle-small-2"></div>
      <div className="auth-circle"></div>
      <div className="auth-buttons">
        <button 
          className="auth-button register-btn"
          onClick={() => navigate("/register")}
        >
          Регистрация
        </button>
        <button 
          className="auth-button login-btn"
          onClick={() => navigate("/login")}
        >
          Вход
        </button>
      </div>
    </div>
  );
};