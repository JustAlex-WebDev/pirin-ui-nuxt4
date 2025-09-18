<template>
  <div class="d-flex ga-2 align-center px-4 py-1 rounded-lg bg-primary">
    <span class="text-white text-h6 font-weight-regular text-capitalize">
      {{ appName }}
    </span>

    <v-btn
      color="white"
      variant="outlined"
      size="x-small"
      class="text-caption font-weight-regular"
    >
      <small>{{ serverType }}</small>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
//
// Props
//
interface Props {
  appName: string;
  serverType: string;
}

defineProps<Props>();
</script>
