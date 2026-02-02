import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../../pages/home/home";
import ParticipantsPage from "../../pages/participants/participants";
import AdminPage from "../../pages/admin/admin";
import SchedulePage from "../../pages/schedule/schedule";
import ProfilePage from "../../pages/profile/profile";

const router = createBrowserRouter([
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
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}