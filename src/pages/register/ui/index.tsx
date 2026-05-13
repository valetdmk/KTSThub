import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest, selectors, updateProfileRequest } from "../../../features/register";
import "./index.scss";
import registerBack from "../../../shared/assets/registerBack.png"
import registerLines from "../../../shared/assets/registerLines.png"
import boyregistration from "../../../shared/assets/boyregistration.png"
import loginnregistr from "../../../shared/assets/loginnregistr.png"
import BackLogin from "../../../shared/assets/BackLogin.png"
import logo from "../../../shared/assets/logo.png"
import renderstep3Girl from "../../../shared/assets/renderstep3Girl.png"
import UnionTop from "../../../shared/assets/UnionTop.png"
import UnionBottom from "../../../shared/assets/UnionBottom.png"
import authStar from "../../../shared/assets/authStar.png"
import badge from "../../../shared/assets/badge.png"
import Axolotl from "../../../shared/assets/Axolotl.png"
import BlackCat from "../../../shared/assets/BlackCat.png"
import RainbowPic from "../../../shared/assets/RainbowPic.png"
import Boy from "../../../shared/assets/Boy.png"
import Girl from "../../../shared/assets/Girl.png"
import panda from "../../../shared/assets/panda.png"
import unicorn from "../../../shared/assets/unicorn.png"
import brain from "../../../shared/assets/brain.png"
import joystick from "../../../shared/assets/joystick.png"
import game from "../../../shared/assets/game.png"

const calendarWeekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const calendarMonthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const currentYear = new Date().getFullYear();
const calendarYearOptions = Array.from({ length: currentYear - 1899 }, (_, index) => currentYear - index);

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

type JobOptionId = (typeof jobOptions)[number]["id"];

const levelOptions = [
  { id: "BEGINNER", label: "Начинающий" },
  { id: "INTERMEDIATE", label: "Средний" },
  { id: "ADVANCED", label: "Продвинутый" },
];

const avatarOptions = [
  { id: "axolotl", label: "Axolotl", src: Axolotl },
  { id: "cat", label: "Black Cat", src: BlackCat },
  { id: "rainbow", label: "Rainbow", src: RainbowPic },
  { id: "boy", label: "Boy", src: Boy },
  { id: "girl", label: "Girl", src: Girl },
  { id: "panda", label: "Panda", src: panda },
  { id: "unicorn", label: "Unicorn", src: unicorn },
  { id: "brain", label: "Brain", src: brain },
  { id: "joystick", label: "Joystick", src: joystick },
  { id: "game", label: "Game", src: game },
];

const skillRatingOptions = [
  { id: "advanced", label: "Продвинутый уровень", color: "#93F890" },
  { id: "medium", label: "Средний уровень", color: "#FFE47A" },
  { id: "basic", label: "Базовый уровень", color: "#FD864B" },
];

const sharedProgrammingLanguages = [
  "Java", "Python", "JavaScript", "TypeScript", "C#", "C++", "Go", "PHP", "Kotlin", "Swift", "GDScript", "Bash"
];

const sharedDatabaseSkills = [
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "ClickHouse"
];

const sharedToolSkills = [
  "Git", "Figma", "Postman", "VS Code", "Linux terminal"
];

const hardSkillsByJob: Record<JobOptionId, string[]> = {
  FRONT: [
    "HTML", "CSS", "SCSS/SASS", "React", "Vue.js", "Next.js", "Svelte", "Tailwind CSS", "Webpack", "Vite"
  ],
  BACK: [
    "Spring Boot", "Django", "FastAPI", "Express.js", "Node.js", "REST API", "GraphQL", "Kafka", "gRPC",
    "Docker", "Kubernetes", "Nginx", "Apache", "CI/CD", "GitLab", "GitHub Actions", "Ansible",
    "Prometheus", "Grafana", "Linux", "Windows Server", "VPN", "DNS", "TCP/IP"
  ],
  DESIGNER: [
    "Adobe Photoshop", "Adobe Illustrator", "Blender", "Tilda", "Motion-дизайн", "UI-дизайн", "UX-дизайн",
    "Прототипирование", "Дизайн-системы", "Типографика", "Брендинг"
  ],
  PROJECT: [
    "Agile", "Scrum", "Kanban", "Waterfall", "OKR", "Jira", "Notion", "Redmine", "Confluence", "Miro", "Excel/Google Sheets"
  ],
  GAME: [
    "Unity", "Unreal Engine", "Godot", "Шейдеры", "Физика в играх", "Левел-дизайн", "3D-моделирование", "Анимация", "Геймдизайн"
  ]
};

