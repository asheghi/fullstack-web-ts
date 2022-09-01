import react from "@vitejs/plugin-react";
import telefunc from "telefunc/vite";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig, loadEnv } from "vite";

export default function defineConfig(arg: any) {
  const env = loadEnv(arg.mode, process.cwd(), "");
  const config: UserConfig = {
    plugins: [react(), ssr(), telefunc()],
    test: {
      // `.test.ts` => Jest
      // `.spec.ts` => Vitest
      include: ["{**,**}/*.spec.(ts|tsx)"],
      environment: "jsdom",
    },
    define: {
      process: {
        env: {
          NEXTAUTH_URL: env.NEXTAUTH_URL,
          APP_TITLE: env.APP_TITLE,
          APP_DESCRIPTION: env.APP_DESCRIPTION,
        },
      },
    },
  };
  return config;
}
