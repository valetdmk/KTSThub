import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { HomePage } from "../../pages/home/ui";
import { ParticipantsPage } from "../../pages/participants/ui";
import { AdminPage } from "../../pages/admin/ui";
import { SchedulePage } from "../../pages/schedule/ui";
import { ProfilePage } from "../../pages/profile/ui";
import { EditProfilePage } from "../../pages/profile-edit/ui";
import Events from "../../pages/events/ui";
import EventPage from "../../pages/events/ui/eventpage";
import { AboutUs } from "../../pages/aboutus/ui";
import { Achievements } from "../../pages/achievements/ui";
import { Developers } from "../../pages/developers/ui";
import { Partners } from "../../pages/partners/ui";
import { FAQ } from "../../pages/faq/ui";
import Login from "../../pages/login/ui";
import Register from "../../pages/register/ui";
import { AuthPage } from "../../pages/auth/ui";
import { PlatformPage } from "../../pages/platform/ui";
import { ProjectsPage } from "../../pages/projects/ui";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/participants',
        element: <ParticipantsPage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
    {
        path: '/schedule',
        element: <SchedulePage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
    {
        path: '/profile/edit',
        element: <EditProfilePage />,
    },
    {
        path: '/events',
        element: <Events/>,
    },
    {
        path: '/events/:id',
        element: <EventPage />,
    },
    {
        path: '/aboutus',
        element: <AboutUs />,
    },
    {
        path: '/achievements',
        element: <Achievements />,
    },
    {
        path: '/projects',
        element: <ProjectsPage />,
    },
    {
        path: '/developers',
        element: <Developers />,
    },
    {
        path: '/partners',
        element: <Partners />,
    },
    {
        path: '/faq',
        element: <FAQ />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
    {
        path: '/platform',
        element: <PlatformPage />,
    },
]);

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export const AppRouter = () => {
    return <RouterProvider router={router} />;
}
