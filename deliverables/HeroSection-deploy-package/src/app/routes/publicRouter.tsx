import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/ui";

const RoleSelectPage = lazy(() =>
  import("../../pages/role-select/ui").then((module) => ({ default: module.RoleSelectPage })),
);
const NotFoundPage = lazy(() => import("../../pages/not-found/ui").then((module) => ({ default: module.NotFoundPage })));

export const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/roles",
    element: (
      <Suspense fallback={<div className="app-route-loader" aria-hidden="true" />}>
        <RoleSelectPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div className="app-route-loader" aria-hidden="true" />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
