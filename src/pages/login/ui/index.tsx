import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../../shared/assets/logo.png";
import UnionTop from "../../../shared/assets/UnionTop.png"
import UnionBottom from "../../../shared/assets/UnionBottom.png"
import Boy from "../../../shared/assets/Boy.png"
import Girl from "../../../shared/assets/Girl.png"
import loginnregistr from "../../../shared/assets/loginnregistr.png"

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      <img className="loginnregistr" src={loginnregistr} alt="" />
      <img className="boy" src={Boy} alt="" />
      <img className="girl" src={Girl} alt="" />

      <div className="login-form-container">
        <img className="unionTop" src={UnionTop} alt="" />
        {/* <div className="logo-block"></div> */}
        <img className="logoLogin" src={logo} alt="Логотип KTSThub" />
        <h2>Welcome back<br />to platform</h2>
        
        <div className="input-group">
          <input type="text" />
          <input type="password" />
          <input type="text" />
        </div>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        <div className="email-section">
          <input type="text" placeholder="Username" />
          <div className="email-row">
            <input type="email" placeholder="Email address" />
            <button type="button" className="get-code-btn">получить код</button>
          </div>
        </div>

        <input type="text" placeholder="Код" className="code-input" />

        <button type="submit" className="signup-btn">
          Sign up <span>→</span>
        </button>

        <img className="unionBottom" src={UnionBottom} alt="" />
      </div>
    </div>
  );
}