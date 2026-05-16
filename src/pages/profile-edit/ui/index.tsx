import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { actions as authActions, AuthFeature } from "../../../features/auth";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  topMenuItems,
  type NavigationMenuItem,
} from "../../../features/navigation";
import { updateUserProfile, type UpdateUserPayload } from "../../../shared/api/users";
import { USE_MOCK_BACKEND } from "../../../shared/config/devFlags";
import { mapBackendUserToPlatformUser } from "../../../shared/lib/userProfile";
import logo from "../../../shared/assets/logo.png";
import Axolotl from "../../../shared/assets/Axolotl.png";
import BlackCat from "../../../shared/assets/BlackCat.png";
import RainbowPic from "../../../shared/assets/RainbowPic.png";
import Boy from "../../../shared/assets/Boy.png";
import Girl from "../../../shared/assets/Girl.png";
import panda from "../../../shared/assets/panda.png";
import unicorn from "../../../shared/assets/unicorn.png";
import brain from "../../../shared/assets/brain.png";
import joystick from "../../../shared/assets/joystick.png";
import game from "../../../shared/assets/game.png";
import type { PlatformIconName } from "../../../shared/ui/PlatformIcon";
import "../../profile/ui/index.scss";

type IconName = PlatformIconName;
type ProfileFieldName = "name" | "lastName" | "username" | "birthday" | "email" | "phone" | "telegram" | "github" | "gender" | "job" | "level";

const jobOptions = ["FRONT", "BACK", "DESIGNER", "PROJECT", "GAME"];
const levelOptions = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const genderLabels: Record<"MALE" | "FEMALE", string> = {
  MALE: "Мужской",
  FEMALE: "Женский",
};
const jobLabels: Record<(typeof jobOptions)[number], string> = {
  FRONT: "Frontend-разработчик",
  BACK: "Backend-разработчик",
  DESIGNER: "UX/UI-разработчик",
  PROJECT: "Project Manager",
  GAME: "Gamedev",
};
const levelLabels: Record<(typeof levelOptions)[number], string> = {
  BEGINNER: "Начинающий",
  INTERMEDIATE: "Средний",
  ADVANCED: "Продвинутый",
};
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

const iconPaths: Record<IconName, ReactNode> = {
  user: <><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></>,
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-7h6v7" /></>,
  calendar: <><path d="M7 3v4" /><path d="M17 3v4" /><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18" /></>,
  projects: <><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>,
  users: <><path d="M16 21a6 6 0 0 0-12 0" /><circle cx="10" cy="8" r="4" /><path d="M22 21a5 5 0 0 0-5-5" /><path d="M17 4a4 4 0 0 1 0 8" /></>,
  award: <><circle cx="12" cy="8" r="5" /><path d="m8.5 12-1.5 9 5-3 5 3-1.5-9" /></>,
  support: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.7 2.7 0 0 1 5 1.4c0 2.1-2.5 2.4-2.5 4.1" /><path d="M12 18h.01" /></>,
  settings: <><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path d="M19.4 15a1.9 1.9 0 0 0 .38 2.1l.05.05a2.25 2.25 0 0 1-3.18 3.18l-.05-.05a1.9 1.9 0 0 0-2.1-.38 1.9 1.9 0 0 0-1.15 1.75V22a2.25 2.25 0 0 1-4.5 0v-.08A1.9 1.9 0 0 0 7.7 20.17a1.9 1.9 0 0 0-2.1.38l-.05.05a2.25 2.25 0 0 1-3.18-3.18l.05-.05A1.9 1.9 0 0 0 2.8 15a1.9 1.9 0 0 0-1.75-1.15H1a2.25 2.25 0 0 1 0-4.5h.08A1.9 1.9 0 0 0 2.83 8.2a1.9 1.9 0 0 0-.38-2.1l-.05-.05a2.25 2.25 0 0 1 3.18-3.18l.05.05a1.9 1.9 0 0 0 2.1.38A1.9 1.9 0 0 0 8.88 1.55V1a2.25 2.25 0 0 1 4.5 0v.08a1.9 1.9 0 0 0 1.15 1.75 1.9 1.9 0 0 0 2.1-.38l.05-.05a2.25 2.25 0 0 1 3.18 3.18l-.05.05a1.9 1.9 0 0 0-.38 2.1 1.9 1.9 0 0 0 1.75 1.15H22a2.25 2.25 0 0 1 0 4.5h-.08A1.9 1.9 0 0 0 19.4 15Z" /></>,
  logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 3v18h-8" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  favorite: <path d="m12 21-1.45-1.32C5.4 15 2 11.92 2 8.14 2 5.06 4.42 3 7.2 3c1.57 0 3.08.73 4.05 1.88A5.36 5.36 0 0 1 15.3 3C18.08 3 20.5 5.06 20.5 8.14c0 3.78-3.4 6.86-8.55 11.54L12 21Z" />,
  bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg className="platform-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="platformActiveGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9605CA" />
          <stop offset="1" stopColor="#FF5100" />
        </linearGradient>
      </defs>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name]}
      </g>
    </svg>
  );
}

