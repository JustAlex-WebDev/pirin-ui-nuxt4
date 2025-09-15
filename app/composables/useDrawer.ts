import { useDisplay } from "vuetify";

export const useDrawer = () => {
  const config = useRuntimeConfig();
  const { smAndDown } = useDisplay();

  //
  // Global State
  //
  const drawer = useState("drawer", () => true);

  //
  // Computed Properties
  //
  const mainDrawerItems = computed(() => [
    {
      title: "Начало",
      icon: "mdi-home-outline",
      to: "/",
    },
  ]);

  const managementDrawerItems = computed(() => [
    {
      title: "Календар",
      icon: "mdi-calendar-text-outline",
      to: "/calendar",
    },
  ]);

  const adminCenterDrawerItems = computed(() => [
    {
      title: "Грешки",
      icon: "mdi-message-lock-outline",
      to: "/errors",
    },
    {
      title: "Сесии за изпращане",
      icon: "mdi-list-status",
      to: "/sessions",
    },
  ]);

  const swaggerDrawerItems = computed(() => [
    {
      title: "Swagger Документация",
      icon: "mdi-book-outline",
      to: `${config.public.PIRIN_FE_SWAGGER_URL}/index.html`,
      external: true,
    },
  ]);

  const bottomDrawerItems = computed(() => [
    {
      title: "Настройки",
      icon: "mdi-cog-outline",
      to: "/settings",
      isPirinAdminRequired: true,
    },
    {
      title: "Журнали",
      icon: "mdi-format-list-bulleted-type",
      to: "/logs",
      isPirinAdminRequired: true,
    },
    {
      title: "Относно",
      icon: "mdi-information-outline",
      to: "/about",
    },
  ]);

  //
  // Methods
  //
  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };

  //
  // Lifecycle
  //
  onMounted(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("drawer");
      if (savedState !== null) {
        drawer.value = JSON.parse(savedState);
      } else {
        drawer.value = !smAndDown.value;
      }
    }
  });

  //
  // Watchers
  //
  watch(drawer, (newValue) => {
    if (import.meta.client) {
      localStorage.setItem("drawer", JSON.stringify(newValue));
    }
  });

  return {
    // Global State
    drawer,

    // Data
    mainDrawerItems,
    managementDrawerItems,
    adminCenterDrawerItems,
    swaggerDrawerItems,
    bottomDrawerItems,

    // Methods
    toggleDrawer,
  };
};
