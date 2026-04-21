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

const roleOptions = [
  { id: "frontend", label: "Frontend-разработчик" },
  { id: "backend", label: "Backend-разработчик" },
  { id: "uxui", label: "UX/UI-разработчик" },
  { id: "project_manager", label: "Project Manager" },
  { id: "gamedev", label: "Gamedev" },
];

const statusOptions = [
  { id: "beginner", label: "Начинающий" },
  { id: "middle", label: "Средний" },
  { id: "advanced", label: "Продвинутый" },
];

export default function Register() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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

  const getGenderLabel = (gender: string | null) => {
    if (gender === 'male') return "М";
    if (gender === 'female') return "Ж";
    return "";
  };

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    birthday: "",
    phone: "",
    email: "",
    password: ""
  });

  const [step2Data, setStep2Data] = useState({
    role: "",
    status: "",
    hardSkills: false,
    softSkills: false,
    description: "",
    hardSkillsList: "",
    softSkillsList: ""
  });

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
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

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      formData.surname.trim() !== "" &&
      formData.name.trim() !== "" &&
      formData.birthday !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      selectedGender !== null
    );
  };

  const isStep2Valid = () => {
    return (
      step2Data.role !== "" &&
      step2Data.status !== "" &&
      step2Data.description.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleStep2Submit = () => {
    if (!isStep2Valid()) return;
    setCurrentStep(3);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} placeholder="Surname" />
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
      </div>

      <div className="birthday-section">
        <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} placeholder="Дата рождения" className="birthday-input" />
      </div>
      
      <div className="phone-gender-row">
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Номер телефона" className="phone-input" />
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

      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email address" />

      <div className="password-wrapper">
        <input 
          type={showPassword ? "text" : "password"} 
          name="password"
          value={formData.password} 
          onChange={handleInputChange}
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

      <button 
        type="submit" 
        className={`signup-btn ${!isFormValid() ? 'disabled' : ''}`}
        disabled={!isFormValid() || isLoading}
      >
        {isLoading ? (
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
          className={`custom-dropdown ${isRoleDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
        >
          <div className="dropdown-selected">
            {step2Data.role 
              ? roleOptions.find(r => r.id === step2Data.role)?.label 
              : "Выберите роль"}
          </div>
          <div className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L1 3h10z"/>
            </svg>
          </div>
          {isRoleDropdownOpen && (
            <div className="dropdown-options">
              {roleOptions.map(option => (
                <div 
                  key={option.id}
                  className={`dropdown-option ${step2Data.role === option.id ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep2Data(prev => ({ ...prev, role: option.id }));
                    setIsRoleDropdownOpen(false);
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
        <label>Статус: </label>
        <div 
          className={`custom-dropdown status-dropdown ${isStatusDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
        >
          <div className="dropdown-selected">
            {step2Data.status 
              ? statusOptions.find(s => s.id === step2Data.status)?.label 
              : "Выберите статус"}
          </div>
          <div className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L1 3h10z"/>
            </svg>
          </div>
          {isStatusDropdownOpen && (
            <div className="dropdown-options">
              {statusOptions.map(option => (
                <div 
                  key={option.id}
                  className={`dropdown-option ${step2Data.status === option.id ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep2Data(prev => ({ ...prev, status: option.id }));
                    setIsStatusDropdownOpen(false);
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
        disabled={!isStep2Valid() || isLoading}
        onClick={handleStep2Submit}
      >
        {isLoading ? (
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
        <div className="user-name-display">
          {formData.surname && <p className="surname-display">{formData.surname}</p>}
          {formData.name && <p className="name-display">{formData.name}</p>}
        </div>

        {formData.birthday && (
          <div className="birthday-section">
            <span className="age-display">{calculateAge(formData.birthday)} лет</span>
          </div>
        )}

        {selectedGender && (
          <div className="gender-selector">
            <span className="gender-display">{getGenderLabel(selectedGender)}</span>
          </div>
        )}

        <div className="avatar-section">
          <div className="avatar-placeholder">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        {step2Data.role && (
          <div className="role-section">
            <span className="role-display">{roleOptions.find(r => r.id === step2Data.role)?.label}</span>
          </div>
        )}

        {step2Data.status && (
          <div className="status-section">
            <span className="status-display">{statusOptions.find(s => s.id === step2Data.status)?.label}</span>
          </div>
        )}

        {step2Data.description && (
          <div className="description-section">
            <p className="description-display">{step2Data.description}</p>
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className="signup-btn"
        onClick={handleSubmit}
      >
        {isLoading ? (
          <span className="loading-text">Загрузка...</span>
        ) : (
          <>Завершить <span>→</span></>
        )}
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
            <div className="logo-block"></div>
            {currentStep === 3 ? renderStep3() : isSuccess ? renderStep2() : (
              <>
                <img className="logoLogin" src={logo} alt="Логотип KTSThub" />
                <h2>Welcome to platform</h2>
                {renderForm()}
              </>
            )}
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