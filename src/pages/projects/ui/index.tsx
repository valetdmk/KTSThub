import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../../app/store/hooks";
import {
  actions as navigationActions,
  bottomMenuItems,
  selectors as navigationSelectors,
  topMenuItems,
  type NavigationMenuItem,
} from "../../../features/navigation";
import logo from "../../../shared/assets/logo.png";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

type PlatformUserData = { lastName: string; firstName: string; avatar: string; username: string; email: string; code: string; };
const fallbackUser: PlatformUserData = { lastName: "User", firstName: "Guest", avatar: logo, username: "", email: "email@example.com", code: "" };

function readSavedUser() {
  const savedUser = localStorage.getItem("platformUser");
  if (!savedUser) return fallbackUser;
  try {
    return { ...fallbackUser, ...JSON.parse(savedUser) } as PlatformUserData;
  } catch {
    return fallbackUser;
  }
}
export const ProjectsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useMemo(() => ({ ...readSavedUser(), ...(location.state as Partial<PlatformUserData> | null) }), [location.state]);
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[3];
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;
  const renderMenuButton = (item: NavigationMenuItem) => <button key={item.id} type="button" className={`platform-menu-button ${(item.path ? item.path === location.pathname : activeBottomItemId === item.id) ? "active" : ""}`} onClick={() => { if (item.path) return void navigate(item.path); if (item.id === "logout") return void navigate("/login"); dispatch(navigationActions.setActiveBottomItemId(item.id)); }}><span className="platform-button-inner"><PlatformIcon name={item.icon} /><span>{item.label}</span></span></button>;

  return <main className="platform-page"><aside className="platform-sidebar" aria-label="Навигация платформы"><section className="platform-sidebar-block platform-sidebar-top"><div className="platform-logo-frame"><img src={logo} alt="KTSThub" /></div><nav className="platform-menu">{topMenuItems.map(renderMenuButton)}</nav></section><section className="platform-sidebar-block platform-sidebar-bottom"><nav className="platform-menu">{bottomMenuItems.map(renderMenuButton)}</nav></section></aside><section className="platform-workspace"><header className="platform-header"><div className="platform-content-pill"><span>{activeTopItem.label}</span></div><div className="platform-search-group"><label className="platform-search" aria-label="Поиск"><input type="search" placeholder="Поиск" /><span className="platform-round-button"><PlatformIcon name="search" /></span></label><button type="button" className="platform-round-button" aria-label="Избранное"><PlatformIcon name="favorite" /></button><button type="button" className="platform-round-button" aria-label="Уведомления"><PlatformIcon name="bell" /></button></div><div className="platform-user-card"><div className="platform-user-text"><strong>{user.lastName} {user.firstName}</strong><span>{user.email}</span></div><img className="platform-avatar" src={avatarSrc} alt={`${user.lastName} ${user.firstName}`} onError={() => setIsAvatarBroken(true)} /></div></header><section className="page-placeholder-card"><h1>Проекты</h1><p>Здесь будут собраны проектные команды, трекеры задач, прогресс по хакатонам и активные продуктовые направления.</p></section></section></main>;
};




