import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root")!);
const isPublicBuild = import.meta.env.VITE_APP_VARIANT === "public";

async function bootstrap() {
  if (isPublicBuild) {
    const [{ PublicApp }, { publicStore }] = await Promise.all([
      import("./PublicApp"),
      import("./store/publicStore"),
    ]);

    root.render(
      <StrictMode>
        <Provider store={publicStore}>
          <PublicApp />
        </Provider>
      </StrictMode>,
    );

    return;
  }

  const [{ App }, { store }] = await Promise.all([
    import("./App"),
    import("./store/store"),
  ]);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}

void bootstrap();
