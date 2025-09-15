<template>
  <v-toolbar-title
    class="ml-2"
    style="flex: 1 1 auto; white-space: nowrap; overflow: visible"
  >
    {{ title }}
  </v-toolbar-title>
</template>

<script setup lang="ts">
//
// Props
//
defineProps<{
  title: string;
}>();
</script>
