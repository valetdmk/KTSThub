import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { registerRequest, updateProfileRequest, setStep } from "../../../features/register";
import "./index.scss";
import Backregister from "../../../shared/assets/Backregister.png"
import boyregistration from "../../../shared/assets/boyregistration.png"
import loginnregistr from "../../../shared/assets/loginnregistr.png"
import logo from "../../../shared/assets/logo.png"
import renderstep3Girl from "../../../shared/assets/renderstep3Girl.png"
import UnionTop from "../../../shared/assets/UnionTop.png"
import UnionBottom from "../../../shared/assets/UnionBottom.png"
import Axolotl from "../../../shared/assets/Axolotl.png"
import BlackCat from "../../../shared/assets/BlackCat.png"
import RainbowPic from "../../../shared/assets/RainbowPic.png"

const roles = [
  { id: "student", number: "01", label: "STUDENT" },
  { id: "business_partner", number: "02", label: "BUSINESS PARTNER" },
  { id: "judge", number: "03", label: "JUDGE" },
  { id: "organizer", number: "04", label: "ORGANIZER" },
];

const jobOptions = [
  { id: "FRONT", label: "Frontend-разработчик" },
  { id: "BACK", label: "Backend-разработчик" },
  { id: "DESIGNER", label: "UX/UI-разработчик" },
  { id: "PROJECT", label: "Project Manager" },
  { id: "GAME", label: "Gamedev" },
];

const levelOptions = [
  { id: "BEGINNER", label: "Начинающий" },
  { id: "INTERMEDIATE", label: "Средний" },
  { id: "ADVANCED", label: "Продвинутый" },
];

