import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actions as authActions } from "../../../features/auth";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  type NavigationMenuItem,
} from "../../../features/navigation";
import logo from "../../../shared/assets/logo.png";
import { readSavedUser } from "../../../shared/lib/userProfile";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "../../achievements/ui/index.scss";
import "./index.scss";

type PlatformUserData = {
  lastName: string;
  firstName: string;
  avatar: string;
  username: string;
  email: string;
  code: string;
};

const mockParticipants = [
  { id: 1, name: "Анна Смирнова", role: "Frontend-разработчик" },
  { id: 2, name: "Илья Петров", role: "Backend-разработчик" },
  { id: 3, name: "София Иванова", role: "UX/UI-разработчик" },
  { id: 4, name: "Максим Волков", role: "Project Manager" },
];

const mockTeams = [
  { id: 1, name: "Pixel Pulse", members: ["АС", "ИП", "СИ"] },
  { id: 2, name: "Code Orbit", members: ["МВ", "АС", "ИП"] },
  { id: 3, name: "North Stars", members: ["СИ", "МВ", "АС"] },
  { id: 4, name: "Sprint Vision", members: ["ИП", "СИ", "МВ"] },
];

const mockEvents = [
  {
    id: 1,
    title: "Frontend Hack Day",
    description: "Интенсив по созданию современного интерфейса с работой в команде и защитой итогового решения.",
    teamSize: "5 участников",
    date: "18 мая 2026",
  },
  {
    id: 2,
    title: "Backend Intensive",
    description: "Практическое мероприятие по проектированию API, работе с базами данных и серверной логике.",
    teamSize: "4 участника",
    date: "7 июня 2026",
  },
  {
    id: 3,
    title: "UX/UI Design Sprint",
    description: "Спринт для дизайнеров с быстрым прототипированием, исследованием пользователей и презентацией концепции.",
    teamSize: "3 участника",
    date: "12 июля 2026",
  },
];

