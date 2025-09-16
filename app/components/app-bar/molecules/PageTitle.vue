<template>
  <v-app-bar-title
    class="ml-2"
    style="flex: 1 1 auto; white-space: nowrap; overflow: visible"
  >
    {{ title }}
  </v-app-bar-title>
</template>

<script setup lang="ts">
//
// Props
//
defineProps<{
  title: string;
}>();
</script>
