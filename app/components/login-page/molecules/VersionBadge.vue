<template>
  <a href="#" target="_blank" class="text-primary">{{ version }} </a>
</template>

<script setup lang="ts">
interface Props {
  version: string;
}

defineProps<Props>();
</script>
