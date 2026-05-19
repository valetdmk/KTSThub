import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/ui";
import { RoleSelectPage } from "../../pages/role-select/ui";

export const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/roles",
    element: <RoleSelectPage />,
  },
]);
