import type { PlatformIconName } from "../../shared/ui/PlatformIcon";
import { actions, name, reducer } from "./model/Slice";
import { selectors } from "./model/selectors";

export type NavigationMenuItem = {
  id: string;
  label: string;
  icon: PlatformIconName;
  path?: string;
};

export const topMenuItems: NavigationMenuItem[] = [
  { id: "cabinet", label: "Личный кабинет", icon: "user", path: "/profile" },
  { id: "home", label: "Главная", icon: "home", path: "/platform" },
  { id: "schedule", label: "Расписание", icon: "calendar", path: "/schedule" },
  { id: "projects", label: "Проекты", icon: "projects", path: "/projects" },
  { id: "participants", label: "Участники", icon: "users", path: "/participants" },
  { id: "achievements", label: "Достижения", icon: "award", path: "/achievements" },
];

export const bottomMenuItems: NavigationMenuItem[] = [
  { id: "support", label: "Поддержка", icon: "support" },
  { id: "settings", label: "астройки", icon: "settings" },
  { id: "logout", label: "Выйти", icon: "logout" },
];

export const NavigationFeature = {
  actions,
  selectors,
  reducer: { [name]: reducer },
};

export { actions, name, reducer, selectors };
