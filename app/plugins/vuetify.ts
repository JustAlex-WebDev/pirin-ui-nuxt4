import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#1c5a6c",
            accent: "#1c5a6c",
          },
        },
      },
    },
    components: {
      ...components,
    },
  });
  app.vueApp.use(vuetify);
});