type SkillModalType = "hardSkills" | "softSkills";
type SkillRatingId = (typeof skillRatingOptions)[number]["id"];
type SkillRatingsState = Record<SkillModalType, Record<string, SkillRatingId>>;

export default function Register() {
  const dispatch = useDispatch();
   const { token, userId, loading, error, step } = useSelector(selectors.root);
   const [selectedRole, setSelectedRole] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState(false);
   const [localError, setLocalError] = useState<string | null>(null);
   const [step3Page, setStep3Page] = useState<1 | 2>(1);
   const [pendingProgressStep, setPendingProgressStep] = useState<number | null>(null);

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
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isBirthdayCalendarOpen, setIsBirthdayCalendarOpen] = useState(false);
  const [birthdayInputValue, setBirthdayInputValue] = useState("");
  const [skillsModal, setSkillsModal] = useState<SkillModalType | null>(null);
  const [enteredSkills, setEnteredSkills] = useState("");
const [selectedSkillRatingId, setSelectedSkillRatingId] = useState<SkillRatingId | null>(null);
  const [activeRatedSkill, setActiveRatedSkill] = useState<string | null>(null);
  const [skillRatings, setSkillRatings] = useState<SkillRatingsState>({
    hardSkills: {},
    softSkills: {}
  });
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [birthdayViewDate, setBirthdayViewDate] = useState(() => new Date());
  const jobDropdownRef = useRef<HTMLDivElement | null>(null);
  const levelDropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarPickerRef = useRef<HTMLDivElement | null>(null);
  const birthdayCalendarRef = useRef<HTMLDivElement | null>(null);

  const recommendedHardSkills = Array.from(
    new Set([
      ...sharedProgrammingLanguages,
      ...sharedDatabaseSkills,
      ...sharedToolSkills,
      ...(step2Data.job ? hardSkillsByJob[step2Data.job as JobOptionId] ?? [] : [])
    ])
  );

  const recommendedSoftSkills = [
    "Работа в команде", "Коммуникация", "Управление конфликтами", "Наставничество", "Помощь коллегам", "Лидерство",
    "Тайм-менеджмент", "Работа в условиях дедлайна", "Расстановка приоритетов", "Ответственность", "Самостоятельность",
    "Критическое мышление", "Аналитическое мышление", "Системное мышление", "Решение проблем", "Креативность",
    "Обучаемость", "Адаптивность", "Инициативность", "Стрессоустойчивость", "Публичные выступления", "Работа с обратной связью"
  ];

  const handleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep3Page(1);
    setPendingProgressStep(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatBirthdayDisplay = (value: string) => {
    if (!value) {
      return "Дата рождения";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
      return value;
    }

    return `${day}.${month}.${year}`;
  };

  const parseBirthdayInput = (value: string) => {
    const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (!match) {
      return null;
    }

    const [, day, month, year] = match;
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.getFullYear() !== Number(year) ||
      parsedDate.getMonth() !== Number(month) - 1 ||
      parsedDate.getDate() !== Number(day)
    ) {
      return null;
    }

    return `${year}-${month}-${day}`;
  };

  const normalizeBirthdayInput = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const parts = [];

    if (digits.length > 0) {
      parts.push(digits.slice(0, 2));
    }

    if (digits.length > 2) {
      parts.push(digits.slice(2, 4));
    }

    if (digits.length > 4) {
      parts.push(digits.slice(4, 8));
    }

    return parts.join(".");
  };

  const getPhoneValidationMessage = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      return null;
    }

    const normalizedValue = trimmedValue.replace(/[\s()-]/g, "");
    const isRussianPhone = /^(\+7|8)\d{10}$/.test(normalizedValue);
    const isInternationalPhone = /^\+\d{10,15}$/.test(normalizedValue);

    if (isRussianPhone || isInternationalPhone) {
      return null;
    }

    return "Введите корректный номер телефона.";
  };

  const getEmailValidationMessage = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      return null;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);

    if (isValidEmail) {
      return null;
    }

    return "Введите корректный email.";
  };

  const getTelegramValidationMessage = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      return null;
    }

    const isTelegramUsername = /^@[a-zA-Z0-9_]{5,32}$/.test(trimmedValue);
    const isTelegramUrl = /^https?:\/\/(www\.)?t\.me\/[a-zA-Z0-9_]{5,32}\/?$/.test(trimmedValue);

    if (isTelegramUsername || isTelegramUrl) {
      return null;
    }

    return "Введите корректный Telegram: @username или https://t.me/username";
  };

  const normalizeTelegramValue = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "";
    }

    if (trimmedValue.startsWith("@")) {
      return `https://t.me/${trimmedValue.slice(1)}`;
    }

    return trimmedValue.replace(/\/$/, "");
  };

  const getCalendarDays = (viewDate: Date) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekDay = (firstDayOfMonth.getDay() + 6) % 7;

    return Array.from({ length: firstWeekDay + daysInMonth }, (_, index) => {
      if (index < firstWeekDay) {
        return null;
      }

      return new Date(year, month, index - firstWeekDay + 1);
    });
  };

  const handleStep2InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep2Data(prev => ({ ...prev, [name]: value }));
  };

  const normalizeSkillsList = (value: string) => {
    const uniqueSkills = new Map<string, string>();

    value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .forEach((skill) => {
        const normalizedKey = skill.toLowerCase();

        if (!uniqueSkills.has(normalizedKey)) {
          uniqueSkills.set(normalizedKey, skill);
        }
      });

    return Array.from(uniqueSkills.values()).join(", ");
  };

  const getSkillsArray = (value: string) => (
    normalizeSkillsList(value)
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
  );

  const getProfileSkillPayload = () => {
    const skillNames = [
      ...getSkillsArray(step2Data.hardSkillsList),
      ...getSkillsArray(step2Data.softSkillsList),
    ];

    const skillLevelsByName = skillNames.reduce<Record<string, number>>((accumulator, skillName) => {
      const normalizedName = skillName.toLowerCase();
      const ratingId = skillRatings.hardSkills[normalizedName] ?? skillRatings.softSkills[normalizedName];

      accumulator[normalizedName] = ratingId === "advanced"
        ? 7
        : ratingId === "medium"
          ? 4
          : 1;

      return accumulator;
    }, {});

    return { skillNames, skillLevelsByName };
  };

  const appendUniqueSkill = (currentValue: string, skill: string) => {
    return normalizeSkillsList(currentValue ? `${currentValue}, ${skill}` : skill);
  };

  const openSkillsModal = (type: SkillModalType) => {
    const currentSkills = getSkillsArray(
      type === "hardSkills" ? step2Data.hardSkillsList : step2Data.softSkillsList
    );

    setEnteredSkills(currentSkills.join(", "));
    setActiveRatedSkill(currentSkills[0]?.toLowerCase() ?? null);
    setSelectedSkillRatingId(
      currentSkills[0]
        ? skillRatings[type][currentSkills[0].toLowerCase()] ?? null
        : null
    );
    setSkillsModal(type);
  };

  const closeSkillsModal = () => {
    const normalizedSkills = normalizeSkillsList(enteredSkills);

    if (skillsModal === 'hardSkills') {
      setStep2Data(prev => ({
        ...prev,
        hardSkills: normalizedSkills !== "",
        hardSkillsList: normalizedSkills
      }));
    } else if (skillsModal === 'softSkills') {
      setStep2Data(prev => ({
        ...prev,
        softSkills: normalizedSkills !== "",
        softSkillsList: normalizedSkills
      }));
    }

    setSkillsModal(null);
    setEnteredSkills("");
    setActiveRatedSkill(null);
  };

  const syncSkillField = (type: SkillModalType, value: string) => {
    const normalizedSkills = normalizeSkillsList(value);

    setEnteredSkills(normalizedSkills);
    setStep2Data((prev) => ({
      ...prev,
      [type]: normalizedSkills !== "",
      [`${type}List`]: normalizedSkills
    }));
  };

  const toggleRatedSkill = (skill: string) => {
    if (!skillsModal) return;

    const normalizedSkill = skill.trim().toLowerCase();
    const currentSkills = getSkillsArray(enteredSkills);
    const existingSkill = currentSkills.find((item) => item.toLowerCase() === normalizedSkill);

    if (existingSkill) {
      const updatedSkills = currentSkills.filter((item) => item.toLowerCase() !== normalizedSkill).join(", ");

      setSkillRatings((prev) => {
        const nextRatings = { ...prev[skillsModal] };
        delete nextRatings[normalizedSkill];

        return {
          ...prev,
          [skillsModal]: nextRatings
        };
      });

      if (activeRatedSkill === normalizedSkill) {
        setActiveRatedSkill(null);
      }

      syncSkillField(skillsModal, updatedSkills);
      return;
    }

    const updatedSkills = appendUniqueSkill(enteredSkills, skill);

    setActiveRatedSkill(normalizedSkill);
    setSelectedSkillRatingId(null);
    syncSkillField(skillsModal, updatedSkills);
  };

  const handleSkillRatingSelect = (ratingId: SkillRatingId) => {
    setSelectedSkillRatingId(ratingId);

    if (!skillsModal || !activeRatedSkill) {
      return;
    }

    setSkillRatings((prev) => ({
      ...prev,
      [skillsModal]: {
        ...prev[skillsModal],
        [activeRatedSkill]: ratingId
      }
    }));
  };

  const handleActiveSkillSelect = (skill: string) => {
    if (!skillsModal) return;

    const normalizedSkill = skill.trim().toLowerCase();
    setActiveRatedSkill(normalizedSkill);
    setSelectedSkillRatingId(skillRatings[skillsModal][normalizedSkill] ?? null);
  };

  const selectedAvatar = avatarOptions.find((avatar) => avatar.id === selectedAvatarId) ?? null;

  const persistPlatformUser = useCallback(() => {
    const platformUser = {
      lastName: formData.lastname,
      firstName: formData.name,
      avatar: selectedAvatar?.src ?? "",
      username: formData.username,
      email: formData.email,
      code: "",
      birthday: formData.birthday,
      age: formData.birthday ? String(calculateAge(formData.birthday)) : "",
      gender: "",
      phone: formData.phone,
      social: step2Data.telegram,
      description: step2Data.description,
    };

    localStorage.setItem("platformUser", JSON.stringify(platformUser));
  }, [formData.birthday, formData.email, formData.lastname, formData.name, formData.phone, formData.username, selectedAvatar, step2Data.description, step2Data.telegram]);

  const closeInteractivePanels = () => {
    setIsJobDropdownOpen(false);
    setIsLevelDropdownOpen(false);
    setIsAvatarPickerOpen(false);
    setIsBirthdayCalendarOpen(false);
  };

  const handleDropdownToggle = (dropdown: "job" | "level") => {
    if (dropdown === "job") {
      if (isLevelDropdownOpen || isAvatarPickerOpen) {
        closeInteractivePanels();
        return;
      }

      setIsJobDropdownOpen((prev) => !prev);
      return;
    }

    if (isJobDropdownOpen || isAvatarPickerOpen) {
      closeInteractivePanels();
      return;
    }

    setIsLevelDropdownOpen((prev) => !prev);
  };

  const handleAvatarPickerToggle = () => {
    if (isJobDropdownOpen || isLevelDropdownOpen) {
      closeInteractivePanels();
      return;
    }

    setIsAvatarPickerOpen((prev) => !prev);
  };

  const handleBirthdayCalendarToggle = () => {
    const selectedDate = formData.birthday ? new Date(formData.birthday) : new Date();
    setBirthdayViewDate(selectedDate);

    if (isJobDropdownOpen || isLevelDropdownOpen || isAvatarPickerOpen) {
      closeInteractivePanels();
      setIsBirthdayCalendarOpen(true);
      return;
    }

    setIsBirthdayCalendarOpen((prev) => !prev);
  };

  const handleBirthdaySelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const isoBirthday = `${year}-${month}-${day}`;

    setFormData((prev) => ({
      ...prev,
      birthday: isoBirthday
    }));
    setBirthdayInputValue(formatBirthdayDisplay(isoBirthday));
    setIsBirthdayCalendarOpen(false);
  };

  const handleBirthdayMonthChange = (direction: number) => {
    setBirthdayViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const handleBirthdayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = normalizeBirthdayInput(e.target.value);
    setBirthdayInputValue(normalizedValue);

    const parsedBirthday = parseBirthdayInput(normalizedValue);

    if (!parsedBirthday) {
      setFormData((prev) => ({
        ...prev,
        birthday: ""
      }));
      return;
    }

    const parsedDate = new Date(parsedBirthday);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedDate.setHours(0, 0, 0, 0);

    if (parsedDate > today) {
      setFormData((prev) => ({
        ...prev,
        birthday: ""
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      birthday: parsedBirthday
    }));
    setBirthdayViewDate(new Date(parsedBirthday));
  };

  const handleBirthdayInputBlur = () => {
    if (!birthdayInputValue) {
      return;
    }

    if (!formData.birthday) {
      setBirthdayInputValue("");
      return;
    }

    setBirthdayInputValue(formatBirthdayDisplay(formData.birthday));
  };

  const handleBirthdayMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextMonth = Number(e.target.value);
    setBirthdayViewDate((prev) => new Date(prev.getFullYear(), nextMonth, 1));
  };

  const handleBirthdayYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextYear = Number(e.target.value);
    setBirthdayViewDate((prev) => new Date(nextYear, prev.getMonth(), 1));
  };

  const isFormValid = () => {
    const phoneValidationMessage = getPhoneValidationMessage(formData.phone);
    const emailValidationMessage = getEmailValidationMessage(formData.email);

    return (
      formData.name.trim().length >= 2 &&
      formData.lastname.trim().length >= 2 &&
      formData.username.trim() !== "" &&
      formData.birthday !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.length >= 8 &&
      phoneValidationMessage === null &&
      emailValidationMessage === null
    );
  };

  const isStep2Valid = () => {
    const telegramValidationMessage = getTelegramValidationMessage(step2Data.telegram);

    return telegramValidationMessage === null;
  };

  const hasStep1Progress = Object.values(formData).some((value) => value.trim() !== "");
  const hasStep2Progress = Object.values(step2Data).some((value) => {
    if (typeof value === "boolean") {
      return value;
    }

    return value.trim() !== "";
  });
  const visiblePendingProgressStep = pendingProgressStep !== null && step > pendingProgressStep
    ? null
    : pendingProgressStep;

   const handleSignup = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!isFormValid()) return;

     setLocalError(null);
     setPendingProgressStep(1);

     dispatch(registerRequest({
       name: formData.name,
       lastname: formData.lastname,
       username: formData.username,
       birthday: formData.birthday,
       email: formData.email,
       password: formData.password,
       gender: "OTHER"
     }));
   };

   const handleStep2Submit = () => {
     if (!isStep2Valid()) return;

     setLocalError(null);
     setPendingProgressStep(2);
     setStep3Page(1);

     if (!token || !userId) {
       setPendingProgressStep(null);
       setLocalError("Сначала заверши шаг регистрации и повтори сохранение.");
       return;
     }

     dispatch(updateProfileRequest({
       token,
       userId,
       data: {
         name: formData.name,
         lastName: formData.lastname,
         username: formData.username,
         birthday: formData.birthday,
         avatar: selectedAvatar?.src ?? "",
         email: formData.email,
         bio: step2Data.description,
         gender: "OTHER",
         phone: formData.phone || null,
         telegram: normalizeTelegramValue(step2Data.telegram) || null,
         github: null,
         job: step2Data.job || "FRONT",
         level: step2Data.level || "BEGINNER",
         ...getProfileSkillPayload()
       }
     }));
   };

  useEffect(() => {
    if (step === 3) {
      persistPlatformUser();
    }
  }, [persistPlatformUser, step]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const clickedInsideJobDropdown = jobDropdownRef.current?.contains(target);
      const clickedInsideLevelDropdown = levelDropdownRef.current?.contains(target);
      const clickedInsideAvatarPicker = avatarPickerRef.current?.contains(target);
      const clickedInsideBirthdayCalendar = birthdayCalendarRef.current?.contains(target);

      if (!clickedInsideJobDropdown && !clickedInsideLevelDropdown && !clickedInsideAvatarPicker && !clickedInsideBirthdayCalendar) {
        setIsJobDropdownOpen(false);
        setIsLevelDropdownOpen(false);
        setIsAvatarPickerOpen(false);
        setIsBirthdayCalendarOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const renderProgressIndicator = () => (
    <div className="register-progress" aria-label="Прогресс регистрации">
      {[1, 2, 3].map((progressStep) => {
        const isCompleted = step > progressStep;
        const isLoading = loading && visiblePendingProgressStep === progressStep;
        const isPartial =
          !isCompleted &&
          !isLoading &&
          ((progressStep === 1 && hasStep1Progress) ||
            (progressStep === 2 && hasStep2Progress));

        return (
          <div
            key={progressStep}
            className={`register-progress-block${isCompleted ? " completed" : ""}${isLoading ? " loading" : ""}${isPartial ? " partial" : ""}`}
            aria-current={step === progressStep ? "step" : undefined}
          >
            {isCompleted ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSignup} noValidate>
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

      <div className="birthday-section" ref={birthdayCalendarRef}>
        <div className={`birthday-input-shell${isBirthdayCalendarOpen ? " open" : ""}`}>
          <input
            type="text"
            name="birthdayManual"
            value={birthdayInputValue}
            onChange={handleBirthdayInputChange}
            onBlur={handleBirthdayInputBlur}
            placeholder="DD.MM.YYYY"
            className="birthday-input birthday-text-input"
            inputMode="numeric"
          />
          <button
            type="button"
            className="birthday-trigger"
            onClick={handleBirthdayCalendarToggle}
            aria-haspopup="dialog"
            aria-expanded={isBirthdayCalendarOpen}
            aria-label="Open birthday calendar"
          >
            <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 2V5M17 2V5M3 9H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {isBirthdayCalendarOpen && (
          <div className="birthday-calendar" role="dialog" aria-label="Birthday calendar">
            <div className="birthday-calendar-header">
              <div className="calendar-period-controls">
                <select
                  className="calendar-select calendar-month-select"
                  value={birthdayViewDate.getMonth()}
                  onChange={handleBirthdayMonthSelect}
                  aria-label="Select month"
                >
                  {calendarMonthNames.map((monthName, monthIndex) => (
                    <option key={monthName} value={monthIndex}>
                      {monthName}
                    </option>
                  ))}
                </select>
                <select
                  className="calendar-select calendar-year-select"
                  value={birthdayViewDate.getFullYear()}
                  onChange={handleBirthdayYearSelect}
                  aria-label="Select year"
                >
                  {calendarYearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="calendar-nav-group">
                <button
                  type="button"
                  className="calendar-nav"
                  onClick={() => handleBirthdayMonthChange(-1)}
                  aria-label="Previous month"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  className="calendar-nav"
                  onClick={() => handleBirthdayMonthChange(1)}
                  aria-label="Next month"
                >
                  {">"}
                </button>
              </div>
            </div>

            <div className="calendar-weekdays">
              {calendarWeekDays.map((weekDay) => (
                <span key={weekDay} className="calendar-weekday">{weekDay}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {getCalendarDays(birthdayViewDate).map((date, index) => {
                if (!date) {
                  return <span key={`empty-${index}`} className="calendar-day-empty" aria-hidden="true" />;
                }

                const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                const isSelected = formData.birthday === isoDate;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const normalizedDate = new Date(date);
                normalizedDate.setHours(0, 0, 0, 0);
                const isFuture = normalizedDate > today;

                return (
                  <button
                    key={isoDate}
                    type="button"
                    className={`calendar-day${isSelected ? " selected" : ""}${isFuture ? " disabled" : ""}`}
                    onClick={() => handleBirthdaySelect(date)}
                    disabled={isFuture}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="phone-gender-row">
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          placeholder="Phone number" 
          className="phone-input" 
        />
      </div>
      {getPhoneValidationMessage(formData.phone) ? (
        <div className="error-message">{getPhoneValidationMessage(formData.phone)}</div>
      ) : null}

      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleInputChange} 
        placeholder="Email address" 
      />
      {getEmailValidationMessage(formData.email) ? (
        <div className="error-message">{getEmailValidationMessage(formData.email)}</div>
      ) : null}

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

  const renderStep2 = () => {
    const telegramValidationMessage = getTelegramValidationMessage(step2Data.telegram);

    return (
      <div className="step2-form">
      {error ? <div className="error-message">{error}</div> : null}

      <div className="avatar-section">
        <div
          ref={avatarPickerRef}
          className={`avatar-picker ${isAvatarPickerOpen ? "open" : ""}`}
        >
          <button
            type="button"
            className="avatar-placeholder"
            onClick={handleAvatarPickerToggle}
            aria-label="Выбрать аватар"
          >
            {selectedAvatar ? (
              <img src={selectedAvatar.src} alt={selectedAvatar.label} className="avatar-image" />
            ) : (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </button>
          {isAvatarPickerOpen && (
            <div className="avatar-picker-dropdown">
              <div className="avatar-picker-track">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`avatar-option ${selectedAvatarId === avatar.id ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedAvatarId(avatar.id);
                      setIsAvatarPickerOpen(false);
                    }}
                    aria-label={`Выбрать аватар ${avatar.label}`}
                  >
                    <img src={avatar.src} alt={avatar.label} className="avatar-option-image" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="role-section">
        <div 
          ref={jobDropdownRef}
          className={`custom-dropdown ${isJobDropdownOpen ? 'open' : ''}`}
          onClick={() => handleDropdownToggle("job")}
        >
          <div className="dropdown-selected">
            {step2Data.job 
              ? jobOptions.find(r => r.id === step2Data.job)?.label 
              : "Выберите направление"}
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
                    closeInteractivePanels();
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
          ref={levelDropdownRef}
          className={`custom-dropdown status-dropdown ${isLevelDropdownOpen ? 'open' : ''}`}
          onClick={() => handleDropdownToggle("level")}
        >
          <div className="dropdown-selected">
            {step2Data.level 
              ? levelOptions.find(s => s.id === step2Data.level)?.label 
              : "Выберите уровень"}
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
                    closeInteractivePanels();
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
              onChange={(e) => setEnteredSkills(normalizeSkillsList(e.target.value))}
              placeholder={skillsModal === 'hardSkills' 
                ? 'Введите ваши Hard-skills...' 
                : 'Введите ваши Soft-skills...'}
              className="skills-textarea"
            />
            <div className="skills-modal-layout">
              <div className="skills-modal-main">
            <div className="skills-selected-box">
              {getSkillsArray(enteredSkills).length > 0 ? (
                getSkillsArray(enteredSkills).map((skill) => {
                  const ratingId = skillRatings[skillsModal][skill.toLowerCase()];
                  const rating = skillRatingOptions.find((option) => option.id === ratingId);

                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`selected-skill-chip ${activeRatedSkill === skill.toLowerCase() ? "active" : ""}`}
                      onClick={() => handleActiveSkillSelect(skill)}
                      style={{ background: rating?.color ?? "#FFFFFF" }}
                    >
                      {skill}
                    </button>
                  );
                })
              ) : (
                <span className="skills-selected-placeholder">
                  Выберите навык, и он появится здесь
                </span>
              )}
            </div>
<div className="recommended-skills">
              <p>Рекомендованные навыки</p>
              <div className="recommended-skills-list">
                {(skillsModal === 'hardSkills' ? recommendedHardSkills : recommendedSoftSkills).map(skill => (
                  <button 
                    key={skill}
                    type="button"
                    className={`recommended-skill-btn ${getSkillsArray(enteredSkills).some((item) => item.toLowerCase() === skill.toLowerCase()) ? "selected" : ""} ${activeRatedSkill === skill.toLowerCase() ? "active" : ""}`}
                    onClick={() => {
                      if (activeRatedSkill === skill.toLowerCase()) {
                        toggleRatedSkill(skill);
                        return;
                      }

                      if (getSkillsArray(enteredSkills).some((item) => item.toLowerCase() === skill.toLowerCase())) {
                        handleActiveSkillSelect(skill);
                        return;
                      }

                      toggleRatedSkill(skill);
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
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
        {telegramValidationMessage ? (
          <div className="error-message floating-error-message">{telegramValidationMessage}</div>
        ) : null}
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
  };

  const renderStep3 = () => (
    <div className="step3-form">
      <img className="step3-union step3-union-top" src={UnionTop} alt="" />
      <img className="step3-union step3-union-bottom" src={UnionBottom} alt="" />
      <button
        type="button"
        className="step3-page-arrow step3-page-arrow-outside"
        onClick={() => setStep3Page(prev => (prev === 1 ? 2 : 1))}
        aria-label={step3Page === 1 ? "РџРѕРєР°Р·Р°С‚СЊ РІС‚РѕСЂСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ" : "Р’РµСЂРЅСѓС‚СЊСЃСЏ РЅР° РїРµСЂРІСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ"}
      >
        <span>{step3Page === 1 ? ">" : "<"}</span>
      </button>
      <div className="user-info-section">
        <button
          type="button"
          className="step3-page-arrow"
          onClick={() => setStep3Page(prev => (prev === 1 ? 2 : 1))}
          aria-label={step3Page === 1 ? "Показать вторую страницу" : "Вернуться на первую страницу"}
        >
          <span>{step3Page === 1 ? ">" : "<"}</span>
        </button>
        <div className={`step3-left-column ${step3Page === 1 ? "" : "step3-hidden"}`}>
          <div className="avatar-section">
            <div className="avatar-placeholder">
              {selectedAvatar ? (
                <img src={selectedAvatar.src} alt={selectedAvatar.label} className="avatar-image" />
              ) : (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
          </div>

          <div className="user-name-display">
            {formData.lastname && <p className="surname-display">{formData.lastname}</p>}
            {formData.name && <p className="name-display">{formData.name}</p>}
          </div>

          <div className="step3-contact-group">
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
          </div>
        </div>

        <div className={`step3-right-column ${step3Page === 1 ? "" : "step3-hidden"}`}>
          <div className="participant-section">
            <span className="participant-display">Участник</span>
          </div>

          <img className="renderstep3-girl" src={renderstep3Girl} alt="" />

          <div className="role-section">
            <span className="role-display">{jobOptions.find(r => r.id === step2Data.job)?.label}</span>
          </div>

          <div className="status-section step3-hidden">
            <span className="status-display">{levelOptions.find(s => s.id === step2Data.level)?.label}</span>
          </div>

          <div className="description-section">
            <div className="description-title">О себе...</div>
            <p className="description-display">{step2Data.description || "Описание не добавлено"}</p>
          </div>
        </div>

        <div className={`step3-secondary-page ${step3Page === 2 ? "" : "step3-hidden"}`}>
          <div className="step3-secondary-content">
            <div className="step3-secondary-header">
              <div className="step3-secondary-profile">
                <div className="secondary-avatar-section">
                  <div className="secondary-avatar-placeholder">
                    {selectedAvatar ? (
                      <img src={selectedAvatar.src} alt={selectedAvatar.label} className="secondary-avatar-image" />
                    ) : (
                      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                </div>

                <div className="secondary-role-section">
                  <span className="secondary-role-display">
                    {jobOptions.find(r => r.id === step2Data.job)?.label || "Не указано"}
                  </span>
                </div>
              </div>

              <div className="secondary-level-section">
                <span className="secondary-level-display">
                  {levelOptions.find(s => s.id === step2Data.level)?.label || "Не указано"}
                </span>
              </div>
            </div>

            <div className="skills-preview">
              <div className="skills-list">
                <span className="skills-value">Hard-skills: {step2Data.hardSkillsList || "Не указано"}</span>
              </div>
              <div className="skills-list">
                <span className="skills-value">Soft-skills: {step2Data.softSkillsList || "Не указано"}</span>
              </div>
            </div>
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

  const renderSkillsRatingSidebar = () => (
    <div className="skills-rating-sidebar skills-rating-sidebar-floating">
      <h3>Оценка навыка</h3>
      <div className="skills-rating-list">
        {skillRatingOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`skills-rating-item ${selectedSkillRatingId === option.id && activeRatedSkill ? 'active' : ''}`}
            onClick={() => handleSkillRatingSelect(option.id)}
            aria-label={option.label}
          >
            <span
              className="skills-rating-dot"
              style={{ background: option.color }}
            />
            <span className="skills-rating-label">
              {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`register-role-page ${selectedRole ? 'role-selected' : ''}`}>
      {selectedRole ? (
        <>
          <img className="BackLogin" src={BackLogin} alt="" />
          <img className="register-lines" src={registerLines} alt="" />
          <img className="loginnregistr" src={loginnregistr} alt="" />
          <img className="boyforma" src={boyregistration} alt="" />
          {renderProgressIndicator()}
          <div className={`register-form-shell ${skillsModal ? 'skills-open' : ''}`}>
          <div className="register-form-container">
            <div className="logo-block">
              <img className="register-badge" src={badge} alt="" />
            </div>
            {step === 3 ? renderStep3() : step === 2 ? renderStep2() : (
              <>
                <img className="logoLogin" src={logo} alt="Логотип KTSThub" />
                <h2>Welcome to platform</h2>
                {renderForm()}
              </>
            )}
          </div>
          {step === 2 && skillsModal ? renderSkillsRatingSidebar() : null}
          </div>
        </>
      ) : (
        <>
          <img className="register-auth-star register-auth-star-top-left" src={authStar} alt="" />
          <img className="register-auth-star register-auth-star-bottom-left" src={authStar} alt="" />
          <img className="register-auth-star register-auth-star-top-right" src={authStar} alt="" />
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
          <img className="backregister" src={registerBack} alt="" />
        </>
      )}
    </div>
  );
}
