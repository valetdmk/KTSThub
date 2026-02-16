import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Participants = lazy(() => import('../../pages/Participants'));
const Admin = lazy(() => import('../../pages/Admin'));
const Home = lazy(() => import('../../pages/Home'));
const Profile = lazy(() => import('../../pages/Profile'));
const Schedule = lazy(() => import('../../pages/Schedule'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Suspense>
  );
};
