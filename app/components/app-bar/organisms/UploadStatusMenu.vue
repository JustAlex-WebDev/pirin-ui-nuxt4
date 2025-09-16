<template>
  <v-menu
    v-model="uploadMenuOpen"
    location="bottom"
    :close-on-content-click="false"
  >
    <!-- Activator -->
    <template v-slot:activator="{ props }">
      <UploadStatusActivator v-bind="props" />
    </template>

    <!-- Menu Content -->
    <UploadStatusMenuCard />
  </v-menu>
</template>

<script setup lang="ts">
//
// Imports
//
import UploadStatusActivator from "../molecules/UploadStatusMenuActivator.vue";
import UploadStatusMenuCard from "../molecules/UploadStatusMenuCard.vue";

//
// Composables
//
const { uploadMenuOpen } = useUploadStatus();
</script>
