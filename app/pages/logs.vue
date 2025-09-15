<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="pa-6 mb-0" elevation="1" rounded>
        <h1 class="text-h4 mb-2 d-flex align-center ga-2">
          <!-- Icon -->
          <v-icon :icon="'mdi-home-outline'" size="x-small" color=""></v-icon>

          <!-- Title -->
          <span>Журнали</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-subtitle-1 text-medium-emphasis">
          По-долу са показани всички изпратени резултати към НЗИС, заедно с
          информация за състоянието на всяко едно изпращане.
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
  title: "Журнали",
});
</script>
