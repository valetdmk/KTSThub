import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const AboutUs = lazy(() => import("../../pages/aboutus/ui").then((module) => ({ default: module.AboutUs })));
const Achievements = lazy(() => import("../../pages/achievements/ui").then((module) => ({ default: module.Achievements })));
const AdminCreateEventPage = lazy(() => import("../../pages/admin/ui/create-event").then((module) => ({ default: module.AdminCreateEventPage })));
const AdminPage = lazy(() => import("../../pages/admin/ui").then((module) => ({ default: module.AdminPage })));
const AuthPage = lazy(() => import("../../pages/auth/ui").then((module) => ({ default: module.AuthPage })));
const Developers = lazy(() => import("../../pages/developers/ui").then((module) => ({ default: module.Developers })));
const Events = lazy(() => import("../../pages/events/ui"));
const EventPage = lazy(() => import("../../pages/events/ui/eventpage"));
const FAQ = lazy(() => import("../../pages/faq/ui").then((module) => ({ default: module.FAQ })));
const HomePage = lazy(() => import("../../pages/home/ui").then((module) => ({ default: module.HomePage })));
const Login = lazy(() => import("../../pages/login/ui"));
const ParticipantsPage = lazy(() => import("../../pages/participants/ui").then((module) => ({ default: module.ParticipantsPage })));
const Partners = lazy(() => import("../../pages/partners/ui").then((module) => ({ default: module.Partners })));
const PlatformPage = lazy(() => import("../../pages/platform/ui").then((module) => ({ default: module.PlatformPage })));
const ProfilePage = lazy(() => import("../../pages/profile/ui").then((module) => ({ default: module.ProfilePage })));
const EditProfilePage = lazy(() => import("../../pages/profile-edit/ui").then((module) => ({ default: module.EditProfilePage })));
const ProjectsPage = lazy(() => import("../../pages/projects/ui").then((module) => ({ default: module.ProjectsPage })));
const Register = lazy(() => import("../../pages/register/ui"));
const RoleSelectPage = lazy(() => import("../../pages/role-select/ui").then((module) => ({ default: module.RoleSelectPage })));
const SchedulePage = lazy(() => import("../../pages/schedule/ui").then((module) => ({ default: module.SchedulePage })));

const renderLazyRoute = (node: ReactNode) => (
  <Suspense fallback={<div className="app-route-loader" aria-hidden="true" />}>
    {node}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: renderLazyRoute(<HomePage />),
  },
  {
    path: "/participants",
    element: <ProtectedRoute>{renderLazyRoute(<ParticipantsPage />)}</ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute>{renderLazyRoute(<AdminPage />)}</ProtectedRoute>,
  },
  {
    path: "/admin/create-event",
    element: <ProtectedRoute>{renderLazyRoute(<AdminCreateEventPage />)}</ProtectedRoute>,
  },
  {
    path: "/schedule",
    element: <ProtectedRoute>{renderLazyRoute(<SchedulePage />)}</ProtectedRoute>,
  },
  {
    path: "/profile",
    element: <ProtectedRoute>{renderLazyRoute(<ProfilePage />)}</ProtectedRoute>,
  },
  {
    path: "/profile/edit",
    element: <ProtectedRoute>{renderLazyRoute(<EditProfilePage />)}</ProtectedRoute>,
  },
  {
    path: "/events",
    element: renderLazyRoute(<Events />),
  },
  {
    path: "/events/:id",
    element: renderLazyRoute(<EventPage />),
  },
  {
    path: "/aboutus",
    element: renderLazyRoute(<AboutUs />),
  },
  {
    path: "/achievements",
    element: <ProtectedRoute>{renderLazyRoute(<Achievements />)}</ProtectedRoute>,
  },
  {
    path: "/projects",
    element: <ProtectedRoute>{renderLazyRoute(<ProjectsPage />)}</ProtectedRoute>,
  },
  {
    path: "/developers",
    element: renderLazyRoute(<Developers />),
  },
  {
    path: "/partners",
    element: renderLazyRoute(<Partners />),
  },
  {
    path: "/faq",
    element: renderLazyRoute(<FAQ />),
  },
  {
    path: "/login",
    element: renderLazyRoute(<Login />),
  },
  {
    path: "/register",
    element: renderLazyRoute(<Register />),
  },
  {
    path: "/auth",
    element: renderLazyRoute(<AuthPage />),
  },
  {
    path: "/roles",
    element: renderLazyRoute(<RoleSelectPage />),
  },
  {
    path: "/platform",
    element: <ProtectedRoute>{renderLazyRoute(<PlatformPage />)}</ProtectedRoute>,
  },
]);
