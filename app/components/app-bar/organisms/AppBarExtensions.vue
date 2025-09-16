<template>
  <div class="px-4">
    <!-- Home Extension -->
    <HomeExtension v-if="extensionsConfig.component === 'HomeExtension'" />

    <!-- Calendar Extension -->
    <CalendarExtension
      v-else-if="extensionsConfig.component === 'CalendarExtension'"
    />
  </div>
</template>

<script setup lang="ts">
//
// Imports
//
import HomeExtension from "../molecules/HomeExtension.vue";
import CalendarExtension from "../molecules/CalendarExtension.vue";

//
// Composables
//
const { extensionsConfig } = useAppBar();
</script>
