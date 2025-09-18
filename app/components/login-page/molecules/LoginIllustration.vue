<template>
  <v-img
    :src="imageSrc"
    :lazy-src="imageSrc"
    :alt="imageAlt"
    cover
    height="60vh"
    width="90vw"
    max-width="356.578px"
    max-height="450px"
    class="rounded-lg elevation-2"
  >
    <!-- Loading placeholder -->
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>
    </template>

    <!-- Error fallback -->
    <template #error>
      <div
        class="d-flex align-center justify-center fill-height bg-grey-lighten-3"
      >
        <v-icon icon="mdi-image-broken" size="48" color="grey" />
      </div>
    </template>
  </v-img>
</template>

<script setup lang="ts">
//
// Props
//
interface Props {
  imageSrc: string;
  imageAlt: string;
}

defineProps<Props>();
</script>
