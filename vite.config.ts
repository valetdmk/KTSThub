import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_ORIGIN || "http://10.3.25.106:8080";
  const isPublicBuild = env.VITE_APP_VARIANT === "public";

  return {
    plugins: [react()],
    build: {
      outDir: isPublicBuild ? "dist-public" : "dist",
    },
    server: {
      host: "127.0.0.1",
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
})
