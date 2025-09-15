<template>
  <div>
    <!-- Drawer -->
    <Drawer
      :appName="appName"
      :userName="userName"
      :userEmail="userEmail"
      :backgroundImage="backgroundImage"
    />

    <!-- NavBar -->
    <v-app-bar app flat dark color="primary">
      <!-- Drawer Toggle -->
      <v-tooltip location="bottom" :open-delay="700" :close-delay="300">
        <template v-slot:activator="{ props: attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on:click="toggleDrawer" />
        </template>
        <span>{{ drawer ? "Затвори меню" : "Отвори меню" }}</span>
      </v-tooltip>

      <!-- Page Title -->
      <v-toolbar-title
        class="ml-2"
        style="flex: 1 1 auto; white-space: nowrap; overflow: visible"
      >
        {{ pageTitle }}
      </v-toolbar-title>

      <!-- Spacer -->
      <v-spacer />

      <!-- User Dropdown -->
      <v-menu
        v-model="userMenuOpen"
        open-on-click
        :close-on-content-click="false"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            tabindex="0"
            aria-label="Account Info"
            v-tooltip:bottom="{
              text: 'Детайли за акаунта',
              openDelay: 700,
            }"
          >
            <v-icon icon="mdi-account-details-outline" size="24"></v-icon>
          </v-btn>
        </template>

        <v-list nav density="comfortable" class="d-flex flex-column ga-2 px-0">
          <!-- Dropdown items -->
          <div class="d-flex flex-column w-100 justify-start ga-0 px-4">
            <NuxtLink class="text-decoration-none text-theme opacity-80">
              <v-list-item
                class="d-flex align-center"
                rounded="lg"
                :value="'Изход'"
                color="primary"
                :title="'Изход'"
                prepend-icon="mdi-logout"
              >
              </v-list-item>
            </NuxtLink>
          </div>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
//
// Imports
//
import Drawer from "./drawer/template/Drawer.vue";

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
// Props
//
defineProps<{
  appInfo: AppInfo;
  logoUrl: string;
}>();

//
// Composables
//
const { drawer, toggleDrawer } = useDrawer();

//
// Initial Setup
//

// Router
const route = useRoute();

//
// State
//
const userMenuOpen = ref(false);

//
// Data
//
const appName = "Пирин";
const userName = "Damyan Sarafov";
const userEmail = "damyan.sarafov@skyware-group.com";
const backgroundImage = "/img/forest.jpg";

//
// Computed Properites
//

interface PageMeta {
  title?: string;
  titleEn?: string;
}
const pageTitle = computed(() => {
  const meta = route.meta as PageMeta;
  return meta.title || "iLabMB - Micro Path";
});
</script>
