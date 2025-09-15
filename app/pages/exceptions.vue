<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="pa-6 mb-0" elevation="1" rounded>
        <h1 class="text-h4 mb-2 d-flex align-center ga-2">
          <!-- Icon -->
          <v-icon :icon="'mdi-home-outline'" size="x-small" color=""></v-icon>

          <!-- Title -->
          <span>Видове окрити грешки</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-subtitle-1 text-medium-emphasis">
          В по-долната таблица са показани всички открити грешки при изпращане
          на резултати към НЗИС, заедно с броя пъти които дадена грешка е
          открита, както и датата на която за последен път е срещната.
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
  title: "Открити грешки",
});
</script>
