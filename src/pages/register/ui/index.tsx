import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.scss";
import Backregister from "../../../shared/assets/Backregister.png"
import boyregistration from "../../../shared/assets/boyregistration.png"
import loginnregistr from "../../../shared/assets/loginnregistr.png"
import logo from "../../../shared/assets/logo.png"

const roles = [
  { id: "student", number: "01", label: "STUDENT" },
  { id: "business_partner", number: "02", label: "BUSINESS PARTNER" },
  { id: "judge", number: "03", label: "JUDGE" },
  { id: "organizer", number: "04", label: "ORGANIZER" },
];

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <div className={`register-role-page ${selectedRole ? 'role-selected' : ''}`}>
      {selectedRole ? (
        <>
          <img className="loginnregistr" src={loginnregistr} alt="" />
          <img className="boyforma" src={boyregistration} alt="" />
          <div className="register-form-container">
            <div className="logo-block"></div>
            <img className="logoLogin" src={logo} alt="Логотип KTSThub" />
            <h2>Welcome to platform</h2>
            
            <div className="input-group">
              <input type="text" placeholder="Surname" />
              <input type="text" placeholder="Name" />
            </div>

            <div className="birthday-section">
              <input type="date" placeholder="Дата рождения" className="birthday-input" />
            </div>
            
            <div className="phone-gender-row">
              <input type="tel" placeholder="Номер телефона" className="phone-input" />
              <div className="gender-selector">
                <div className="gender-options">
                  <button 
                    type="button"
                    className={`gender-btn ${selectedGender === 'male' ? 'active' : ''}`}
                    onClick={() => handleGenderSelect('male')}
                  >
                    М
                  </button>
                  <button 
                    type="button"
                    className={`gender-btn ${selectedGender === 'female' ? 'active' : ''}`}
                    onClick={() => handleGenderSelect('female')}
                  >
                    Ж
                  </button>
                </div>
              </div>
            </div>

            <input type="email" placeholder="Email address" />

            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="password-input" 
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

            <button type="submit" className="signup-btn">
              Продолжить <span>→</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="register-title">Выберите вашу роль</h1>
          <div className="roles-grid">
            {roles.map((role) => (
              <div 
                key={role.id} 
                className={`role-card ${role.id === 'business_partner' || role.id === 'organizer' ? 'offset-down' : ''} ${role.id === 'student' || role.id === 'judge' ? 'offset-up' : ''}`}
              >
                  <div className={`boyregistration-wrapper ${role.id === 'business_partner' || role.id === 'judge' ? 'mirrored' : ''}`}>
                    <img className="boyregistration" src={boyregistration} alt="" />
                  </div>
                  {role.id === 'business_partner' || role.id === 'organizer' ? (
                    <div className="role-bottom-right bottom-right">
                      <span className="role-number">{role.number}</span>
                      <span className="role-label-wrapper">
                        <span className="role-label">{role.label}</span>
                      </span>
                    </div>
                  ) : role.id === 'student' || role.id === 'judge' ? (
                    <div className="role-top-right top-right">
                      <span className="role-number">{role.number}</span>
                      <span className="role-label-wrapper">
                        <span className="role-label">{role.label}</span>
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="role-number">{role.number}</span>
                      <span className="role-label-wrapper">
                        <span className="role-label">{role.label}</span>
                      </span>
                    </>
                  )}
                  <button 
                  className={`select-btn ${role.id === 'student' || role.id === 'judge' ? 'bottom-right' : ''} ${role.id === 'business_partner' || role.id === 'organizer' ? 'top-right' : ''}`}
                  onClick={() => handleSelect(role.id)}
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
          <img className="backregister" src={Backregister} alt="" />
        </>
      )}
    </div>
  );
}