import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [react(), ssr()],
  test: {
    // `.test.ts` => Jest
    // `.spec.ts` => Vitest
    include: ["{**,**}/*.spec.(ts|tsx)"],
    environment: "jsdom",
  },
};

export default config;
