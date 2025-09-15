<template>
  <v-tooltip location="bottom" :open-delay="700" :close-delay="300">
    <template v-slot:activator="{ props: attrs }">
      <v-app-bar-nav-icon v-bind="attrs" @click="toggleDrawer" />
    </template>

    <span>{{ drawer ? "Скрий меню" : "Разгъни меню" }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
//
// Model
//
const drawer = defineModel<boolean>();

//
// Composables
//
const { toggleDrawer } = useDrawer();
</script>
