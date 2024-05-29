import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // 將 tsconfig.json 中的路徑配置同步到 vite.config.ts 中
    svgr(),
    TanStackRouterVite(),
  ],
});
