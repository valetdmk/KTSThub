import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../../../entities/user/model";
import { actions as authActions, AuthFeature } from "../../../features/auth";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  topMenuItems,
  type NavigationMenuItem,
} from "../../../features/navigation";
import { DEFAULT_AVATAR, mapBackendUserToPlatformUser, resolveUserAvatar } from "../../../shared/lib/userProfile";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import { PlatformSearchControl } from "../../../shared/ui/PlatformSearchControl";
import "./index.scss";

const EMPTY_PROFILE_SKILLS: NonNullable<User["skills"]> = [];

type InfoItem = {
  label: string;
  value: string;
  href?: string;
};

type MockProject = {
  id: number;
  title: string;
  description: string;
  meta: string;
  date: string;
};

type MockTeam = {
  id: number;
  name: string;
  description: string;
  role: string;
  members: string;
};

const roleLabels: Record<string, string> = {
  USER: "Участник",
  STUDENT: "Студент",
  BUSINESS_PARTNER: "Бизнес-партнер",
  JUDGE: "Судья",
  ORGANIZER: "Организатор",
};

const jobLabels: Record<string, string> = {
  FRONT: "Frontend-разработчик",
  BACK: "Backend-разработчик",
  DESIGNER: "UX/UI-разработчик",
  PROJECT: "Project Manager",
  GAME: "Gamedev",
};

const levelLabels: Record<string, string> = {
  BEGINNER: "Начинающий",
  INTERMEDIATE: "Средний",
  ADVANCED: "Продвинутый",
};

const mockProjects: MockProject[] = [
  {
    id: 1,
    title: "День фронтенда",
    description: "Интенсив по созданию современного интерфейса с командной работой и защитой итогового решения.",
    meta: "5 участников",
    date: "18 мая 2026",
  },
  {
    id: 2,
    title: "Интенсив по backend",
    description: "Практическое мероприятие по проектированию API, работе с базами данных и серверной логике.",
    meta: "4 участника",
    date: "7 июня 2026",
  },
  {
    id: 3,
    title: "UX/UI Design Sprint",
    description: "Серия спринтов для прототипирования, тестирования и презентации интерфейсов.",
    meta: "3 участника",
    date: "12 июля 2026",
  },
  {
    id: 4,
    title: "MVP Product Lab",
    description: "Командная работа над первой версией продукта с защитой перед экспертами.",
    meta: "6 участников",
    date: "3 августа 2026",
  },
  {
    id: 5,
    title: "Game Jam Weekend",
    description: "Короткий интенсив по созданию игрового прототипа с финальной презентацией.",
    meta: "5 участников",
    date: "24 августа 2026",
  },
];

const mockTeams: MockTeam[] = [
  {
    id: 1,
    name: "Команда Север",
    description: "Фокус на продуктовой разработке, быстрых прототипах и защите решений.",
    role: "Frontend",
    members: "4 участника",
  },
  {
    id: 2,
    name: "Pixel Crew",
    description: "Небольшая кросс-функциональная команда для UX/UI и MVP-задач.",
    role: "UX/UI",
    members: "3 участника",
  },
  {
    id: 3,
    name: "API Forge",
    description: "Команда для backend-задач, интеграций и проектирования сервисов.",
    role: "Backend",
    members: "4 участника",
  },
  {
    id: 4,
    name: "Product Hunters",
    description: "Фокус на продуктовом мышлении, исследовании и быстрых MVP.",
    role: "Product",
    members: "5 участников",
  },
  {
    id: 5,
    name: "Motion Lab",
    description: "Команда, которая отвечает за визуальную подачу, анимации и презентацию итогов.",
    role: "Design",
    members: "4 участника",
  },
];

function isSoftSkillCategory(category?: string | null) {
  const normalized = category?.trim().toLowerCase() ?? "";
  return normalized.includes("soft") || normalized.includes("софт");
}

function formatDate(date: string) {
  if (!date) return "Не указана";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("ru-RU").format(parsedDate);
}

function formatMappedValue(value: string | undefined, labels: Record<string, string>, fallback: string) {
  const normalizedValue = value?.trim();
  if (!normalizedValue) return fallback;
  return labels[normalizedValue] ?? normalizedValue;
}

