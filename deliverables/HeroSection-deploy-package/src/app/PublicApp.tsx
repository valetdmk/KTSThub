import "./App.scss";
import { PublicAppRouter } from "./routes/PublicAppRouter";

export function PublicApp() {
  return (
    <div className="app">
      <PublicAppRouter />
    </div>
  );
}
