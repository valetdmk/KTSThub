import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { ParticipantsPage } from "../../pages/participants/participants";
import { AdminPage } from "../../pages/admin/admin";
import { SchedulePage } from "../../pages/schedule/schedule";
import { ProfilePage } from "../../pages/profile/profile";
import { Hero } from "../../components/Hero/Hero";
import Events from "../../pages/events/events";
import EventPage from "../../pages/events/eventpage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Hero />,
    },
    {
        path: '/home',
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
        path: '/events',
        element: <Events/>,
    },
    {
        path: '/events/:id',
        element: <EventPage />,
    },
]);

export function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export const AppRouter = () => {
    return <RouterProvider router={router} />;
}