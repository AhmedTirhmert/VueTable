import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    specPattern: ["cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}"],
    baseUrl: "http://localhost:4173",
  },
  component: {
    specPattern: ["src/components/**/*.{cy,spec}.{js,jsx,ts,tsx}"],
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
