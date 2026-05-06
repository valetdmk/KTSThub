import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../shared/assets/logo.png";
import { PlatformIcon, type PlatformIconName } from "../../../shared/ui/PlatformIcon";
import "./index.scss";

type PlatformUserData = {
  lastName: string;
  firstName: string;
  avatar: string;
  username: string;
  email: string;
  code: string;
};

type MenuItem = { id: string; label: string; icon: PlatformIconName; path?: string };
type EventLevel = "Начинающий" | "Средний" | "Продвинутый";
type EventProfile = "Frontend" | "Backend" | "Design" | "Project" | "Gamedev";
type EventType = "Хакатон" | "Проект" | "Воркшоп" | "Митап" | "Интенсив";
type ScheduleEvent = {
  id: number;
  title: string;
  type: EventType;
  profile: EventProfile;
  level: EventLevel;
  startDate: string;
  endDate: string;
  description: string;
};

const topMenuItems: MenuItem[] = [
  { id: "cabinet", label: "Личный кабинет", icon: "user", path: "/profile" },
  { id: "home", label: "Главная", icon: "home", path: "/platform" },
  { id: "schedule", label: "Расписание", icon: "calendar", path: "/schedule" },
  { id: "projects", label: "Проекты", icon: "projects", path: "/projects" },
  { id: "participants", label: "Участники", icon: "users", path: "/participants" },
  { id: "achievements", label: "Ачивки", icon: "award", path: "/achievements" },
];

const bottomMenuItems: MenuItem[] = [
  { id: "support", label: "Поддержка", icon: "support" },
  { id: "settings", label: "Настройки", icon: "settings" },
  { id: "logout", label: "Выйти", icon: "logout" },
];

const fallbackUser: PlatformUserData = {
  lastName: "Фамилия",
  firstName: "Имя",
  avatar: logo,
  username: "",
  email: "email@example.com",
  code: "",
};

const monthNames = [
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

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const seasonOptions = ["Зима", "Весна", "Лето", "Осень"];
const levelOptions: EventLevel[] = ["Начинающий", "Средний", "Продвинутый"];
const profileOptions: EventProfile[] = ["Frontend", "Backend", "Design", "Project", "Gamedev"];
const monthOptions = monthNames.map((label, value) => ({ label, value: String(value) }));

const currentYear = new Date().getFullYear();
const calendarYearOptions = Array.from({ length: 5 }, (_, index) => currentYear + index - 1);

const scheduleEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "KTST Spring Hack",
    type: "Хакатон",
    profile: "Frontend",
    level: "Средний",
    startDate: "2026-05-12",
    endDate: "2026-05-14",
    description: "Командный хакатон по интерфейсам, AI-инструментам и быстрым MVP.",
  },
  {
    id: 2,
    title: "Game Prototype Lab",
    type: "Проект",
    profile: "Gamedev",
    level: "Начинающий",
    startDate: "2026-05-18",
    endDate: "2026-05-25",
    description: "Недельная проектная работа над игровыми механиками и визуалом.",
  },
  {
    id: 3,
    title: "Backend Core Sprint",
    type: "Интенсив",
    profile: "Backend",
    level: "Продвинутый",
    startDate: "2026-06-03",
    endDate: "2026-06-05",
    description: "Практика по API, очередям, логированию и проектированию сервисов.",
  },
  {
    id: 4,
    title: "Design Systems Meetup",
    type: "Митап",
    profile: "Design",
    level: "Средний",
    startDate: "2026-06-11",
    endDate: "2026-06-11",
    description: "Разбор кейсов по дизайн-системам, токенам и UI-паттернам.",
  },
  {
    id: 5,
    title: "Project Track Workshop",
    type: "Воркшоп",
    profile: "Project",
    level: "Начинающий",
    startDate: "2026-07-07",
    endDate: "2026-07-09",
    description: "Воркшоп по ролям в команде, дорожным картам и управлению рисками.",
  },
  {
    id: 6,
    title: "Summer Product Hack",
    type: "Хакатон",
    profile: "Frontend",
    level: "Продвинутый",
    startDate: "2026-08-20",
    endDate: "2026-08-22",
    description: "Продуктовый хакатон с фокусом на презентацию решения и демо.",
  },
];

