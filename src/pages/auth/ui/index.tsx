import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../../shared/assets/logo.png"
import boyregistration from "../../../shared/assets/boyregistration.png"
import Hack from "../../../shared/assets/HacK.png"
import KCT from "../../../shared/assets/KCT.png"
import card from "../../../shared/assets/card.png"
import Authpurple1 from "../../../shared/assets/Authpurple1.png"
import Authpurple2 from "../../../shared/assets/Authpurple2.png"
import Authorange2 from "../../../shared/assets/Authorange2.png"
import AuthNumbers from "../../../shared/assets/AuthNumbers.png"

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <img className="logo" src={logo} alt="Логотип KTSThub" />
      <img className="boyregistration" src={boyregistration} alt="Мальчик" />
      <div className="registration_center">
        <img className="kct" src={KCT} alt="Логотип KCT" />
        <img className="hack" src={Hack} alt="Логотип Хакathon" />

        <p className="text-bottom-left">
          Вы переходите в мир нового уровня погружения в ИТ-сферу разработки
        </p>

        <p className="text-top-right">
          Вы переходите не просто в платформу,
        </p>
      </div>
      <div className="greeting">
        <p>Welcome to<br />platform</p>
        <img className="cardregistration" src={card} alt="Карточка" />
      </div>
      <div className="vertical-lines">
        <span><span className="cross-dot"></span></span>
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
       <div className="ellipse-99"></div>
       <img className="ellipse-overlay Authpurple1" src={Authpurple1} alt="" />
       <img className="ellipse-overlay Authpurple2" src={Authpurple2} alt="" />
       <img className="ellipse-overlay Authorange2" src={Authorange2} alt="" />
       <img className="AuthNumbers" src={AuthNumbers} alt="" />
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