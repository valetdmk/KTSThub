import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import logo from "../../../shared/assets/logo.png";
import UnionTop from "../../../shared/assets/UnionTop.png";
import UnionBottom from "../../../shared/assets/UnionBottom.png";
import Boy from "../../../shared/assets/Boy.png";
import Girl from "../../../shared/assets/Girl.png";
import loginnregistr from "../../../shared/assets/loginnregistr.png";

export type PlatformUserData = {
  lastName: string;
  firstName: string;
  avatar: string;
  username: string;
  email: string;
  code: string;
  birthday?: string;
  age?: string;
  gender?: string;
  phone?: string;
  social?: string;
  description?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PlatformUserData>({
    lastName: "",
    firstName: "",
    avatar: "",
    username: "",
    email: "",
    code: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const savedPlatformUser = localStorage.getItem("platformUser");
    let parsedPlatformUser: Partial<PlatformUserData> = {};

    if (savedPlatformUser) {
      try {
        parsedPlatformUser = JSON.parse(savedPlatformUser) as Partial<PlatformUserData>;
      } catch {
        parsedPlatformUser = {};
      }
    }

    const platformUser = {
      ...parsedPlatformUser,
      ...formData,
      firstName: parsedPlatformUser.firstName || formData.username,
      lastName: parsedPlatformUser.lastName || formData.lastName,
      avatar: parsedPlatformUser.avatar || formData.avatar,
    };

    localStorage.setItem("platformUser", JSON.stringify(platformUser));
    navigate("/platform", { state: platformUser });
  };

  return (
    <div className="login-page">
      <img className="loginnregistr" src={loginnregistr} alt="" />
      <img className="boy" src={Boy} alt="" />
      <img className="girl" src={Girl} alt="" />

      <form className="login-form-container" onSubmit={handleSubmit}>
        <img className="unionTop" src={UnionTop} alt="" />
        <img className="logoLogin" src={logo} alt="KTSThub" />
        <h2>Welcome back<br />to platform</h2>

        <div className="input-group">
          <button type="button" className="social-login-btn google-login" aria-label="Войти через Google">
            G
          </button>
          <button type="button" className="social-login-btn vk-login" aria-label="Войти через VK ID">
            VK
          </button>
          <button type="button" className="social-login-btn yandex-login" aria-label="Войти через Яндекс ID">
            Я
          </button>
        </div>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        <div className="email-section">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          <div className="email-row">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
            />
            <button type="button" className="get-code-btn">Получить код</button>
          </div>
        </div>

        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          placeholder="Код"
          className="code-input"
          required
        />

        <button type="submit" className="signup-btn">
          Sign up <span>→</span>
        </button>

        <img className="unionBottom" src={UnionBottom} alt="" />
      </form>
    </div>
  );
}
