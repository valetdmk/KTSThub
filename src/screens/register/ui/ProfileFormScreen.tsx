import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { updateProfileRequest } from "../../../features/register";

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

export function ProfileFormScreen() {
  const dispatch = useAppDispatch();
  const { token, userId } = useAppSelector(state => state.register);
  const [step2Data, setStep2Data] = useState({
    job: "",
    level: "",
    hardSkillsList: "",
    softSkillsList: "",
    telegram: "",
    description: ""
  });
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);

  const isStep2Valid = () => {
    return step2Data.job !== "" && step2Data.level !== "";
  };

  const handleSubmit = () => {
    if (!isStep2Valid() || !token) return;
    dispatch(updateProfileRequest({
      token,
      userId: userId || 1,
      data: {
        job: step2Data.job,
        level: step2Data.level,
        hardSkills: step2Data.hardSkillsList,
        softSkills: step2Data.softSkillsList,
        telegram: step2Data.telegram,
        description: step2Data.description
      }
    }));
  };

  return (
    <div className="step2-form">
      <div className="role-section">
        <div 
          className={`custom-dropdown ${isJobDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
        >
          <div className="dropdown-selected">
            {step2Data.job || "Выберите направление"}
          </div>
          {isJobDropdownOpen && (
            <div className="dropdown-options">
              {jobOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => {
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
        <div 
          className={`custom-dropdown ${isLevelDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
        >
          <div className="dropdown-selected">
            {step2Data.level || "Выберите уровень"}
          </div>
          {isLevelDropdownOpen && (
            <div className="dropdown-options">
              {levelOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => {
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
        <button type="button">Hard-skills: {step2Data.hardSkillsList || "Выбрать"}</button>
        <button type="button">Soft-skills: {step2Data.softSkillsList || "Выбрать"}</button>
      </div>
      <div className="social-networks">
        <input 
          type="text" 
          name="telegram" 
          value={step2Data.telegram} 
          onChange={(e) => setStep2Data(prev => ({ ...prev, telegram: e.target.value }))}
          placeholder="Telegram" 
        />
      </div>
      <div className="description-section">
        <textarea
          value={step2Data.description}
          onChange={(e) => setStep2Data(prev => ({ ...prev, description: e.target.value }))}
          placeholder="О себе..."
          maxLength={250}
        />
      </div>
      <button 
        type="button" 
        className="signup-btn"
        disabled={!isStep2Valid()}
        onClick={handleSubmit}
      >
        Продолжить
      </button>
    </div>
  );
}