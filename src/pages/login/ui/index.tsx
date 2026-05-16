import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions as authActions, AuthFeature } from "../../../features/auth";
import { mapBackendUserToPlatformUser } from "../../../shared/lib/userProfile";
import "./index.scss";
import logo from "../../../shared/assets/logo.png";
import UnionTop from "../../../shared/assets/UnionTop.png";
import UnionBottom from "../../../shared/assets/UnionBottom.png";
import Boy from "../../../shared/assets/Boy.png";
import Girl from "../../../shared/assets/Girl.png";
import loginnregistr from "../../../shared/assets/loginnregistr.png";
import BackLogin from "../../../shared/assets/BackLogin.png";

export type PlatformUserData = {
  lastName: string;
  firstName: string;
  avatar: string;
  username: string;
  email: string;
  code?: string;
  birthday?: string;
  age?: string;
  gender?: string;
  phone?: string;
  social?: string;
  description?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user, loading, error } = useSelector(AuthFeature.selectors.root);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    if (user) {
      const platformUser = mapBackendUserToPlatformUser(user) as PlatformUserData;

      localStorage.setItem("platformUser", JSON.stringify(platformUser));
      navigate("/platform", { state: platformUser });
      return;
    }

    navigate("/platform");
  }, [navigate, token, user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authActions.loginRequest(formData));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  return (
    <div className="login-page">
      <img className="BackLogin" src={BackLogin} alt="" />
      <img className="loginnregistr" src={loginnregistr} alt="" />
      <img className="boy" src={Boy} alt="" />
      <img className="girl" src={Girl} alt="" />

      <form className="login-form-container" onSubmit={handleSubmit}>
        <img className="unionTop" src={UnionTop} alt="" />
        <img className="logoLogin" src={logo} alt="KTSThub" />
        <h2>Welcome back<br />to platform</h2>

        {error ? <div className="error-message">{error}</div> : null}

        <div className="email-section">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
        </div>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="code-input password-input"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Loading..." : <>Sign in <span>→</span></>}
        </button>

        <img className="unionBottom" src={UnionBottom} alt="" />
      </form>
    </div>
  );
}
