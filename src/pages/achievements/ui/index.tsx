import { useMemo, useState } from "react";
import type { ReactNode } from "react";
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
import { readSavedUser } from "../../../shared/lib/userProfile";
import type { PlatformIconName } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

type PlatformUserData = { lastName: string; firstName: string; avatar: string; username: string; email: string; code: string; };
type IconName = PlatformIconName;

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
  return <svg className="platform-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="platformActiveGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#9605CA" /><stop offset="1" stopColor="#FF5100" /></linearGradient></defs><g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</g></svg>;
}

export const Achievements = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useMemo(() => ({ ...readSavedUser(), ...(location.state as Partial<PlatformUserData> | null) }), [location.state]);
  const activeBottomItemId = useSelector(navigationSelectors.selectActiveBottomItemId);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[5];
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;
  const renderMenuButton = (item: NavigationMenuItem) => <button key={item.id} type="button" className={`platform-menu-button ${(item.path ? item.path === location.pathname : activeBottomItemId === item.id) ? "active" : ""}`} onClick={() => { if (item.path) return void navigate(item.path); if (item.id === "logout") { dispatch(authActions.logout()); return void navigate("/login"); } dispatch(navigationActions.setActiveBottomItemId(item.id)); }}><span className="platform-button-inner"><Icon name={item.icon} /><span>{item.label}</span></span></button>;

  return <main className="platform-page"><aside className="platform-sidebar"><section className="platform-sidebar-block platform-sidebar-top"><div className="platform-logo-frame"><img src={logo} alt="KTSThub" /></div><nav className="platform-menu">{topMenuItems.map(renderMenuButton)}</nav></section><section className="platform-sidebar-block platform-sidebar-bottom"><nav className="platform-menu">{bottomMenuItems.map(renderMenuButton)}</nav></section></aside><section className="platform-workspace"><header className="platform-header"><div className="platform-content-pill"><span>{activeTopItem.label}</span></div><div className="platform-search-group"><label className="platform-search" aria-label="РџРѕРёСЃРє"><input type="search" placeholder="РџРѕРёСЃРє" /><span className="platform-round-button"><Icon name="search" /></span></label><button type="button" className="platform-round-button"><Icon name="favorite" /></button><button type="button" className="platform-round-button"><Icon name="bell" /></button></div><div className="platform-user-card"><div className="platform-user-text"><strong>{user.lastName} {user.firstName}</strong><span>{user.email}</span></div><img className="platform-avatar" src={avatarSrc} alt={`${user.lastName} ${user.firstName}`} onError={() => setIsAvatarBroken(true)} /></div></header><section className="page-placeholder-card"></section></section></main>;
};
