<template>
  <v-list-item
    class="text-white px-4 py-2"
    :style="{ backgroundImage: `url('${backgroundImage}')` }"
  >
    <!-- Title -->
    <v-list-item-title class="text-h6 font-weight-bold">
      {{ appName }}
    </v-list-item-title>

    <!-- User Info -->
    <div class="d-flex flex-column ga-0 opacity-80 mt-0">
      <span class="text-body-2 font-weight-bold mb-n1">{{ userName }}</span>
      <span class="text-caption">{{ userEmail }}</span>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
//
// Types
//
interface Props {
  appName: string;
  userName: string;
  userEmail: string;
  backgroundImage: string;
}

//
// Props
//
defineProps<Props>();
</script>
