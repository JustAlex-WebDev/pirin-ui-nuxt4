<template>
  <div class="mt-2 mb-4">
    <h2 class="text-h4">{{ title }}</h2>
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
  description: string;
}

defineProps<Props>();
</script>
