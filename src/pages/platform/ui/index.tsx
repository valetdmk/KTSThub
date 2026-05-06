import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../app/store/hooks";
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
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

export function PlatformPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user: backendUser, loading } = useSelector(AuthFeature.selectors.root);
  const user = useMemo(() => mapBackendUserToPlatformUser(backendUser), [backendUser]);
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[1];
  const activeBottomItem = bottomMenuItems.find((item) => item.id === activeBottomItemId) ?? bottomMenuItems[0];
  const activeItem = activeTopItem ?? activeBottomItem;
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;

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
    <main className="platform-page">
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
      </section>
    </main>
  );
}