function normalizePhoneValue(value: string) {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) {
    return "";
  }

  if (digitsOnly.length === 11 && digitsOnly.startsWith("8")) {
    return `+7${digitsOnly.slice(1)}`;
  }

  if (digitsOnly.length === 11 && digitsOnly.startsWith("7")) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.length === 10 && digitsOnly.startsWith("9")) {
    return `+7${digitsOnly}`;
  }

  return value.trim();
}

function normalizeTelegramValue(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (trimmedValue.startsWith("@")) {
    return `https://t.me/${trimmedValue.slice(1)}`;
  }

  return trimmedValue.replace(/\/$/, "");
}

function normalizeGithubValue(value: string) {
  return value.trim().replace(/\/$/, "");
}

function validateProfileForm(formData: {
  name: string;
  lastName: string;
  username: string;
  birthday: string;
  email: string;
  phone: string;
  telegram: string;
  github: string;
  gender: string;
}) {
  if (formData.name.trim().length < 2) {
    return "Имя должно содержать минимум 2 символа.";
  }

  if (formData.lastName.trim().length < 2) {
    return "Фамилия должна содержать минимум 2 символа.";
  }

  if (!formData.username.trim()) {
    return "Username не должен быть пустым.";
  }

  if (!formData.email.trim()) {
    return "Email не должен быть пустым.";
  }

  if (!formData.birthday) {
    return "Укажи дату рождения.";
  }

  if (formData.gender !== "MALE" && formData.gender !== "FEMALE") {
    return "Укажи пол.";
  }

  const birthdayDate = new Date(formData.birthday);
  const today = new Date();
  if (Number.isNaN(birthdayDate.getTime()) || birthdayDate >= today) {
    return "Дата рождения должна быть в прошлом.";
  }

  const normalizedPhone = normalizePhoneValue(formData.phone);

  if (normalizedPhone && !/^\+79\d{9}$/.test(normalizedPhone)) {
    return "Телефон должен быть в формате +79xxxxxxxxx.";
  }

  const normalizedTelegram = normalizeTelegramValue(formData.telegram);

  if (normalizedTelegram && !/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/.test(normalizedTelegram)) {
    return "Telegram должен быть в формате https://t.me/username.";
  }

  const normalizedGithub = normalizeGithubValue(formData.github);

  if (normalizedGithub && !/^https:\/\/github\.com\/[a-zA-Z0-9-_]+$/.test(normalizedGithub)) {
    return "GitHub должен быть в формате https://github.com/username.";
  }

  return null;
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
      return responseData;
    }

    if (responseData && typeof responseData === "object") {
      const detailedMessage = "detailedMessage" in responseData ? responseData.detailedMessage : null;
      const message = "message" in responseData ? responseData.message : null;
      const errorField = "error" in responseData ? responseData.error : null;

      if (typeof detailedMessage === "string" && detailedMessage.trim()) {
        if (detailedMessage.includes("'phone'") || detailedMessage.includes("Неправильный формат номера")) {
          return "Проверь номер телефона. Нужен формат +79123456789.";
        }

        if (detailedMessage.includes("'telegram'")) {
          return "Проверь Telegram. Введи ссылку в формате https://t.me/username.";
        }

        if (detailedMessage.includes("'github'") || detailedMessage.includes("GitHub")) {
          return "Проверь ссылку на GitHub. Нужен формат https://github.com/username.";
        }

        return detailedMessage;
      }

      if (typeof message === "string" && message.trim()) {
        return message;
      }

      if (typeof errorField === "string" && errorField.trim()) {
        return errorField;
      }
    }

    if (error.response?.status === 400) {
      return "Backend отклонил данные профиля. Проверь формат телефона, Telegram, даты рождения или уникальность username/email.";
    }

    if (error.response?.status === 401) {
      return "Сессия истекла. Войди заново и повтори сохранение.";
    }

    if (error.response?.status === 404) {
      return "Пользователь не найден на backend.";
    }
  }

  return "Не удалось сохранить профиль. Проверь подключение к backend и данные формы.";
}

