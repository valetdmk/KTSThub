import type { ReactNode } from "react";

export type PlatformIconName =
  | "user"
  | "home"
  | "calendar"
  | "projects"
  | "users"
  | "award"
  | "support"
  | "settings"
  | "logout"
  | "search"
  | "favorite"
  | "bell";

type PlatformIconBaseProps = {
  className?: string;
  size?: number;
  children: ReactNode;
};

type PlatformIconProps = Omit<PlatformIconBaseProps, "children"> & {
  name: PlatformIconName;
};

function PlatformIconBase({ className = "platform-icon", size = 22, children }: PlatformIconBaseProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function UserIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </PlatformIconBase>
  );
}

export function HomeIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-7h6v7" />
    </PlatformIconBase>
  );
}

export function CalendarIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18" />
    </PlatformIconBase>
  );
}

export function ProjectsIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <rect x="4" y="4" width="7" height="7" rx="2" />
      <rect x="13" y="4" width="7" height="7" rx="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" />
      <rect x="13" y="13" width="7" height="7" rx="2" />
    </PlatformIconBase>
  );
}

export function UsersIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M16 21a6 6 0 0 0-12 0" />
      <circle cx="10" cy="8" r="4" />
      <path d="M22 21a5 5 0 0 0-5-5" />
      <path d="M17 4a4 4 0 0 1 0 8" />
    </PlatformIconBase>
  );
}

export function AwardIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="m8.5 12-1.5 9 5-3 5 3-1.5-9" />
    </PlatformIconBase>
  );
}

export function SupportIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.7 2.7 0 0 1 5 1.4c0 2.1-2.5 2.4-2.5 4.1" />
      <path d="M12 18h.01" />
    </PlatformIconBase>
  );
}

export function SettingsIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.9 1.9 0 0 0 .38 2.1l.05.05a2.25 2.25 0 0 1-3.18 3.18l-.05-.05a1.9 1.9 0 0 0-2.1-.38 1.9 1.9 0 0 0-1.15 1.75V22a2.25 2.25 0 0 1-4.5 0v-.08A1.9 1.9 0 0 0 7.7 20.17a1.9 1.9 0 0 0-2.1.38l-.05.05a2.25 2.25 0 0 1-3.18-3.18l.05-.05A1.9 1.9 0 0 0 2.8 15a1.9 1.9 0 0 0-1.75-1.15H1a2.25 2.25 0 0 1 0-4.5h.08A1.9 1.9 0 0 0 2.83 8.2a1.9 1.9 0 0 0-.38-2.1l-.05-.05a2.25 2.25 0 0 1 3.18-3.18l.05.05a1.9 1.9 0 0 0 2.1.38A1.9 1.9 0 0 0 8.88 1.55V1a2.25 2.25 0 0 1 4.5 0v.08a1.9 1.9 0 0 0 1.15 1.75 1.9 1.9 0 0 0 2.1-.38l.05-.05a2.25 2.25 0 0 1 3.18 3.18l-.05.05a1.9 1.9 0 0 0-.38 2.1 1.9 1.9 0 0 0 1.75 1.15H22a2.25 2.25 0 0 1 0 4.5h-.08A1.9 1.9 0 0 0 19.4 15Z" />
    </PlatformIconBase>
  );
}

export function LogoutIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 3v18h-8" />
    </PlatformIconBase>
  );
}

export function SearchIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </PlatformIconBase>
  );
}

export function FavoriteIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="m12 21-1.45-1.32C5.4 15 2 11.92 2 8.14 2 5.06 4.42 3 7.2 3c1.57 0 3.08.73 4.05 1.88A5.36 5.36 0 0 1 15.3 3C18.08 3 20.5 5.06 20.5 8.14c0 3.78-3.4 6.86-8.55 11.54L12 21Z" />
    </PlatformIconBase>
  );
}

export function BellIcon(props: Omit<PlatformIconBaseProps, "children">) {
  return (
    <PlatformIconBase {...props}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </PlatformIconBase>
  );
}

const iconComponents: Record<PlatformIconName, (props: Omit<PlatformIconBaseProps, "children">) => ReactNode> = {
  user: UserIcon,
  home: HomeIcon,
  calendar: CalendarIcon,
  projects: ProjectsIcon,
  users: UsersIcon,
  award: AwardIcon,
  support: SupportIcon,
  settings: SettingsIcon,
  logout: LogoutIcon,
  search: SearchIcon,
  favorite: FavoriteIcon,
  bell: BellIcon,
};

export function PlatformIcon({ name, className = "platform-icon", size = 22 }: PlatformIconProps) {
  const IconComponent = iconComponents[name];
  return <IconComponent className={className} size={size} />;
}
