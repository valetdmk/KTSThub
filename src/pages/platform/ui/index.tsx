import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthFeature, actions as authActions } from "../../../features/auth";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  topMenuItems,
  type NavigationMenuItem,
} from "../../../features/navigation";
import { mapBackendUserToPlatformUser } from "../../../shared/lib/userProfile";
import logo from "../../../shared/assets/logo.png";
import platformBack from "../../../shared/assets/platformBack.png";
import titleproject from "../../../shared/assets/titleproject.png";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

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

function getProjectLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return "проектов";
  }

  if (mod10 === 1) {
    return "проект";
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return "проекта";
  }

  return "проектов";
}

function getCalendarDays(viewDate: Date) {
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
}

export function PlatformPage() {
  const totalProjects = 3;
  const projectPlaceholders = [
    {
      company: "TechNova",
      title: "Хакатон по продуктовой аналитике",
      description: "Заглушка: здесь будет краткая информация о мероприятии и сроках участия.",
    },
    {
      company: "FutureSoft",
      title: "AI Product Sprint",
      description: "Заглушка: здесь появится описание проекта, требований и формата участия.",
    },
  ];
  const activeProjects = [
    {
      company: "TechNova",
      title: "Хакатон по продуктовой аналитике",
      description: "Заглушка: карточка текущего мероприятия пользователя.",
      teamName: "Команда Alpha",
      teammates: ["АБ", "МС", "ИК"],
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user: backendUser, loading } = useSelector(AuthFeature.selectors.root);
  const user = useMemo(() => mapBackendUserToPlatformUser(backendUser), [backendUser]);
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const [isPointsDetailsOpen, setIsPointsDetailsOpen] = useState(false);
  const [projectCalendarViewDate, setProjectCalendarViewDate] = useState(() => new Date());
  const [selectedProjectDate, setSelectedProjectDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[1];
  const activeBottomItem = bottomMenuItems.find((item) => item.id === activeBottomItemId) ?? bottomMenuItems[0];
  const activeItem = activeTopItem ?? activeBottomItem;
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;
  const projectsCompleted = Math.max(0, Math.min(user.projectsCount ?? 0, totalProjects));
  const projectsRemaining = Math.max(totalProjects - projectsCompleted, 0);
  const progressPercent = Math.round((projectsCompleted / totalProjects) * 100);
  const userPoints = Math.max(0, user.points ?? 0);

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
    <main className="platform-home-page">
      <div className="platform-page">
        <aside className="platform-sidebar" aria-label="Навигация платформы">
          <section className="platform-sidebar-block platform-sidebar-top">
            <div className="platform-logo-frame">
              <img src={logo} alt="KTSThub" />
            </div>
            <nav className="platform-menu">
              {topMenuItems.map(renderMenuButton)}
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
              <span>{activeItem.label}</span>
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

          <section className="platform-top-content">
            <section className="platform-hero">
              <img className="platform-hero-image" src={platformBack} alt="Platform background" />
            </section>

            <div className="platform-side-column">
              <aside className="platform-projects-panel" aria-label="Актуальные проекты">
                <div className="platform-projects-title">
                  <img src={titleproject} alt="" aria-hidden="true" />
                  <h2>Проекты</h2>
                </div>
                <div className="platform-projects-list">
                  {projectPlaceholders.map((project) => (
                    <article key={`${project.company}-${project.title}`} className="platform-project-entry">
                      <span className="platform-project-company">{project.company}</span>
                      <button
                        type="button"
                        className="platform-project-card"
                        onClick={() => navigate("/projects")}
                      >
                        <strong>{project.title}</strong>
                        <span>{project.description}</span>
                      </button>
                    </article>
                  ))}
                </div>
              </aside>

              <section className="platform-project-calendar" aria-label="Календарь проектов">
                <div className="platform-project-calendar-header">
                  <div className="platform-calendar-period-controls">
                    <span className="platform-calendar-period">
                      {calendarMonthNames[projectCalendarViewDate.getMonth()]}
                    </span>
                    <span className="platform-calendar-period">
                      {projectCalendarViewDate.getFullYear()}
                    </span>
                  </div>

                  <div className="platform-calendar-nav-group">
                    <button
                      type="button"
                      className="platform-calendar-nav"
                      onClick={() => setProjectCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                      aria-label="Предыдущий месяц"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="platform-calendar-nav"
                      onClick={() => setProjectCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                      aria-label="Следующий месяц"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="platform-calendar-weekdays">
                  {calendarWeekDays.map((weekDay) => (
                    <span key={weekDay} className="platform-calendar-weekday">{weekDay}</span>
                  ))}
                </div>

                <div className="platform-calendar-grid">
                  {getCalendarDays(projectCalendarViewDate).map((date, index) => {
                    if (!date) {
                      return <span key={`empty-${index}`} className="platform-calendar-day-empty" aria-hidden="true" />;
                    }

                    const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                    const isSelected = selectedProjectDate === isoDate;

                    return (
                      <button
                        key={isoDate}
                        type="button"
                        className={`platform-calendar-day${isSelected ? " selected" : ""}`}
                        onClick={() => setSelectedProjectDate(isoDate)}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </section>

          <section className="platform-lower-content">
            <section className="platform-stats-grid">
              <article className="platform-stat-card">
                <div className="platform-stat-copy">
                  <h2>Прогресс<br />статуса</h2>
                  <p className="platform-stat-line">
                    <strong>Было участие:</strong>
                    <span className="platform-project-badge">
                      {projectsCompleted} {getProjectLabel(projectsCompleted)}
                    </span>
                  </p>
                  <p className="platform-stat-line">
                    <strong>Осталось:</strong>
                    <span className="platform-project-badge">
                      {projectsRemaining} {getProjectLabel(projectsRemaining)}
                    </span>
                  </p>
                </div>
                <div
                  className="platform-progress-ring"
                  style={{ "--progress": `${progressPercent}%` } as CSSProperties}
                  aria-label={`Прогресс участия ${progressPercent}%`}
                >
                  <div className="platform-progress-ring-inner">
                    <strong>{progressPercent}%</strong>
                  </div>
                </div>
              </article>

              <article className="platform-stat-card platform-stat-card-points">
                <div className="platform-stat-copy">
                  <h2>Ваши баллы</h2>
                  {isPointsDetailsOpen ? (
                    <>
                      <button
                        type="button"
                        className="platform-details-button"
                        onClick={() => setIsPointsDetailsOpen(false)}
                      >
                        <span aria-hidden="true">←</span>
                        назад
                      </button>
                      <div className="platform-points-placeholder">
                        Раздел с подробной аналитикой баллов появится в следующих обновлениях.
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Обновление баллов происходит благодаря участию в Хакатонах и оценки ваших проектов.</p>
                      <button
                        type="button"
                        className="platform-details-button"
                        onClick={() => setIsPointsDetailsOpen(true)}
                      >
                        подробнее
                        <span aria-hidden="true">→</span>
                      </button>
                    </>
                  )}
                </div>
                <div className="platform-points-ring" aria-label={`Баллы пользователя ${userPoints}`}>
                  <div className="platform-points-ring-inner">
                    <strong>{userPoints}</strong>
                  </div>
                </div>
              </article>
            </section>

            <section className="platform-active-projects" aria-label="Текущие проекты пользователя">
              <div className="platform-active-projects-head">
                <h2>Проекты</h2>
                <p>
                  Предупреждение: страницы формирования команд и выбора мероприятия пока не реализованы,
                  поэтому ниже показана временная заглушка.
                </p>
              </div>

              <div className="platform-active-projects-list">
                {activeProjects.map((project) => (
                  <article
                    key={`${project.company}-${project.title}-active`}
                    className="platform-active-project-card"
                  >
                    <div className="platform-active-event">
                      <span className="platform-active-company">{project.company}</span>
                      <button
                        type="button"
                        className="platform-active-event-card"
                        onClick={() => navigate("/projects")}
                      >
                        <strong>{project.title}</strong>
                        <span>{project.description}</span>
                      </button>
                    </div>

                    <div className="platform-active-stages" aria-label="Этапы проекта">
                      <div className="platform-active-stage">
                        <span className="platform-active-stage-number">1 этап</span>
                        <strong>Старт Хакатона</strong>
                      </div>
                      <div className="platform-active-stage-divider" aria-hidden="true" />
                      <div className="platform-active-stage">
                        <span className="platform-active-stage-number">2 этап</span>
                        <strong>Процесс Создания</strong>
                      </div>
                      <div className="platform-active-stage-divider" aria-hidden="true" />
                      <div className="platform-active-stage">
                        <span className="platform-active-stage-number">3 этап</span>
                        <strong>Финиш Хакатона</strong>
                      </div>
                    </div>

                    <div className="platform-active-team">
                      <span className="platform-active-team-name">{project.teamName}</span>
                      <div className="platform-active-team-row">
                        <div className="platform-active-team-avatars" aria-label="Состав команды">
                          {project.teammates.map((teammate) => (
                            <span key={teammate} className="platform-active-team-avatar">
                              {teammate}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="platform-active-team-button"
                          onClick={() => navigate("/projects")}
                        >
                          подробнее
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}
