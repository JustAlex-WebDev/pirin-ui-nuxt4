<template>
  <v-navigation-drawer app v-model="drawer">
    <!-- Header Section -->
    <DrawerHeader
      :appName="appName"
      :userName="userName"
      :userEmail="userEmail"
      :backgroundImage="backgroundImage"
    />

    <!-- Navigation Sections -->
    <DrawerSection :items="mainDrawerItems" />
    <DrawerSection
      title="УПРАВЛЕНИЕ И АНАЛИТИКА"
      :items="managementDrawerItems"
    />
    <DrawerSection
      title="ЦЕНТЪР ЗА АДМИНИСТРАТОРИ"
      :items="adminCenterDrawerItems"
    />

    <!-- Footer Sections -->
    <template v-slot:append>
      <v-divider />
      <DrawerSection :items="swaggerDrawerItems" />
      <v-divider />

      <DrawerSection :items="bottomDrawerItems" />
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import DrawerHeader from "~/components/navigation-drawer/organisms/DrawerHeader.vue";
import DrawerSection from "~/components/navigation-drawer/organisms/DrawerSection.vue";

//
// Types
//
interface Props {
  appName: string;
  userName: string;
  userEmail: string;
  backgroundImage: string;
}

//
// Props
//
defineProps<Props>();

//
// Composables
//
const {
  drawer,
  mainDrawerItems,
  managementDrawerItems,
  adminCenterDrawerItems,
  swaggerDrawerItems,
  bottomDrawerItems,
} = useDrawer();
</script>
