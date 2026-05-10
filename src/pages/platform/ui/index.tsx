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
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

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

export function PlatformPage() {
  const totalProjects = 3;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user: backendUser, loading } = useSelector(AuthFeature.selectors.root);
  const user = useMemo(() => mapBackendUserToPlatformUser(backendUser), [backendUser]);
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const [isPointsDetailsOpen, setIsPointsDetailsOpen] = useState(false);
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

          <section className="platform-hero">
            <img className="platform-hero-image" src={platformBack} alt="Platform background" />
          </section>

          <section className="platform-stats-grid">
            <article className="platform-stat-card">
              <div className="platform-stat-copy">
                <h2>Прогресс статуса</h2>
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
                <p>Обновление баллов происходит благодаря участию в Хакатонах и оценки ваших проектов.</p>
                <button
                  type="button"
                  className="platform-details-button"
                  onClick={() => setIsPointsDetailsOpen((value) => !value)}
                >
                  подробнее
                  <span aria-hidden="true">→</span>
                </button>
                <div className={`platform-points-placeholder-slot ${isPointsDetailsOpen ? "open" : ""}`}>
                  <div className="platform-points-placeholder">
                    Раздел с подробной аналитикой баллов появится в следующих обновлениях.
                  </div>
                </div>
              </div>
              <div className="platform-points-ring" aria-label={`Баллы пользователя ${userPoints}`}>
                <div className="platform-points-ring-inner">
                  <strong>{userPoints}</strong>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}
