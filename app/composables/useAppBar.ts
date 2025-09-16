export const useAppBar = () => {
  //
  // Initial Setup
  //

  // Route
  const route = useRoute();

  //
  // State
  //

  // Download Button
  const downloadLoading = ref(false);

  // Upload Status Menu
  const uploadStatusMenuOpen = ref(false);

  //
  // Computed Properties
  //

  // Page title
  interface PageMeta {
    title?: string;
    titleEn?: string;
  }

  const pageTitle = computed(() => {
    const meta = route.meta as PageMeta;
    return meta.title || "iLabMB - Micro Path";
  });

  // Search button configuration
  const searchConfig = computed(() => {
    const path = route.path;

    const configs: Record<string, { show: boolean; tooltipText: string }> = {
      "/exceptions": {
        show: true,
        tooltipText: "Търсене в грешки",
      },
      "/calendar": {
        show: true,
        tooltipText: "Търсене в календара",
      },
      "/upload-sessions": {
        show: true,
        tooltipText: "Търсене в сесии",
      },
    };

    return configs[path] || { show: false, tooltipText: "Търсене" };
  });

  // Parole all button configuration (specific to referrals/stats page only)
  const paroleAllConfig = computed(() => {
    const path = route.path;

    return {
      show: path === "/calendar",
      tooltipText: "Освободи всички",
    };
  });

  // Extensions configuration
  const extensionsConfig = computed(() => {
    const path = route.path;

    const configs: Record<string, { show: boolean; component: string }> = {
      "/": {
        show: true,
        component: "HomeExtension",
      },
      "/calendar": {
        show: true,
        component: "CalendarExtension",
      },
    };

    return configs[path] || { show: false, component: "" };
  });

  //
  // Methods
  //

  // Download Button Handler
  const handleDownload = async () => {
    // Prevent multiple calls if already loading
    if (downloadLoading.value) return;

    try {
      downloadLoading.value = true;
      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Download completed");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      downloadLoading.value = false;
    }
  };

  // Upload Status Menu Toggle
  const toggleUploadStatusMenu = () => {
    uploadStatusMenuOpen.value = !uploadStatusMenuOpen.value;
  };

  return {
    // State
    downloadLoading,
    uploadStatusMenuOpen,

    // Computed Properties
    pageTitle,
    searchConfig,
    paroleAllConfig,
    extensionsConfig,

    // Methods
    handleDownload,
    toggleUploadStatusMenu,
  };
};
