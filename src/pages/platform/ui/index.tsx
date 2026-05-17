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
import wayPlatform from "../../../shared/assets/wayPlatform.png";
import { PlatformIcon } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

function getProjectLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return "РїСЂРѕРµРєС‚РѕРІ";
  }

  if (mod10 === 1) {
    return "РїСЂРѕРµРєС‚";
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return "РїСЂРѕРµРєС‚Р°";
  }

  return "РїСЂРѕРµРєС‚РѕРІ";
}
export function PlatformPage() {
  const totalProjects = 3;
  const activeProjects = [
    {
      company: "TechNova",
      title: "РҐР°РєР°С‚РѕРЅ РїРѕ РїСЂРѕРґСѓРєС‚РѕРІРѕР№ Р°РЅР°Р»РёС‚РёРєРµ",
      description: "Р—Р°РіР»СѓС€РєР°: РєР°СЂС‚РѕС‡РєР° С‚РµРєСѓС‰РµРіРѕ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ.",
      teamName: "РљРѕРјР°РЅРґР° Alpha",
      teammates: ["РђР‘", "РњРЎ", "РРљ"],
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
        <aside className="platform-sidebar" aria-label="РќР°РІРёРіР°С†РёСЏ РїР»Р°С‚С„РѕСЂРјС‹">
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
              <label className="platform-search" aria-label="РџРѕРёСЃРє">
                <input type="search" placeholder="РџРѕРёСЃРє" />
                <span className="platform-round-button">
                  <PlatformIcon name="search" />
                </span>
              </label>
              <button type="button" className="platform-round-button" aria-label="РР·Р±СЂР°РЅРЅРѕРµ">
                <PlatformIcon name="favorite" />
              </button>
              <button type="button" className="platform-round-button" aria-label="РЈРІРµРґРѕРјР»РµРЅРёСЏ">
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
              <img className="platform-hero-image" src={wayPlatform} alt="Platform background" />
            </section>
          </section>

          <div className="platform-bottom-stack">
            <section className="platform-lower-content">
              <section className="platform-stats-grid">
                <article className="platform-stat-card">
                  <div className="platform-stat-copy">
                    <h2>РџСЂРѕРіСЂРµСЃСЃ<br />СЃС‚Р°С‚СѓСЃР°</h2>
                    <p className="platform-stat-line">
                      <strong>Р‘С‹Р»Рѕ СѓС‡Р°СЃС‚РёРµ:</strong>
                      <span className="platform-project-badge">
                        {projectsCompleted} {getProjectLabel(projectsCompleted)}
                      </span>
                    </p>
                    <p className="platform-stat-line">
                      <strong>РћСЃС‚Р°Р»РѕСЃСЊ:</strong>
                      <span className="platform-project-badge">
                        {projectsRemaining} {getProjectLabel(projectsRemaining)}
                      </span>
                    </p>
                  </div>
                  <div
                    className="platform-progress-ring"
                    style={{ "--progress": `${progressPercent}%` } as CSSProperties}
                    aria-label={`РџСЂРѕРіСЂРµСЃСЃ СѓС‡Р°СЃС‚РёСЏ ${progressPercent}%`}
                  >
                    <div className="platform-progress-ring-inner">
                      <strong>{progressPercent}%</strong>
                    </div>
                  </div>
                </article>

                <article className="platform-stat-card platform-stat-card-points">
                  <div className="platform-stat-copy">
                    <h2>Р’Р°С€Рё Р±Р°Р»Р»С‹</h2>
                    {isPointsDetailsOpen ? (
                      <>
                        <button
                          type="button"
                          className="platform-details-button"
                          onClick={() => setIsPointsDetailsOpen(false)}
                        >
                          <span aria-hidden="true">в†ђ</span>
                          РЅР°Р·Р°Рґ
                        </button>
                        <div className="platform-points-placeholder">
                          Р Р°Р·РґРµР» СЃ РїРѕРґСЂРѕР±РЅРѕР№ Р°РЅР°Р»РёС‚РёРєРѕР№ Р±Р°Р»Р»РѕРІ РїРѕСЏРІРёС‚СЃСЏ РІ СЃР»РµРґСѓСЋС‰РёС… РѕР±РЅРѕРІР»РµРЅРёСЏС….
                        </div>
                      </>
                    ) : (
                      <>
                        <p>РћР±РЅРѕРІР»РµРЅРёРµ Р±Р°Р»Р»РѕРІ РїСЂРѕРёСЃС…РѕРґРёС‚ Р±Р»Р°РіРѕРґР°СЂСЏ СѓС‡Р°СЃС‚РёСЋ РІ РҐР°РєР°С‚РѕРЅР°С… Рё РѕС†РµРЅРєРё РІР°С€РёС… РїСЂРѕРµРєС‚РѕРІ.</p>
                        <button
                          type="button"
                          className="platform-details-button"
                          onClick={() => setIsPointsDetailsOpen(true)}
                        >
                          РїРѕРґСЂРѕР±РЅРµРµ
                          <span aria-hidden="true">в†’</span>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="platform-points-ring" aria-label={`Р‘Р°Р»Р»С‹ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ ${userPoints}`}>
                    <div className="platform-points-ring-inner">
                      <strong>{userPoints}</strong>
                    </div>
                  </div>
                </article>
              </section>
            </section>

            <section className="platform-active-projects" aria-label="РўРµРєСѓС‰РёРµ РїСЂРѕРµРєС‚С‹ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ">
              <div className="platform-active-projects-head">
                <h2>РџСЂРѕРµРєС‚С‹</h2>
                <p>
                  РџСЂРµРґСѓРїСЂРµР¶РґРµРЅРёРµ: СЃС‚СЂР°РЅРёС†С‹ С„РѕСЂРјРёСЂРѕРІР°РЅРёСЏ РєРѕРјР°РЅРґ Рё РІС‹Р±РѕСЂР° РјРµСЂРѕРїСЂРёСЏС‚РёСЏ РїРѕРєР° РЅРµ СЂРµР°Р»РёР·РѕРІР°РЅС‹,
                  РїРѕСЌС‚РѕРјСѓ РЅРёР¶Рµ РїРѕРєР°Р·Р°РЅР° РІСЂРµРјРµРЅРЅР°СЏ Р·Р°РіР»СѓС€РєР°.
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

                    <div className="platform-active-stages" aria-label="Р­С‚Р°РїС‹ РїСЂРѕРµРєС‚Р°">
                      <div className="platform-active-stage">
                        <span className="platform-active-stage-number">1 СЌС‚Р°Рї</span>
                        <strong>РЎС‚Р°СЂС‚ РҐР°РєР°С‚РѕРЅР°</strong>
                      </div>
                      <div className="platform-active-stage-divider" aria-hidden="true" />
                      <div className="platform-active-stage">
                        <span className="platform-active-stage-number">2 СЌС‚Р°Рї</span>
                        <strong>РџСЂРѕС†РµСЃСЃ РЎРѕР·РґР°РЅРёСЏ</strong>
                      </div>
                      <div className="platform-active-stage-divider" aria-hidden="true" />
                      <div className="platform-active-stage">
                        <span className="platform-active-stage-number">3 СЌС‚Р°Рї</span>
                        <strong>Р¤РёРЅРёС€ РҐР°РєР°С‚РѕРЅР°</strong>
                      </div>
                    </div>

                    <div className="platform-active-team">
                      <span className="platform-active-team-name">{project.teamName}</span>
                      <div className="platform-active-team-row">
                        <div className="platform-active-team-avatars" aria-label="РЎРѕСЃС‚Р°РІ РєРѕРјР°РЅРґС‹">
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
                          РїРѕРґСЂРѕР±РЅРµРµ
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
