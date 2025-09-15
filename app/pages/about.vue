<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="pa-6 mb-0" elevation="1" rounded>
        <h1 class="text-h4 mb-2 d-flex align-center ga-2">
          <!-- Icon -->
          <v-icon :icon="'mdi-home-outline'" size="x-small" color=""></v-icon>

          <!-- Title -->
          <span>Информация</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-subtitle-1 text-medium-emphasis">
          Back-end v.2.0.0 • Front-end v.1.1.0
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//
// Metadata
//

definePageMeta({
  title: "Информация",
});
</script>
