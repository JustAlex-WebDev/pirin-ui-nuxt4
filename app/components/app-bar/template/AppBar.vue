<template>
  <!-- NavBar -->
  <v-app-bar app flat dark color="primary">
    <!-- Prepended Content -->
    <template v-slot:prepend>
      <!-- Drawer Toggle -->
      <DrawerToggle v-model="drawer" />

      <!-- Page Title -->
      <PageTitle v-if="!smAndDown" :title="pageTitle" />
    </template>

    <!-- Appended Content -->
    <template v-slot:append>
      <!-- Actions -->
      <AppBarActions />
    </template>

    <!-- Extensions - Only render slot when needed -->
    <template v-slot:extension v-if="extensionsConfig.show">
      <AppBarExtensions />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
//
// Imports
//
import { useDisplay } from "vuetify";
import DrawerToggle from "../molecules/DrawerToggle.vue";
import PageTitle from "../molecules/PageTitle.vue";
import AppBarActions from "../organisms/AppBarActions.vue";
import AppBarExtensions from "../organisms/AppBarExtensions.vue";

//
// Initial Setup
//

// Breakpoints
const { smAndDown } = useDisplay();

//
// Composables
//
const { drawer } = useDrawer();
const { pageTitle, extensionsConfig } = useAppBar();
</script>
