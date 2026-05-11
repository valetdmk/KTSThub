import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actions as authActions } from "../../../features/auth";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  topMenuItems,
  type NavigationMenuItem,
} from "../../../features/navigation";
import logo from "../../../shared/assets/logo.png";
import { readSavedUser, type PlatformUserData } from "../../../shared/lib/userProfile";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import usersBack from "../../../shared/assets/UsersBack.png";
import "./index.scss";

type ParticipantView = "all" | "level" | "role";

type Participant = {
  id: number;
  rank: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  title: string;
  role: string;
  level: string;
  projectsCount: number;
};

const tabs: Array<{ id: ParticipantView; label: string }> = [
  { id: "all", label: "Все участники" },
  { id: "level", label: "По уровню" },
  { id: "role", label: "Роли" },
];

const firstNames = [
  "Алексей", "Мария", "Илья", "София", "Даниил", "Екатерина", "Максим", "Анна", "Никита", "Полина",
  "Арсений", "Виктория", "Егор", "Дарья", "Тимур", "Алина", "Роман", "Ева", "Матвей", "Ксения",
  "Кирилл", "Лилия", "Павел", "Арина", "Степан", "Таисия", "Михаил", "Вероника", "Глеб", "Ольга",
];

const lastNames = [
  "Иванов", "Смирнова", "Кузнецов", "Попова", "Васильев", "Соколова", "Петров", "Морозова", "Волков", "Лебедева",
  "Семенов", "Новикова", "Федоров", "Козлова", "Николаев", "Павлова", "Орлов", "Андреева", "Зайцев", "Беляева",
  "Тарасов", "Громова", "Борисов", "Жукова", "Макаров", "Фролова", "Гусев", "Медведева", "Комаров", "Ершова",
];

const levels = ["Beginner", "Junior", "Middle", "Advanced", "Lead"];
const roles = ["Frontend", "Backend", "UX/UI", "Project Manager", "Designer", "Gamedev"];
const titles = [
  "Лидер хакатона",
  "Лучший питчер",
  "MVP команды",
  "Призер сезона",
  "Системный стратег",
  "Мастер прототипов",
];

const participants: Participant[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  rank: index + 1,
  firstName: firstNames[index],
  lastName: lastNames[index],
  gender: index % 2 === 0 ? "муж." : "жен.",
  age: 17 + (index % 8),
  title: titles[index % titles.length],
  role: roles[index % roles.length],
  level: levels[index % levels.length],
  projectsCount: 1 + (index % 7),
}));

const participantCardClassName = (rank: number) => {
  if (rank === 1) return "participant-card first-place";
  if (rank === 2) return "participant-card second-place";
  if (rank === 3) return "participant-card third-place";
  return "participant-card default-place";
};

const participantRankClassName = (rank: number) => {
  if (rank === 1) return "participant-rank first-place";
  if (rank === 2) return "participant-rank second-place";
  if (rank === 3) return "participant-rank third-place";
  return "participant-rank default-place";
};

export const ParticipantsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useMemo(
    () => ({ ...readSavedUser(), ...(location.state as Partial<PlatformUserData> | null) }),
    [location.state],
  );
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [activeTab, setActiveTab] = useState<ParticipantView>("all");
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[4];
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;

  const visibleParticipants = useMemo(() => {
    const sorted = [...participants].sort((a, b) => a.rank - b.rank);
    if (activeTab === "level") return sorted.sort((a, b) => a.level.localeCompare(b.level)).slice(0, 30);
    if (activeTab === "role") return sorted.sort((a, b) => a.role.localeCompare(b.role)).slice(0, 30);
    return sorted.slice(0, 30);
  }, [activeTab]);

  const topParticipants = visibleParticipants.slice(0, 3);
  const otherParticipants = visibleParticipants.slice(3);

  const renderMenuButton = (item: NavigationMenuItem) => (
    <button
      key={item.id}
      type="button"
      className={`platform-menu-button ${(item.path ? item.path === location.pathname : activeBottomItemId === item.id) ? "active" : ""}`}
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

  return (
    <main className="platform-page">
      <aside className="platform-sidebar" aria-label="Навигация платформы">
        <section className="platform-sidebar-block platform-sidebar-top">
          <div className="platform-logo-frame">
            <img src={logo} alt="KTSThub" />
          </div>
          <nav className="platform-menu">{topMenuItems.map(renderMenuButton)}</nav>
        </section>
        <section className="platform-sidebar-block platform-sidebar-bottom">
          <nav className="platform-menu">{bottomMenuItems.map(renderMenuButton)}</nav>
        </section>
      </aside>

      <section className="platform-workspace">
        <header className="platform-header">
          <div className="platform-content-pill">
            <span>{activeTopItem.label}</span>
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

        <section className="participants-rating-board">
          <div className="participants-tabs" aria-label="Фильтр участников">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`participants-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="participants-frame">
            <div className="participants-scroll-area">
              <div className="participants-list" aria-label="Рейтинг участников">
                {topParticipants.map((participant) => (
                  <article key={participant.id} className={`participant-row participant-row-top top-rank-${participant.rank}`}>
                    <div className={`${participantRankClassName(participant.rank)} participant-rank-top`}>
                      № {participant.rank}
                    </div>
                    <div className="participant-top-stack">
                      <div className="participant-top-art">
                        <img src={usersBack} alt="Users" />
                      </div>
                      <div className={participantCardClassName(participant.rank)}>
                        <div className="participant-main-info">
                          <strong>{participant.lastName} {participant.firstName}, {participant.gender}, {participant.age} лет</strong>
                          <span>{participant.title}</span>
                        </div>
                        <div className="participant-meta">
                          <span>{participant.role}</span>
                          <span>{participant.projectsCount} проектов</span>
                        </div>
                        <button type="button" className="participant-invite-button">Пригласить</button>
                      </div>
                    </div>
                  </article>
                ))}

                <div className="participants-divider" />

                {otherParticipants.map((participant) => (
                  <article key={participant.id} className="participant-row">
                    <div className={participantRankClassName(participant.rank)}>
                      № {participant.rank}
                    </div>
                    <div className={participantCardClassName(participant.rank)}>
                      <div className="participant-main-info">
                        <strong>{participant.lastName} {participant.firstName}, {participant.gender}, {participant.age} лет</strong>
                        <span>{participant.title}</span>
                      </div>
                      <div className="participant-meta">
                        <span>{participant.role}</span>
                        <span>{participant.projectsCount} проектов</span>
                      </div>
                      <button type="button" className="participant-invite-button">Пригласить</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};



