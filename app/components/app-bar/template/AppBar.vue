<template>
  <!-- NavBar -->
  <v-app-bar app flat dark color="primary">
    <!-- Drawer Toggle -->
    <DrawerToggle v-model="drawer" />

    <!-- Page Title -->
    <PageTitle :title="pageTitle" />

    <v-spacer />

    <!-- Actions -->
    <AppBarActions />
  </v-app-bar>
</template>

<script setup lang="ts">
//
// Imports
//
import DrawerToggle from "../molecules/DrawerToggle.vue";
import PageTitle from "../molecules/PageTitle.vue";
import AppBarActions from "../organisms/AppBarActions.vue";

//
// Composables
//
const { drawer } = useDrawer();

//
// Initial Setup
//

// Router
const route = useRoute();

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