function collectProfileFormErrors(formData: {
  name: string;
  lastName: string;
  username: string;
  birthday: string;
  email: string;
  phone: string;
  telegram: string;
  github: string;
  gender: string;
}) {
  const errors: string[] = [];

  if (formData.name.trim().length < 2) {
    errors.push("Имя должно содержать минимум 2 символа.");
  }

  if (formData.lastName.trim().length < 2) {
    errors.push("Фамилия должна содержать минимум 2 символа.");
  }

  if (!formData.username.trim()) {
    errors.push("Username не должен быть пустым.");
  }

  if (!formData.email.trim()) {
    errors.push("Email не должен быть пустым.");
  }

  if (!formData.birthday) {
    errors.push("Укажи дату рождения.");
  } else {
    const birthdayDate = new Date(formData.birthday);
    const today = new Date();

    if (Number.isNaN(birthdayDate.getTime()) || birthdayDate >= today) {
      errors.push("Дата рождения должна быть в прошлом.");
    }
  }

  if (formData.gender !== "MALE" && formData.gender !== "FEMALE") {
    errors.push("Укажи пол.");
  }

  const normalizedPhone = normalizePhoneValue(formData.phone);
  if (normalizedPhone && !/^\+79\d{9}$/.test(normalizedPhone)) {
    errors.push("Телефон должен быть в формате +79123456789.");
  }

  const normalizedTelegram = normalizeTelegramValue(formData.telegram);
  if (normalizedTelegram && !/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/.test(normalizedTelegram)) {
    errors.push("Telegram должен быть в формате https://t.me/username.");
  }

  const normalizedGithub = normalizeGithubValue(formData.github);
  if (normalizedGithub && !/^https:\/\/github\.com\/[a-zA-Z0-9-_]+$/.test(normalizedGithub)) {
    errors.push("GitHub должен быть в формате https://github.com/username.");
  }

  return errors;
}

void validateProfileForm;

function getProfileFieldError(
  fieldName: ProfileFieldName,
  formData: {
    name: string;
    lastName: string;
    username: string;
    birthday: string;
    email: string;
    phone: string;
    telegram: string;
    github: string;
    gender: string;
    job: string;
    level: string;
  },
) {
  switch (fieldName) {
    case "name":
      return formData.name.trim().length < 2 ? "Имя должно содержать минимум 2 символа." : null;
    case "lastName":
      return formData.lastName.trim().length < 2 ? "Фамилия должна содержать минимум 2 символа." : null;
    case "username":
      return !formData.username.trim() ? "Username не должен быть пустым." : null;
    case "email":
      return !formData.email.trim() ? "Email не должен быть пустым." : null;
    case "birthday":
      if (!formData.birthday) {
        return "Укажи дату рождения.";
      }

      const birthdayDate = new Date(formData.birthday);
      return Number.isNaN(birthdayDate.getTime()) || birthdayDate >= new Date()
        ? "Дата рождения должна быть в прошлом."
        : null;
    case "gender":
      return formData.gender !== "MALE" && formData.gender !== "FEMALE" ? "Укажи пол." : null;
    case "phone": {
      const normalizedPhone = normalizePhoneValue(formData.phone);
      return normalizedPhone && !/^\+79\d{9}$/.test(normalizedPhone)
        ? "Телефон должен быть в формате +79123456789."
        : null;
    }
    case "telegram": {
      const normalizedTelegram = normalizeTelegramValue(formData.telegram);
      return normalizedTelegram && !/^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/.test(normalizedTelegram)
        ? "Telegram должен быть в формате https://t.me/username."
        : null;
    }
    case "github": {
      const normalizedGithub = normalizeGithubValue(formData.github);
      return normalizedGithub && !/^https:\/\/github\.com\/[a-zA-Z0-9-_]+$/.test(normalizedGithub)
        ? "GitHub должен быть в формате https://github.com/username."
        : null;
    }
    default:
      return null;
  }
}

