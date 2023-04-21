import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  test: {
    mockReset: true,
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{js,ts}"],
    setupFiles: "src/setupTests.ts",
  },
  server: {
    fs: {
      allow: [
        ".svelte-kit",
        "node-modules",
        "src",
        "src/lib",
        "src/routes",
        "assets",
      ],
    },
  },
};

export default config;
