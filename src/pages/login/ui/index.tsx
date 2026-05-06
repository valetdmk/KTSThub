import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../app/store/hooks";
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
    if (!token || !user) {
      return;
    }

    const platformUser = mapBackendUserToPlatformUser(user) as PlatformUserData;

    localStorage.setItem("platformUser", JSON.stringify(platformUser));
    navigate("/platform", { state: platformUser });
  }, [navigate, token, user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authActions.loginRequest(formData));
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

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="code-input"
          required
        />

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Loading..." : <>Sign in <span>→</span></>}
        </button>

        <img className="unionBottom" src={UnionBottom} alt="" />
      </form>
    </div>
  );
}