export function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user: backendUser, loading } = useSelector(AuthFeature.selectors.root);
  const currentUser = useMemo(() => mapBackendUserToPlatformUser(backendUser), [backendUser]);
  const editableUserId = backendUser?.id ?? null;
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveErrors, setSaveErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [formHydrated, setFormHydrated] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [selectedAvatarSrc, setSelectedAvatarSrc] = useState("");
  const [touchedFields, setTouchedFields] = useState<Partial<Record<ProfileFieldName, boolean>>>({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    birthday: "",
    email: "",
    phone: "",
    telegram: "",
    github: "",
    gender: "",
    job: "",
    level: "",
  });

  useEffect(() => {
    if (token && !backendUser && !loading) {
      dispatch(authActions.fetchProfileRequest());
    }
  }, [backendUser, dispatch, loading, token]);

  useEffect(() => {
    if (formHydrated) {
      return;
    }

    if (token && !backendUser) {
      return;
    }

    setFormData({
      name: backendUser?.name ?? currentUser.firstName ?? "",
      lastName: backendUser?.lastName ?? backendUser?.lastname ?? currentUser.lastName ?? "",
      username: backendUser?.username ?? currentUser.username ?? "",
      birthday: backendUser?.birthday ?? currentUser.birthday ?? "",
      email: backendUser?.email ?? currentUser.email ?? "",
      phone: backendUser?.phone ?? currentUser.phone ?? "",
      telegram: backendUser?.telegram ?? currentUser.social ?? "",
      github: backendUser?.github ?? currentUser.github ?? "",
      gender: backendUser?.gender === "MALE" || backendUser?.gender === "FEMALE" ? backendUser.gender : "",
      job: backendUser?.job ?? currentUser.job ?? "",
      level: backendUser?.level ?? currentUser.level ?? "",
    });
    setSelectedAvatarSrc(currentUser.avatar ?? "");
    setFormHydrated(true);
  }, [backendUser, currentUser, formHydrated, token]);

  const avatarSrc = !isAvatarBroken && (selectedAvatarSrc || currentUser.avatar) ? (selectedAvatarSrc || currentUser.avatar) : logo;
  const activeTopItem = topMenuItems[0];
  const liveValidationErrors = (Object.entries(touchedFields) as Array<[ProfileFieldName, boolean | undefined]>)
    .filter(([, touched]) => Boolean(touched))
    .map(([fieldName]) => getProfileFieldError(fieldName, formData))
    .filter((errorMessage) => errorMessage !== null) as string[];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setTouchedFields((current) => ({ ...current, [name]: true }));
    setSaveError(null);
    setSaveErrors([]);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedFields({
      name: true,
      lastName: true,
      username: true,
      birthday: true,
      email: true,
      phone: true,
      telegram: true,
      github: true,
      gender: true,
    });

    if (!editableUserId) {
      setSaveError("Не удалось определить пользователя для сохранения профиля.");
      setSaveErrors(["Не удалось определить пользователя для сохранения профиля."]);
      return;
    }

    const validationErrors = collectProfileFormErrors(formData);
    if (validationErrors.length > 0) {
      setSaveError(validationErrors[0]);
      setSaveErrors(validationErrors);
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveErrors([]);

    try {
      const normalizedPhone = normalizePhoneValue(formData.phone);
      const normalizedTelegram = normalizeTelegramValue(formData.telegram);
      const normalizedGithub = normalizeGithubValue(formData.github);
      const nextAvatar = selectedAvatarSrc || currentUser.avatar || "";
      const payload: UpdateUserPayload = {
        name: formData.name,
        lastName: formData.lastName,
        username: formData.username,
        birthday: formData.birthday,
        avatar: nextAvatar,
        email: formData.email,
        bio: currentUser.description || "",
        gender: formData.gender as "MALE" | "FEMALE",
        phone: normalizedPhone,
        telegram: normalizedTelegram,
        github: normalizedGithub || null,
        job: formData.job || "FRONT",
        level: formData.level || "BEGINNER",
      };

      if (USE_MOCK_BACKEND) {
        const savedUser = {
          ...currentUser,
          firstName: formData.name,
          lastName: formData.lastName,
          username: formData.username,
          birthday: formData.birthday,
          avatar: nextAvatar,
          email: formData.email,
          phone: normalizedPhone,
          social: normalizedTelegram,
          github: normalizedGithub,
          job: formData.job,
          level: formData.level,
        };

        localStorage.setItem("platformUser", JSON.stringify(savedUser));
        dispatch(authActions.fetchProfileSuccess({
          id: editableUserId,
          name: formData.name,
          lastName: formData.lastName,
          username: formData.username,
          birthday: formData.birthday,
          avatar: nextAvatar,
          email: formData.email,
          bio: currentUser.description || "",
          gender: formData.gender as "MALE" | "FEMALE",
          phone: normalizedPhone,
          telegram: normalizedTelegram,
          github: normalizedGithub || null,
          role: backendUser?.role,
          status: backendUser?.status,
          job: formData.job || "FRONT",
          level: formData.level || "BEGINNER",
        }));
        navigate("/profile");
        return;
      }

      // const updatedUser = await updateUserProfile(editableUserId, payload);
      const updatedUser = await updateUserProfile(editableUserId, payload);
      dispatch(authActions.fetchProfileSuccess(updatedUser));
      navigate("/profile");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setSaveError(errorMessage);
      setSaveErrors([errorMessage]);
    } finally {
      setSaving(false);
    }
  };

  const renderMenuButton = (item: NavigationMenuItem) => {
    const isActive = item.path ? item.path === "/profile/edit" : activeBottomItemId === item.id;

    return (
      <button
        key={item.id}
        type="button"
        className={`platform-menu-button ${isActive ? "active" : ""}`}
        onClick={() => {
          if (item.path) {
            navigate(item.path);
            return;
          }

          if (item.id === "logout") {
            dispatch(authActions.logout());
            navigate("/login");
            return;
          }

          dispatch(navigationActions.setActiveBottomItemId(item.id));
        }}
      >
        <span className="platform-button-inner">
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </span>
      </button>
    );
  };

  return (
    <main className="platform-page">
      <aside className="platform-sidebar" aria-label="Навигация платформы">
        <section className="platform-sidebar-block platform-sidebar-top">
          <div className="platform-logo-frame"><img src={logo} alt="KTSThub" /></div>
          <nav className="platform-menu">{topMenuItems.map(renderMenuButton)}</nav>
        </section>
        <section className="platform-sidebar-block platform-sidebar-bottom">
          <nav className="platform-menu">{bottomMenuItems.map(renderMenuButton)}</nav>
        </section>
      </aside>

      <section className="platform-workspace">
        <header className="platform-header">
          <div className="platform-content-pill"><span>{activeTopItem.label}</span></div>
          <div className="platform-search-group">
            <label className="platform-search" aria-label="Поиск">
              <input type="search" placeholder="Поиск" />
              <span className="platform-round-button"><Icon name="search" /></span>
            </label>
            <button type="button" className="platform-round-button" aria-label="Избранное"><Icon name="favorite" /></button>
            <button type="button" className="platform-round-button" aria-label="Уведомления"><Icon name="bell" /></button>
          </div>
          <div className="platform-user-card">
            <div className="platform-user-text">
              <strong>{currentUser.lastName} {currentUser.firstName}</strong>
              <span>{currentUser.email}</span>
            </div>
            <img className="platform-avatar" src={avatarSrc} alt={`${currentUser.lastName} ${currentUser.firstName}`} onError={() => setIsAvatarBroken(true)} />
          </div>
        </header>

        <section className="profile-dashboard">
          <div className="profile-edit-layout">
            <article className="profile-panel profile-panel-user">
              <button
                type="button"
                className="profile-avatar-trigger"
                onClick={() => setIsAvatarPickerOpen((current) => !current)}
                aria-expanded={isAvatarPickerOpen}
                aria-label="Изменить аватар"
              >
                <img className="profile-panel-avatar" src={avatarSrc} alt={`${currentUser.lastName} ${currentUser.firstName}`} onError={() => setIsAvatarBroken(true)} />
                <span className="profile-avatar-hint">Нажми, чтобы сменить аватар</span>
              </button>
              {isAvatarPickerOpen ? (
                <div className="profile-avatar-picker" role="list" aria-label="Выбор аватара">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      className={`profile-avatar-option ${selectedAvatarSrc === avatar.src ? "active" : ""}`}
                      onClick={() => {
                        setIsAvatarBroken(false);
                        setSelectedAvatarSrc(avatar.src);
                        setIsAvatarPickerOpen(false);
                      }}
                      aria-label={avatar.label}
                    >
                      <img src={avatar.src} alt={avatar.label} />
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="profile-panel-user-text">
                <h2>Редактирование профиля</h2>
                <p>Измени данные и сохрани их прямо в backend.</p>
              </div>
            </article>

            <article className="profile-panel profile-panel-form">
              <h2>Данные пользователя</h2>
              <form className="profile-edit-form" onSubmit={handleSave}>
                {liveValidationErrors.length > 0 || saveErrors.length > 0 || saveError ? (
                  <div className="profile-form-message error">
                    {(liveValidationErrors.length > 0 ? liveValidationErrors : saveErrors).map((errorMessage) => (
                      <div key={errorMessage}>{errorMessage}</div>
                    ))}
                  </div>
                ) : null}

                <div className="profile-form-grid">
                  <label className="profile-form-field">
                    <span>Имя</span>
                    <input name="name" value={formData.name} onChange={handleInputChange} required />
                  </label>
                  <label className="profile-form-field">
                    <span>Фамилия</span>
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </label>
                  <label className="profile-form-field">
                    <span>Username</span>
                    <input name="username" value={formData.username} onChange={handleInputChange} required />
                  </label>
                  <label className="profile-form-field">
                    <span>Email</span>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </label>
                  <label className="profile-form-field">
                    <span>Дата рождения</span>
                    <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} required />
                  </label>
                  <label className="profile-form-field">
                    <span>Телефон</span>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+79123456789" />
                  </label>
                  <label className="profile-form-field">
                    <span>Telegram</span>
                    <input name="telegram" value={formData.telegram} onChange={handleInputChange} placeholder="https://t.me/username" />
                  </label>
                  <label className="profile-form-field">
                    <span>GitHub</span>
                    <input name="github" value={formData.github} onChange={handleInputChange} placeholder="https://github.com/username" />
                  </label>
                  <label className="profile-form-field">
                    <span>Пол</span>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                      <option value="">Не указано</option>
                      <option value="MALE">{genderLabels.MALE}</option>
                      <option value="FEMALE">{genderLabels.FEMALE}</option>
                    </select>
                  </label>
                  <label className="profile-form-field">
                    <span>Направление</span>
                    <select name="job" value={formData.job} onChange={handleInputChange}>
                      <option value="">Не указано</option>
                      {jobOptions.map((option) => <option key={option} value={option}>{jobLabels[option]}</option>)}
                    </select>
                  </label>
                  <label className="profile-form-field">
                    <span>Уровень</span>
                    <select name="level" value={formData.level} onChange={handleInputChange}>
                      <option value="">Не указано</option>
                      {levelOptions.map((option) => <option key={option} value={option}>{levelLabels[option]}</option>)}
                    </select>
                  </label>
                </div>

                <div className="profile-form-actions">
                  <button type="button" className="profile-action-button secondary" onClick={() => navigate("/profile")}>
                    Отмена
                  </button>
                  <button type="submit" className="profile-action-button" disabled={saving || !editableUserId}>
                    {saving ? "Сохранение..." : "Сохранить профиль"}
                  </button>
                </div>
              </form>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}