export const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user: backendUser, loading } = useSelector(AuthFeature.selectors.root);
  const user = useMemo(() => mapBackendUserToPlatformUser(backendUser), [backendUser]);
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[0];
  const avatarSrc = !isAvatarBroken ? resolveUserAvatar(user.avatar) : DEFAULT_AVATAR;
  const profileSkills = backendUser?.skills ?? EMPTY_PROFILE_SKILLS;
  const hasAnySkills = profileSkills.length > 0;

  const infoItems: InfoItem[] = [
    { label: "Возраст", value: user.age?.trim() || "Не указан" },
    { label: "Дата рождения", value: formatDate(user.birthday ?? "") },
    { label: "Телефон", value: user.phone?.trim() || "Не указан" },
    { label: "Telegram", value: user.social?.trim() || "Не указан", href: user.social?.trim() || undefined },
    { label: "GitHub", value: user.github?.trim() || "Не указан", href: user.github?.trim() || undefined },
    { label: "Роль", value: formatMappedValue(user.role, roleLabels, "Не указана") },
    { label: "Направление", value: formatMappedValue(user.job, jobLabels, "Не указано") },
    { label: "Уровень", value: formatMappedValue(user.level, levelLabels, "Не указан") },
  ];

  useEffect(() => {
    if (token && !backendUser && !loading) {
      dispatch(authActions.fetchProfileRequest());
    }
  }, [backendUser, dispatch, loading, token]);

  const renderMenuButton = (item: NavigationMenuItem) => {
    const isActive = item.path ? item.path === location.pathname : activeBottomItemId === item.id;

    return (
      <button
        key={item.id}
        type="button"
        className={`platform-menu-button ${isActive ? "active" : ""}`}
        onClick={() => {
          if (item.path) return void navigate(item.path);
          if (item.id === "logout") {
            dispatch(authActions.logout());
            return void navigate("/login");
          }
          dispatch(navigationActions.setActiveBottomItemId(item.id));
        }}
      >
        <span className="platform-button-inner">
          <PlatformIcon name={item.icon} />
          <span>{item.label}</span>
        </span>
      </button>
    );
  };

  return (
    <main className="platform-page">
      <aside className="platform-sidebar" aria-label="Навигация платформы">
        <section className="platform-sidebar-block platform-sidebar-top">
          <div className="platform-logo-frame"><span className="platform-wordmark">KTST<span>hack</span></span></div>
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
            <PlatformSearchControl />

            <button type="button" className="platform-round-button" aria-label="Уведомления"><PlatformIcon name="bell" /></button>
          </div>
          <div className="platform-user-card">
            <div className="platform-user-text">
              <strong>{user.lastName} {user.firstName}</strong>
              <span>{user.email}</span>
            </div>
            <img className="platform-avatar" src={avatarSrc} alt={`${user.lastName} ${user.firstName}`} onError={() => setIsAvatarBroken(true)} />
          </div>
        </header>

        <div className="profile-dashboard-shell">
          <section className="profile-dashboard">
            <article className="profile-panel profile-panel-user">
              <img
                className="profile-panel-avatar"
                src={avatarSrc}
                alt={`${user.lastName} ${user.firstName}`}
                onError={() => setIsAvatarBroken(true)}
              />
              <div className="profile-panel-user-text">
                <h2>{user.lastName} {user.firstName}</h2>
                <p>{user.email}</p>
              </div>
              <button
                type="button"
                className="profile-action-button"
                onClick={() => navigate("/profile/edit")}
              >
                Редактировать профиль
              </button>
            </article>

            <article className="profile-panel profile-panel-about">
              <h2>О себе</h2>
              <div className="profile-about-content">
                {user.description?.trim() || "В backend пока нет поля описания, поэтому здесь пока показываются только реальные данные профиля."}
              </div>
            </article>

            <article className="profile-panel profile-panel-skills">
              <h2>Навыки</h2>
              {hasAnySkills ? (
                <div className="profile-skills-overview">
                  {([false, true] as const).map((softSkills) => {
                    const skills = profileSkills.filter((item) => isSoftSkillCategory(item.skill.category) === softSkills);
                    if (skills.length === 0) return null;

                    return (
                      <section key={softSkills ? "soft" : "hard"} className="profile-skills-group">
                        <h3>{softSkills ? "Soft-skills" : "Hard-skills"}</h3>
                        <div className="profile-skill-tags">
                          {skills.map((item) => (
                            <span key={`${item.skill.id}-${item.id}`} className="profile-skill-tag">{item.skill.name}</span>
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <p className="profile-skill-empty">Пользователь пока не добавил навыки.</p>
              )}
            </article>

            <article className="profile-panel profile-panel-details">
              <h2>Другая информация</h2>
              <div className="profile-details-list">
                {infoItems.map((item) => (
                  <div key={item.label} className="profile-detail-row">
                    <span>{item.label}:</span>
                    {item.href && item.value !== "Не указан" ? (
                      <a className="profile-detail-link" href={item.href} target="_blank" rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <strong>{item.value}</strong>
                    )}
                  </div>
                ))}
              </div>
            </article>

            <article className="profile-panel profile-panel-projects">
              <section className="profile-project-section">
                <h2>Проекты</h2>
                <div className="profile-project-list">
                  {mockProjects.map((project) => (
                    <article key={project.id} className="profile-project-card">
                      <div className="profile-project-card-main">
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>
                        <div className="profile-project-card-meta">
                          <span className="profile-project-card-pill">{project.meta}</span>
                          <span className="profile-project-card-pill">{project.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div className="profile-project-divider" aria-hidden="true" />

              <section className="profile-project-section">
                <h2>Команда</h2>
                <div className="profile-project-list">
                  {mockTeams.map((team) => (
                    <article key={team.id} className="profile-team-card">
                      <strong>{team.name}</strong>
                      <p>{team.description}</p>
                      <div className="profile-project-card-meta">
                        <span className="profile-project-card-pill">{team.role}</span>
                        <span className="profile-project-card-pill">{team.members}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
};
