<template>
  <div class="d-flex align-center ga-0 mr-2">
    <!-- Download Button -->
    <AppBarActionButton
      icon="mdi-download"
      tooltipText="Изтегляне"
      :loading="downloadLoading"
      :onClick="handleDownload"
    />

    <!-- Search Button (conditional) -->
    <AppBarActionButton
      v-if="searchConfig.show"
      icon="mdi-magnify"
      :tooltipText="searchConfig.tooltipText"
    />

    <!-- Parole All Button (conditional) -->
    <AppBarActionButton
      v-if="paroleAllConfig.show"
      icon="mdi-lock-open-outline"
      :tooltipText="paroleAllConfig.tooltipText"
    />

    <!-- Upload Status Menu -->
    <UploadStatusMenu />

    <!-- Account Menu -->
    <AccountMenu />
  </div>
</template>

<script setup lang="ts">
//
// Imports
//
import AppBarActionButton from "../molecules/AppBarActionButton.vue";
import AccountMenu from "./AccountMenu.vue";
import UploadStatusMenu from "./UploadStatusMenu.vue";

//
// Composables
//
const { downloadLoading, searchConfig, paroleAllConfig, handleDownload } =
  useAppBar();
</script>
