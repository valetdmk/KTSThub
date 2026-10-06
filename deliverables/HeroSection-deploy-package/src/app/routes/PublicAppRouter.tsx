import { RouterProvider } from "react-router-dom";
import { publicRouter } from "./publicRouter";

export function PublicAppRouter() {
  return <RouterProvider router={publicRouter} />;
}
