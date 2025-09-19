<template>
  <div>
    <span class="text-h4 mr-2">{{ title }}</span>
    <span v-if="subtitle">{{ subtitle }}</span>

    <p class="mt-2">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
//
// Props
//
interface Props {
  title: string;
  subtitle?: string;
  description: string;
}

defineProps<Props>();
</script>
