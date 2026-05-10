import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actions as authActions, AuthFeature } from "../../../features/auth";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  topMenuItems,
  type NavigationMenuItem,
} from "../../../features/navigation";
import { mapBackendUserToPlatformUser } from "../../../shared/lib/userProfile";
import logo from "../../../shared/assets/logo.png";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

type InfoItem = {
  label: string;
  value: string;
};

const projectTags = ["Hackathon", "Frontend", "Design System", "MVP", "Команда", "Портфолио"];

function formatDate(date: string) {
  if (!date) return "Не указана";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("ru-RU").format(parsedDate);
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
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;
  const infoItems: InfoItem[] = [
    { label: "Возраст", value: user.age?.trim() || "Не указан" },
    { label: "Дата рождения", value: formatDate(user.birthday ?? "") },
    { label: "Телефон", value: user.phone?.trim() || "Не указан" },
    { label: "Telegram", value: user.social?.trim() || "Не указан" },
    { label: "Роль", value: user.role?.trim() || "Не указана" },
    { label: "Статус", value: user.status?.trim() || "Не указан" },
    { label: "Направление", value: user.job?.trim() || "Не указано" },
    { label: "Уровень", value: user.level?.trim() || "Не указан" },
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
              <span className="platform-round-button"><PlatformIcon name="search" /></span>
            </label>
            <button type="button" className="platform-round-button" aria-label="Избранное"><PlatformIcon name="favorite" /></button>
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

        <section className="profile-dashboard">
          <div className="profile-info-grid">
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

            <article className="profile-panel profile-panel-details">
              <h2>Данные</h2>
              <div className="profile-details-list">
                {infoItems.map((item) => (
                  <div key={item.label} className="profile-detail-row">
                    <span>{item.label}:</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="profile-panel profile-panel-about">
              <h2>О себе...</h2>
              <div className="profile-about-content">
                {user.description?.trim() || "В backend пока нет поля описания, поэтому здесь показываются только реальные данные профиля."}
              </div>
            </article>
          </div>

          <article className="profile-panel profile-panel-projects">
            <h2>Проекты</h2>
            <div className="profile-project-tags">
              {projectTags.map((tag) => (
                <span key={tag} className="profile-project-tag">{tag}</span>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};




