import path from "path";
import { readFileSync } from "fs";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Read version from package.json
const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  devServer: {
    port: 3000,
    host: "localhost",
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
    compressPublicAssets: true,
    debug: true,
    preset: "cloudflare-pages",
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
      // App Version
      appVersion: packageJson.version,

      // Base URL
      API_BASE_URL: process.env.API_BASE_URL,
      APP_BASE_URL: process.env.APP_BASE_URL,
      PIRIN_FE_BASE_URL: process.env.PIRIN_FE_BASE_URL || "/",

      // Keycloak / OIDC settings
      OIDC_AUTHORITY: process.env.PIRIN_FE_OIDC_AUTHORITY,
      OIDC_CLIENT_ID: process.env.PIRIN_FE_OIDC_CLIENT_ID,
      OIDC_REALM: process.env.PIRIN_FE_OIDC_REALM,

      // Token auto-refresh settings
      OIDC_TOKEN_AUTO_REFRESH: process.env.PIRIN_FE_OIDC_TOKEN_AUTO_REFRESH,
      OIDC_TOKEN_AUTO_REFRESH_CHECK_INTERVAL:
        process.env.PIRIN_FE_OIDC_TOKEN_AUTO_REFRESH_CHECK_INTERVAL,
      OIDC_TOKEN_AUTO_REFRESH_TIME_LEFT:
        process.env.PIRIN_FE_OIDC_TOKEN_AUTO_REFRESH_TIME_LEFT,
    },
  },
});
