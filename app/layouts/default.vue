<template>
  <div>
    <NavBar :app-info="appInfo" :logo-url="logoUrl" />

    <v-main>
      <v-container fluid class="pa-4">
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
//
// Types
//
interface AppInfo {
  name: string;
  description: string;
  version: string;
  helpLink: string;
}

//
// Initial Setup
//

// API Client
const cl = await useProdClient();
const ac = new AbortController();

// Route
const route = useRoute();

//
// State
//

const loadingAppInfo = ref<boolean>(true);
const loadingAppLogo = ref<boolean>(true);
const appInfo = ref<AppInfo>({
  name: "",
  description: "",
  version: "",
  helpLink: "",
});
const logoUrl = ref<string>("");

//
// Computed Properties
//

// Page title logic
const pageTitle = computed(() => {
  const meta = route.meta as { title?: string; titleEn?: string };
  const routeTitle = meta.title;
  return routeTitle ? `${routeTitle} - Пирин` : "Пирин";
});

// SEO keywords
const appKeywords = computed(() => {
  const baseKeywords = [
    "microbiology laboratory",
    "clinical microbiology",
    "laboratory information system",
    "LIMS",
    "bacterial culture",
    "antimicrobial susceptibility testing",
    "AST",
    "antibiogram",
    "pathogen identification",
    "clinical diagnostics",
  ];
  return baseKeywords.join(", ");
});

//
// Methods
//

// Fetch application information
const fetchAppInfo = async () => {
  try {
    loadingAppInfo.value = true;
    const fetchedInfo = await cl.fetchAppInfo(ac.signal);
    appInfo.value =
      typeof fetchedInfo === "string" ? JSON.parse(fetchedInfo) : fetchedInfo;
  } catch (err) {
    console.error("Error fetching app info:", err);
  } finally {
    loadingAppInfo.value = false;
  }
};

// Fetch application logo
const fetchAppLogo = async () => {
  try {
    loadingAppLogo.value = true;
    logoUrl.value = await cl.fetchAppLogo("svg", ac.signal);
  } catch (err) {
    console.error("Error fetching app logo:", err);
    logoUrl.value = "";
  } finally {
    loadingAppLogo.value = false;
  }
};

//
// Watches
//

// Reactive head metadata
watch(
  [appInfo, pageTitle, logoUrl],
  () => {
    if (appInfo.value?.name) {
      useHead({
        title: pageTitle.value,

        htmlAttrs: {
          lang: "bg",
        },

        meta: [
          { name: "description", content: appInfo.value.description },
          { name: "keywords", content: appKeywords.value },
          {
            name: "author",
            content: "SKYWARE Group",
          },
          { name: "robots", content: "index, follow" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },

          // Open Graph
          { property: "og:title", content: pageTitle.value },
          { property: "og:description", content: appInfo.value.description },
          { property: "og:type", content: "website" },
          { property: "og:image", content: logoUrl.value || "/og-image.png" },
          { property: "og:site_name", content: appInfo.value.name },
        ],
      });
    }
  },
  { immediate: true, deep: true }
);

//
// Lifecycle
//
onMounted(() => {
  fetchAppInfo();
  fetchAppLogo();
});

onUnmounted(() => {
  ac.abort();
});
</script>
