import path from "path";
import { readFileSync } from "fs";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Read version from package.json
const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  devServer: {
    host: process.env.PIRIN_FE_HOST || "0.0.0.0",
    port: Number(process.env.PIRIN_FE_PORT) || 80,
  },

  // Add CSS files for global styles
  css: ["@mdi/font/css/materialdesignicons.min.css", "~/assets/css/main.css"],
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        },
      ],
    },
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
  },

  // Transpile Vuetify for SSR
  build: {
    transpile: ["vuetify"],
  },

  // Modules to include in the Nuxt project
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
  ],

  // SSR and Nitro configurations
  ssr: false,
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  // Vite configuration
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    resolve: {
      alias: {
        "@types": path.resolve(__dirname, "types"),
      },
    },
  },

  runtimeConfig: {
    public: {
      appVersion: packageJson.version,
      PIRIN_FE_BASE_URL: process.env.PIRIN_FE_BASE_URL,
      PIRIN_FE_SWAGGER_URL: process.env.PIRIN_FE_SWAGGER_URL,
    },
  },
});