export default function Register() {
  const dispatch = useAppDispatch();
   const { token, userId, loading, error, step } = useAppSelector(state => state.register);
   const [selectedRole, setSelectedRole] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState(false);
   const [localError, setLocalError] = useState<string | null>(null);
   const [step3Page, setStep3Page] = useState(1);

  const calculateAge = (birthday: string) => {
    if (!birthday) return "";
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    birthday: "",
    phone: "",
    email: "",
    password: ""
  });

  const [step2Data, setStep2Data] = useState({
    job: "",
    level: "",
    hardSkills: false,
    softSkills: false,
    description: "",
    hardSkillsList: "",
    softSkillsList: "",
    telegram: ""
  });

  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [skillsModal, setSkillsModal] = useState<"hardSkills" | "softSkills" | null>(null);
  const [enteredSkills, setEnteredSkills] = useState("");

  const recommendedHardSkills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", 
    "Unity", "Unreal Engine", "Figma", "SQL", "Git"
  ];

  const recommendedSoftSkills = [
    "Коммуникабельность", "Работа в команде", "Тайм-менеджмент", 
    "Креативность", "Адаптивность", "Лидерство"
  ];

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStep2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep2Data(prev => ({ ...prev, [name]: value }));
  };

  const openSkillsModal = (type: "hardSkills" | "softSkills") => {
    setSkillsModal(type);
  };

  const closeSkillsModal = () => {
    if (skillsModal === 'hardSkills') {
      setStep2Data(prev => ({ ...prev, hardSkills: true, hardSkillsList: enteredSkills }));
    } else if (skillsModal === 'softSkills') {
      setStep2Data(prev => ({ ...prev, softSkills: true, softSkillsList: enteredSkills }));
    }
    setSkillsModal(null);
    setEnteredSkills("");
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      formData.lastname.trim().length >= 2 &&
      formData.username.trim() !== "" &&
      formData.birthday !== "" &&
      formData.email.trim() !== "" &&
      formData.password.length >= 8
    );
  };

  const isStep2Valid = () => {
    return (
      step2Data.job !== "" &&
      step2Data.level !== ""
    );
  };

   const handleSignup = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!isFormValid()) return;

     setLocalError(null);

     dispatch(registerRequest({
       name: formData.name,
       lastname: formData.lastname,
       username: formData.username,
       birthday: formData.birthday,
       email: formData.email,
       password: formData.password
     }));

     dispatch(setStep(2));
   };

   const handleStep2Submit = () => {
     if (!isStep2Valid()) return;

     dispatch(setStep(3));

     if (!token) return;
     
     const skillsArray: { skillId: number; level: number }[] = [];
     
     if (step2Data.hardSkillsList) {
       const hardSkillsItems = step2Data.hardSkillsList.split(",").map(s => s.trim()).filter(Boolean);
       hardSkillsItems.forEach((_, index) => {
         skillsArray.push({ skillId: index + 1, level: 5 });
       });
     }

     dispatch(updateProfileRequest({
       token,
       userId: userId || 1,
       data: {
         name: formData.name,
         lastName: formData.lastname,
         username: formData.username,
         birthday: formData.birthday,
         email: formData.email,
         phone: formData.phone || null,
         telegram: step2Data.telegram || null,
         job: step2Data.job,
         level: step2Data.level,
         skills: skillsArray
       }
     }));
   };

  const renderForm = () => (
    <form onSubmit={handleSignup}>
      {(error || localError) && <div className="error-message">{error || localError}</div>}
      <div className="input-group">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder="Name" 
        />
        <input 
          type="text" 
          name="lastname" 
          value={formData.lastname} 
          onChange={handleInputChange} 
          placeholder="Surname" 
        />
      </div>

      <div className="input-group">
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleInputChange} 
          placeholder="Username" 
        />
      </div>

      <div className="birthday-section">
        <input 
          type="date" 
          name="birthday" 
          value={formData.birthday} 
          onChange={handleInputChange} 
          placeholder="Дата рождения" 
          className="birthday-input" 
        />
      </div>
      
      <div className="phone-gender-row">
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          placeholder="Номер телефона" 
          className="phone-input" 
        />
      </div>

      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleInputChange} 
        placeholder="Email address" 
      />

      <div className="password-wrapper">
        <input 
          type={showPassword ? "text" : "password"} 
          name="password"
          value={formData.password} 
          onChange={handleInputChange}
          placeholder="Password (min 8 characters)" 
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

      <button 
        type="submit" 
        className={`signup-btn ${!isFormValid() ? 'disabled' : ''}`}
        disabled={!isFormValid() || loading}
      >
        {loading ? (
          <span className="loading-text">Загрузка...</span>
        ) : (
          <>Продолжить <span>→</span></>
        )}
      </button>
    </form>
  );

  const renderStep2 = () => (
    <div className="step2-form">
      <div className="avatar-section">
        <div className="avatar-placeholder">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>

      <div className="role-section">
        <div 
          className={`custom-dropdown ${isJobDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
        >
          <div className="dropdown-selected">
            {step2Data.job 
              ? jobOptions.find(r => r.id === step2Data.job)?.label 
              : "Выберите направление (job)"}
          </div>
          <div className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L1 3h10z"/>
            </svg>
          </div>
          {isJobDropdownOpen && (
            <div className="dropdown-options">
              {jobOptions.map(option => (
                <div 
                  key={option.id}
                  className={`dropdown-option ${step2Data.job === option.id ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep2Data(prev => ({ ...prev, job: option.id }));
                    setIsJobDropdownOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="status-section">
        <label>Уровень: </label>
        <div 
          className={`custom-dropdown status-dropdown ${isLevelDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
        >
          <div className="dropdown-selected">
            {step2Data.level 
              ? levelOptions.find(s => s.id === step2Data.level)?.label 
              : "Выберите уровень (level)"}
          </div>
          <div className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L1 3h10z"/>
            </svg>
          </div>
          {isLevelDropdownOpen && (
            <div className="dropdown-options">
              {levelOptions.map(option => (
                <div 
                  key={option.id}
                  className={`dropdown-option ${step2Data.level === option.id ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep2Data(prev => ({ ...prev, level: option.id }));
                    setIsLevelDropdownOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="skills-section">
        <button 
          type="button"
          className={`skill-btn hard-skills ${step2Data.hardSkills ? 'active' : ''}`}
          onClick={() => openSkillsModal('hardSkills')}
        >
          <span className="skill-label">Hard-skills</span>
          <span className="skill-value">{step2Data.hardSkillsList || "Выбрать"}</span>
        </button>
        <button 
          type="button"
          className={`skill-btn soft-skills ${step2Data.softSkills ? 'active' : ''}`}
          onClick={() => openSkillsModal('softSkills')}
        >
          <span className="skill-label">Soft-skills</span>
          <span className="skill-value">{step2Data.softSkillsList || "Выбрать"}</span>
        </button>
      </div>

      {skillsModal && (
        <div className="skills-modal-overlay" onClick={closeSkillsModal}>
          <div className="skills-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeSkillsModal}>×</button>
            <h3>
              {skillsModal === 'hardSkills' 
                ? 'Какими Hard-skills владеете?' 
                : 'Какими Soft-skills владеете?'}
            </h3>
            <textarea
              value={enteredSkills}
              onChange={(e) => setEnteredSkills(e.target.value)}
              placeholder={skillsModal === 'hardSkills' 
                ? 'Введите ваши Hard-skills...' 
                : 'Введите ваши Soft-skills...'}
              className="skills-textarea"
            />
            <div className="recommended-skills">
              <p>Рекомендованные навыки</p>
              <div className="recommended-skills-list">
                {(skillsModal === 'hardSkills' ? recommendedHardSkills : recommendedSoftSkills).map(skill => (
                  <button 
                    key={skill}
                    className="recommended-skill-btn"
                    onClick={() => setEnteredSkills(prev => prev ? `${prev}, ${skill}` : skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <button className="modal-save-btn" onClick={closeSkillsModal}>
              Сохранить
            </button>
          </div>
        </div>
      )}

      <div className="social-networks">
        <input 
          type="text" 
          name="telegram" 
          value={step2Data.telegram} 
          onChange={handleStep2InputChange} 
          placeholder="Telegram (https://t.me/username)" 
          className="social-input"
        />
      </div>

      <div className="description-section">
        <textarea
          value={step2Data.description}
          onChange={(e) => {
            if (e.target.value.length <= 250) {
              setStep2Data(prev => ({ ...prev, description: e.target.value }));
            }
          }}
          placeholder="Добавить описание..."
          className="description-input"
          maxLength={250}
        />
        <span className="char-count">{step2Data.description.length}/250</span>
      </div>
      <button 
        type="button" 
        className={`signup-btn ${!isStep2Valid() ? 'disabled' : ''}`}
        disabled={!isStep2Valid() || loading}
        onClick={handleStep2Submit}
      >
        {loading ? (
          <span className="loading-text">Загрузка...</span>
        ) : (
          <>Продолжить <span>→</span></>
        )}
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="step3-form">
      <div className="user-info-section">
        <div className="step3-left-column">
          <div className="avatar-section">
            <div className="avatar-placeholder">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <div className="user-name-display">
            {formData.lastname && <p className="surname-display">{formData.lastname}</p>}
            {formData.name && <p className="name-display">{formData.name}</p>}
          </div>

          <div className="birthday-section">
            {formData.birthday && <span className="age-display">{calculateAge(formData.birthday)} лет</span>}
          </div>

          <div className="phone-preview">
            <span className="phone-label">Телефон:</span>
            <span className="phone-value">{formData.phone || "Не указан"}</span>
          </div>

          <div className="telegram-preview">
            <span className="telegram-label">Telegram:</span>
            <span className="telegram-value">{step2Data.telegram || "Не указан"}</span>
          </div>

          <div className="skills-preview">
            {step2Data.hardSkillsList && (
              <div className="skills-list">
                <span className="skills-label">Hard-skills:</span>
                <span className="skills-value">{step2Data.hardSkillsList}</span>
              </div>
            )}
            {step2Data.softSkillsList && (
              <div className="skills-list">
                <span className="skills-label">Soft-skills:</span>
                <span className="skills-value">{step2Data.softSkillsList}</span>
              </div>
            )}
          </div>
        </div>

        <div className="step3-right-column">
          <img className="renderstep3-girl" src={renderstep3Girl} alt="" />

          <div className="role-section">
            <span className="role-display">{jobOptions.find(r => r.id === step2Data.job)?.label}</span>
          </div>

          <div className="status-section">
            <span className="status-display">{levelOptions.find(s => s.id === step2Data.level)?.label}</span>
          </div>

          <div className="description-section">
            <p className="description-display">{step2Data.description || "Описание не добавлено"}</p>
          </div>
        </div>
      </div>

      <button 
        type="button" 
        className="signup-btn"
        onClick={() => window.location.href = "/login"}
      >
        Завершить регистрацию
      </button>
    </div>
  );

  return (
    <div className={`register-role-page ${selectedRole ? 'role-selected' : ''}`}>
      {selectedRole ? (
        <>
          <img className="loginnregistr" src={loginnregistr} alt="" />
          <img className="boyforma" src={boyregistration} alt="" />
          <div className="register-form-container">
            <img className="unionTop" src={UnionTop} alt="" />
            <div className="logo-block"></div>
            {step === 3 ? renderStep3() : step === 2 ? renderStep2() : (
              <>
                <img className="logoLogin" src={logo} alt="Логотип KTSThub" />
                <h2>Welcome to platform</h2>
                {renderForm()}
              </>
            )}
            <img className="unionBottom" src={UnionBottom} alt="" />
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
