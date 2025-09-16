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
      tooltipText: "Начало",
    },
  ]);

  const managementDrawerItems = computed(() => [
    {
      title: "Календар",
      icon: "mdi-calendar-text-outline",
      to: "/calendar",
      tooltipText: "Статистически данни по дни",
    },
  ]);

  const adminCenterDrawerItems = computed(() => [
    {
      title: "Грешки",
      icon: "mdi-message-lock-outline",
      to: "/exceptions",
      tooltipText: "Открити грешки при подаване на резултати към НЗИС",
    },
    {
      title: "Сесии за изпращане",
      icon: "mdi-list-status",
      to: "/upload-sessions",
      tooltipText: "Статистически данни по дни",
    },
  ]);

  const swaggerDrawerItems = computed(() => [
    {
      title: "Swagger Документация",
      icon: "mdi-book-outline",
      to: `${config.public.APP_BASE_URL}/index.html`,
      tooltipText: "Swagger Документация",
      external: true,
    },
  ]);

  const bottomDrawerItems = computed(() => [
    {
      title: "Настройки",
      icon: "mdi-cog-outline",
      to: "/settings",
      tooltipText: "Конфигурация на Пирин",
      isPirinAdminRequired: true,
    },
    {
      title: "Журнали",
      icon: "mdi-format-list-bulleted-type",
      to: "/logs",
      tooltipText: "Журнали",
      isPirinAdminRequired: true,
    },
    {
      title: "Относно",
      icon: "mdi-information-outline",
      tooltipText: "Информация относно приложението",
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
