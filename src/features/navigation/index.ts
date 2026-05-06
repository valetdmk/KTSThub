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
  { id: "cabinet", label: "Р›РёС‡РЅС‹Р№ РєР°Р±РёРЅРµС‚", icon: "user", path: "/profile" },
  { id: "home", label: "Р“Р»Р°РІРЅР°СЏ", icon: "home", path: "/platform" },
  { id: "schedule", label: "Р Р°СЃРїРёСЃР°РЅРёРµ", icon: "calendar", path: "/schedule" },
  { id: "projects", label: "РџСЂРѕРµРєС‚С‹", icon: "projects", path: "/projects" },
  { id: "participants", label: "РЈС‡Р°СЃС‚РЅРёРєРё", icon: "users", path: "/participants" },
  { id: "achievements", label: "РђС‡РёРІРєРё", icon: "award", path: "/achievements" },
];

export const bottomMenuItems: NavigationMenuItem[] = [
  { id: "support", label: "РџРѕРґРґРµСЂР¶РєР°", icon: "support" },
  { id: "settings", label: "РќР°СЃС‚СЂРѕР№РєРё", icon: "settings" },
  { id: "logout", label: "Р’С‹Р№С‚Рё", icon: "logout" },
];

export const NavigationFeature = {
  actions,
  selectors,
  reducer: { [name]: reducer },
};

export { actions, name, reducer, selectors };
