<template>
  <v-tooltip location="bottom" :open-delay="700" :close-delay="300">
    <template v-slot:activator="{ props }">
      <v-btn text v-bind="props" @click="onClick">
        <!-- Loading state -->
        <v-btn v-if="loading">
          <v-progress-circular
            size="20"
            width="2"
            indeterminate
            color="white"
          />
        </v-btn>

        <!-- Normal state -->
        <v-icon v-else size="x-large" :icon="icon" />
      </v-btn>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
//
// Props
//
defineProps<{
  icon: string;
  tooltipText: string;
  loading?: boolean;
  onClick?: () => void;
}>();
</script>