function readSavedUser() {
  const savedUser = localStorage.getItem("platformUser");
  if (!savedUser) return fallbackUser;
  try {
    return { ...fallbackUser, ...JSON.parse(savedUser) } as PlatformUserData;
  } catch {
    return fallbackUser;
  }
}

function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startText = `${String(start.getDate()).padStart(2, "0")} ${monthNames[start.getMonth()].toLowerCase()}`;
  const endText = `${String(end.getDate()).padStart(2, "0")} ${monthNames[end.getMonth()].toLowerCase()}`;

  return startDate === endDate ? startText : `${startText} - ${endText}`;
}

function getSeasonByMonth(month: number) {
  if (month === 11 || month <= 1) return "Зима";
  if (month >= 2 && month <= 4) return "Весна";
  if (month >= 5 && month <= 7) return "Лето";
  return "Осень";
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

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const SchedulePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useMemo(() => ({ ...readSavedUser(), ...(location.state as Partial<PlatformUserData> | null) }), [location.state]);
  const [activeBottomItemId, setActiveBottomItemId] = useState(bottomMenuItems[0].id);
  const [isAvatarBroken, setIsAvatarBroken] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date());
  const activeTopItem = topMenuItems.find((item) => item.path === location.pathname) ?? topMenuItems[2];
  const avatarSrc = !isAvatarBroken && user.avatar ? user.avatar : logo;
  const today = new Date();
  const currentMonthLabel = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;

  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    return scheduleEvents
      .filter((event) => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        const monthMatch = selectedMonth === "" || eventStart.getMonth() === Number(selectedMonth);
        const seasonMatch = selectedSeason === "" || getSeasonByMonth(eventStart.getMonth()) === selectedSeason;
        const levelMatch = selectedLevel === "" || event.level === selectedLevel;
        const profileMatch = selectedProfile === "" || event.profile === selectedProfile;
        const searchMatch = normalizedQuery === ""
          || `${event.title} ${event.type} ${event.profile} ${event.description}`.toLowerCase().includes(normalizedQuery);

        const rangeMatch = (() => {
          if (!rangeStart) {
            return true;
          }

          const start = new Date(rangeStart);
          const end = new Date(rangeEnd ?? rangeStart);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);

          return eventStart <= end && eventEnd >= start;
        })();

        return monthMatch && seasonMatch && levelMatch && profileMatch && searchMatch && rangeMatch;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [rangeEnd, rangeStart, searchValue, selectedLevel, selectedMonth, selectedProfile, selectedSeason]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return filteredEvents.filter((event) => new Date(event.endDate) >= now);
  }, [filteredEvents]);

  const visibleEvents = upcomingEvents.slice(0, 5);

  const rangeLabel = rangeStart
    ? `${formatDateRange(rangeStart, rangeEnd ?? rangeStart)}`
    : null;

  const handleResetFilters = () => {
    setSelectedMonth("");
    setSelectedSeason("");
    setSelectedLevel("");
    setSelectedProfile("");
    setSearchValue("");
    setRangeStart(null);
    setRangeEnd(null);
    setCalendarViewDate(new Date());
  };

  const handleDaySelect = (date: Date) => {
    const isoDate = toIsoDate(date);

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(isoDate);
      setRangeEnd(null);
      return;
    }

    if (new Date(isoDate) < new Date(rangeStart)) {
      setRangeStart(isoDate);
      return;
    }

    setRangeEnd(isoDate);
  };

  const renderMenuButton = (item: MenuItem) => {
    const isActive = item.path ? item.path === location.pathname : activeBottomItemId === item.id;
    return <button key={item.id} type="button" className={`platform-menu-button ${isActive ? "active" : ""}`} onClick={() => { if (item.path) return void navigate(item.path); if (item.id === "logout") return void navigate("/login"); setActiveBottomItemId(item.id); }}><span className="platform-button-inner"><PlatformIcon name={item.icon} /><span>{item.label}</span></span></button>;
  };

  return (
    <main className="platform-page">
      <aside className="platform-sidebar" aria-label="Навигация платформы">
        <section className="platform-sidebar-block platform-sidebar-top"><div className="platform-logo-frame"><img src={logo} alt="KTSThub" /></div><nav className="platform-menu">{topMenuItems.map(renderMenuButton)}</nav></section>
        <section className="platform-sidebar-block platform-sidebar-bottom"><nav className="platform-menu">{bottomMenuItems.map(renderMenuButton)}</nav></section>
      </aside>
      <section className="platform-workspace">
        <header className="platform-header">
          <div className="platform-content-pill"><span>{activeTopItem.label}</span></div>
          <div className="platform-search-group">
            <label className="platform-search" aria-label="Поиск"><input type="search" placeholder="Поиск" /><span className="platform-round-button"><PlatformIcon name="search" /></span></label>
            <button type="button" className="platform-round-button" aria-label="Избранное"><PlatformIcon name="favorite" /></button>
            <button type="button" className="platform-round-button" aria-label="Уведомления"><PlatformIcon name="bell" /></button>
          </div>
          <div className="platform-user-card"><div className="platform-user-text"><strong>{user.lastName} {user.firstName}</strong><span>{user.email}</span></div><img className="platform-avatar" src={avatarSrc} alt={`${user.lastName} ${user.firstName}`} onError={() => setIsAvatarBroken(true)} /></div>
        </header>

        <section className="schedule-dashboard">
          <div className="schedule-toolbar">
            <button
              type="button"
              className={`schedule-filter-button ${selectedMonth === "" && selectedSeason === "" && selectedLevel === "" && selectedProfile === "" && searchValue === "" && !rangeStart ? "is-selected" : ""}`}
              onClick={handleResetFilters}
            >
              Все
            </button>

            <label className={`schedule-filter-field ${selectedMonth !== "" ? "is-selected" : ""}`}>
              <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)}>
                <option value="">Месяц</option>
                {monthOptions.map((month) => <option key={month.value} value={month.value}>{month.label}</option>)}
              </select>
            </label>

            <label className={`schedule-filter-field ${selectedSeason !== "" ? "is-selected" : ""}`}>
              <select value={selectedSeason} onChange={(event) => setSelectedSeason(event.target.value)}>
                <option value="">Время года</option>
                {seasonOptions.map((season) => <option key={season} value={season}>{season}</option>)}
              </select>
            </label>

            <label className={`schedule-filter-field ${selectedLevel !== "" ? "is-selected" : ""}`}>
              <select value={selectedLevel} onChange={(event) => setSelectedLevel(event.target.value)}>
                <option value="">Уровень</option>
                {levelOptions.map((level) => <option key={level} value={level}>{level}</option>)}
              </select>
            </label>

            <label className={`schedule-filter-field ${selectedProfile !== "" ? "is-selected" : ""}`}>
              <select value={selectedProfile} onChange={(event) => setSelectedProfile(event.target.value)}>
                <option value="">Профиль</option>
                {profileOptions.map((profile) => <option key={profile} value={profile}>{profile}</option>)}
              </select>
            </label>

            <label className={`schedule-search ${searchValue !== "" ? "is-selected" : ""}`} aria-label="Поиск по расписанию">
              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Поиск по расписанию"
              />
              <span className="schedule-search-icon">
                <PlatformIcon name="search" />
              </span>
            </label>
          </div>

          <div className="schedule-content">
            <div className="schedule-events-panel">
              <div className="schedule-events-heading">
                <span className="schedule-caption">{currentMonthLabel}</span>
                <h1>{rangeLabel ? "Ближайшие мероприятия" : "Предстоящие хакатоны, проекты и события"}</h1>
                <p>
                  {rangeLabel
                    ? `Период выбран: ${rangeLabel}. Ниже показаны ближайшие мероприятия по заданному диапазону.`
                    : "Подборка ближайших активностей платформы: хакатоны, проекты, воркшопы и командные встречи."}
                </p>
              </div>

              <div className="schedule-events-list">
                {visibleEvents.length > 0 ? (
                  visibleEvents.map((event) => (
                    <article key={event.id} className="schedule-event-card">
                      <div className="schedule-event-meta">
                        <span>{event.type}</span>
                        <span>{event.profile}</span>
                        <span>{event.level}</span>
                      </div>
                      <h2>{event.title}</h2>
                      <p>{event.description}</p>
                      <div className="schedule-event-footer">
                        <strong>{formatDateRange(event.startDate, event.endDate)}</strong>
                        <span>{monthNames[new Date(event.startDate).getMonth()]} {new Date(event.startDate).getFullYear()}</span>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="schedule-empty-state">
                    <h2>События не найдены</h2>
                    <p>Попробуйте сбросить фильтры или выбрать другой период в календаре.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="schedule-calendar-panel">
              <div className="schedule-calendar-card">
                <div className="schedule-calendar-card-header">
                  <div>
                    <span className="schedule-calendar-label">Кастомный календарь</span>
                    <h2>Выберите период</h2>
                  </div>
                  {rangeStart ? (
                    <button type="button" className="schedule-clear-range" onClick={() => { setRangeStart(null); setRangeEnd(null); }}>
                      Очистить
                    </button>
                  ) : null}
                </div>

                <div className="schedule-range-summary">
                  <span>{rangeStart ? `C ${formatDateRange(rangeStart, rangeEnd ?? rangeStart)}` : "Нажмите на дату начала"}</span>
                  <span>{rangeStart && !rangeEnd ? "Теперь выберите дату окончания" : "После выбора периода список слева обновится"}</span>
                </div>

                <div className="birthday-calendar schedule-range-calendar">
                  <div className="birthday-calendar-header">
                    <div className="calendar-period-controls">
                      <select
                        className="calendar-select calendar-month-select"
                        value={calendarViewDate.getMonth()}
                        onChange={(event) => setCalendarViewDate((prev) => new Date(prev.getFullYear(), Number(event.target.value), 1))}
                      >
                        {monthNames.map((month, index) => <option key={month} value={index}>{month}</option>)}
                      </select>

                      <select
                        className="calendar-select calendar-year-select"
                        value={calendarViewDate.getFullYear()}
                        onChange={(event) => setCalendarViewDate((prev) => new Date(Number(event.target.value), prev.getMonth(), 1))}
                      >
                        {calendarYearOptions.map((year) => <option key={year} value={year}>{year}</option>)}
                      </select>
                    </div>

                    <div className="calendar-nav-group">
                      <button type="button" className="calendar-nav" onClick={() => setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} aria-label="Предыдущий месяц">{"<"}</button>
                      <button type="button" className="calendar-nav" onClick={() => setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} aria-label="Следующий месяц">{">"}</button>
                    </div>
                  </div>

                  <div className="calendar-weekdays">
                    {weekDays.map((weekDay) => <span key={weekDay} className="calendar-weekday">{weekDay}</span>)}
                  </div>

                  <div className="calendar-grid">
                    {getCalendarDays(calendarViewDate).map((date, index) => {
                      if (!date) {
                        return <span key={`empty-${index}`} className="calendar-day-empty" aria-hidden="true" />;
                      }

                      const isoDate = toIsoDate(date);
                      const isRangeStart = rangeStart === isoDate;
                      const isRangeEnd = rangeEnd === isoDate;
                      const isSingleDayRange = isRangeStart && !rangeEnd;
                      const isInRange = rangeStart && rangeEnd
                        ? new Date(isoDate) > new Date(rangeStart) && new Date(isoDate) < new Date(rangeEnd)
                        : false;

                      return (
                        <button
                          key={isoDate}
                          type="button"
                          className={`calendar-day schedule-calendar-day${isRangeStart ? " selected range-start" : ""}${isRangeEnd ? " selected range-end" : ""}${isInRange ? " in-range" : ""}${isSingleDayRange ? " single-range" : ""}`}
                          onClick={() => handleDaySelect(date)}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </section>
    </main>
  );
};

