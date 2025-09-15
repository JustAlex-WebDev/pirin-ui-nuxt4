<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="pa-6 mb-0" elevation="1" rounded>
        <h1 class="text-h4 mb-2 d-flex align-center ga-2">
          <!-- Icon -->
          <v-icon :icon="'mdi-home-outline'" size="x-small" color=""></v-icon>

          <!-- Title -->
          <span>Календар</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-subtitle-1 text-medium-emphasis">
          В календара по-долу са показани статистиките за НМДЛ разделени по
          категории и дати. Можете да избирате между направления, продажби без
          направления или всички данни заедно. Натиснете върху дата за детайлна
          информация.
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
  title: "Календар",
});
</script>