export const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useMemo(
    () => ({ ...readSavedUser(), ...(location.state as Partial<PlatformUserData> | null) }),
    [location.state],
  );
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;
  const adminTopMenuItems: NavigationMenuItem[] = [
    { id: "admin-home", label: "Главная", icon: "home", path: "/admin" },
  ];

  const renderMenuButton = (item: NavigationMenuItem) => {
    const isActive = item.path ? item.path === location.pathname : activeBottomItemId === item.id;

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
          <PlatformIcon name={item.icon} />
          <span>{item.label}</span>
        </span>
      </button>
    );
  };

  return (
    <main className="platform-page">
      <aside className="platform-sidebar">
        <section className="platform-sidebar-block platform-sidebar-top">
          <div className="platform-logo-frame">
            <img src={logo} alt="KTSThub" />
          </div>
          <nav className="platform-menu">
            {adminTopMenuItems.map(renderMenuButton)}
          </nav>
        </section>

        <section className="platform-sidebar-block platform-sidebar-bottom">
          <nav className="platform-menu">
            {bottomMenuItems.map(renderMenuButton)}
          </nav>
        </section>
      </aside>

      <section className="platform-workspace">
        <header className="platform-header">
          <div className="platform-content-pill">
            <span>Администратор</span>
          </div>

          <div className="platform-search-group">
            <label className="platform-search" aria-label="Поиск">
              <input type="search" placeholder="Поиск" />
              <span className="platform-round-button">
                <PlatformIcon name="search" />
              </span>
            </label>
            <button type="button" className="platform-round-button" aria-label="Избранное">
              <PlatformIcon name="favorite" />
            </button>
            <button type="button" className="platform-round-button" aria-label="Уведомления">
              <PlatformIcon name="bell" />
            </button>
          </div>

          <div className="platform-user-card">
            <div className="platform-user-text">
              <strong>{user.lastName} {user.firstName}</strong>
              <span>{user.email}</span>
            </div>
            <img
              className="platform-avatar"
              src={avatarSrc}
              alt={`${user.lastName} ${user.firstName}`}
              onError={() => setIsAvatarBroken(true)}
            />
          </div>
        </header>

        <section className="admin-dashboard-card">
          <section className="admin-dashboard-grid">
            <article className="admin-panel admin-panel-schedule">
              <div className="admin-panel-pill">
                <h2>Расписание событий</h2>
              </div>
              <button
                type="button"
                className="admin-create-event-card"
                onClick={() => setIsCreateEventModalOpen(true)}
                >
                  <span className="admin-create-event-inner">
                    <span className="admin-create-event-plus" aria-hidden="true">+</span>
                    <span className="admin-create-event-label">Создать мероприятие</span>
                  </span>
              </button>
              <div className="admin-schedule-divider" aria-hidden="true" />
              <div className="admin-schedule-toolbar">
                <div className="admin-schedule-filters">
                  <button type="button" className="admin-filter-chip">
                    <span>Все</span>
                    <span className="admin-filter-arrow" aria-hidden="true">
                      <span className="admin-filter-arrow-icon" />
                    </span>
                  </button>
                  <button type="button" className="admin-filter-chip">
                    <span>Месяц</span>
                    <span className="admin-filter-arrow" aria-hidden="true">
                      <span className="admin-filter-arrow-icon" />
                    </span>
                  </button>
                  <button type="button" className="admin-filter-chip">
                    <span>Сезон</span>
                    <span className="admin-filter-arrow" aria-hidden="true">
                      <span className="admin-filter-arrow-icon" />
                    </span>
                  </button>
                  <button type="button" className="admin-filter-chip">
                    <span>Уровень</span>
                    <span className="admin-filter-arrow" aria-hidden="true">
                      <span className="admin-filter-arrow-icon" />
                    </span>
                  </button>
                  <button type="button" className="admin-filter-chip">
                    <span>Профиль</span>
                    <span className="admin-filter-arrow" aria-hidden="true">
                      <span className="admin-filter-arrow-icon" />
                    </span>
                  </button>
                </div>
                <label className="admin-schedule-search" aria-label="Поиск мероприятий">
                  <input type="search" placeholder="Поиск" />
                </label>
              </div>
              <section className="admin-events-list" aria-label="Мероприятия администратора">
                {mockEvents.map((event) => (
                  <article key={event.id} className="admin-event-card">
                    <div className="admin-event-image" aria-hidden="true" />
                    <div className="admin-event-main">
                      <strong>{event.title}</strong>
                      <p>{event.description}</p>
                      <div className="admin-event-meta">
                        <span className="admin-event-meta-card">{event.teamSize}</span>
                        <span className="admin-event-meta-card">{event.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </article>
            <article className="admin-panel admin-panel-participants">
              <div className="admin-panel-topbar">
                <div className="admin-panel-pill">
                  <h2>Список участников</h2>
                </div>
                <label className="admin-panel-search" aria-label="Поиск участников">
                  <input type="search" placeholder="Поиск" />
                </label>
              </div>
              <section className="admin-participants-list" aria-label="Список участников">
                {mockParticipants.map((participant) => (
                  <article key={participant.id} className="admin-participant-card">
                    <div className="admin-participant-avatar" aria-hidden="true">
                      {participant.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="admin-participant-info">
                      <strong>{participant.name}</strong>
                    </div>
                    <span className="admin-participant-role">{participant.role}</span>
                    <button type="button" className="admin-participant-more" aria-label={`Действия для ${participant.name}`}>
                      <span />
                      <span />
                      <span />
                    </button>
                  </article>
                ))}
              </section>
            </article>
            <article className="admin-panel admin-panel-teams">
              <div className="admin-panel-topbar">
                <div className="admin-panel-pill">
                  <h2>Список команд</h2>
                </div>
                <label className="admin-panel-search" aria-label="Поиск команд">
                  <input type="search" placeholder="Поиск" />
                </label>
              </div>
              <section className="admin-teams-list" aria-label="Список команд">
                {mockTeams.map((team) => (
                  <article key={team.id} className="admin-team-card">
                    <div className="admin-team-avatars" aria-label={`Участники команды ${team.name}`}>
                      {team.members.map((member, index) => (
                        <span
                          key={`${team.id}-${member}-${index}`}
                          className="admin-team-avatar"
                          style={{ zIndex: team.members.length - index }}
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                    <strong className="admin-team-name">{team.name}</strong>
                    <button type="button" className="admin-team-more" aria-label={`Подробнее о команде ${team.name}`}>
                      <span className="admin-team-more-arrow" aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </section>
            </article>
          </section>
        </section>
        {isCreateEventModalOpen ? (
          <div
            className="admin-modal-overlay"
            role="presentation"
            onClick={() => setIsCreateEventModalOpen(false)}
          >
            <section
              className="admin-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-create-event-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="admin-modal-close"
                aria-label="Закрыть окно создания мероприятия"
                onClick={() => setIsCreateEventModalOpen(false)}
              >
                ×
              </button>
              <div className="admin-modal-body">
                <h2 id="admin-create-event-modal-title">РЎРѕР·РґР°РЅРёРµ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ</h2>
              </div>
            </section>
          </div>
        ) : null}
      </section>
    </main>
  );
};
