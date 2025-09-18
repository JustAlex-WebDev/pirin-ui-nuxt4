<template>
  <v-app>
    <!-- Header -->
    <LoginHeader />

    <!-- Main Content -->
    <v-main>
      <v-container class="mt-16">
        <LoginForm />
      </v-container>
    </v-main>

    <!-- Footer -->
    <LoginFooter
      logoSrc="/img/sw-es-color-24.png"
      logoAlt="SKYWARE Group logo"
      companyUrl="https://skyware-group.com"
      :version="appInfo?.version || '0.0.0'"
    />
  </v-app>
</template>

<script setup lang="ts">
import LoginFooter from "~/components/login-page/organisms/LoginFooter.vue";
import LoginForm from "~/components/login-page/organisms/LoginForm.vue";
import LoginHeader from "~/components/login-page/organisms/LoginHeader.vue";

// Imports

// Types
interface AppInfo {
  name: string;
  description: string;
  version: string;
  helpLink: string;
}

// Composables
const { init, isAuthenticated } = useAuth();

// API Client
const cl = await useProdClient();
const ac = new AbortController();

// State
const loadingAppInfo = ref<boolean>(true);
const appInfo = ref<AppInfo>({
  name: "",
  description: "",
  version: "",
  helpLink: "",
});

// Methods
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

// Lifecycle
onMounted(async () => {
  try {
    await init("check-sso");
    if (isAuthenticated.value) {
      await navigateTo("/", { replace: true });
    }
    await fetchAppInfo();
  } catch (err) {
    console.error("Auth check failed:", err);
  }
});

// Cleanup
onUnmounted(() => {
  ac.abort();
});
</script>
