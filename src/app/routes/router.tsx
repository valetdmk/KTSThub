import { createBrowserRouter } from "react-router-dom";
import { AboutUs } from "../../pages/aboutus/ui";
import { Achievements } from "../../pages/achievements/ui";
import { AdminCreateEventPage } from "../../pages/admin/ui/create-event";
import { AdminPage } from "../../pages/admin/ui";
import { AuthPage } from "../../pages/auth/ui";
import { Developers } from "../../pages/developers/ui";
import Events from "../../pages/events/ui";
import EventPage from "../../pages/events/ui/eventpage";
import { FAQ } from "../../pages/faq/ui";
import { HomePage } from "../../pages/home/ui";
import Login from "../../pages/login/ui";
import { ParticipantsPage } from "../../pages/participants/ui";
import { Partners } from "../../pages/partners/ui";
import { PlatformPage } from "../../pages/platform/ui";
import { ProfilePage } from "../../pages/profile/ui";
import { EditProfilePage } from "../../pages/profile-edit/ui";
import { ProjectsPage } from "../../pages/projects/ui";
import Register from "../../pages/register/ui";
import { RoleSelectPage } from "../../pages/role-select/ui";
import { SchedulePage } from "../../pages/schedule/ui";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/participants",
    element: <ProtectedRoute><ParticipantsPage /></ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute><AdminPage /></ProtectedRoute>,
  },
  {
    path: "/admin/create-event",
    element: <ProtectedRoute><AdminCreateEventPage /></ProtectedRoute>,
  },
  {
    path: "/schedule",
    element: <ProtectedRoute><SchedulePage /></ProtectedRoute>,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: "/profile/edit",
    element: <ProtectedRoute><EditProfilePage /></ProtectedRoute>,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/:id",
    element: <EventPage />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/achievements",
    element: <ProtectedRoute><Achievements /></ProtectedRoute>,
  },
  {
    path: "/projects",
    element: <ProtectedRoute><ProjectsPage /></ProtectedRoute>,
  },
  {
    path: "/developers",
    element: <Developers />,
  },
  {
    path: "/partners",
    element: <Partners />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/roles",
    element: <RoleSelectPage />,
  },
  {
    path: "/platform",
    element: <ProtectedRoute><PlatformPage /></ProtectedRoute>,
  },
]);
