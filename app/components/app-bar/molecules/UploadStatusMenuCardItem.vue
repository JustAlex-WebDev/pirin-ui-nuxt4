<template>
  <div class="d-flex align-center justify-space-between ga-4">
    <!-- Status Chip -->
    <v-chip :color="config.color" variant="flat" rounded="sm">
      <!-- Loading state -->
      <v-progress-circular
        v-if="config.isLoading"
        size="20"
        width="2"
        indeterminate
        color="white"
      />

      <!-- Normal state -->
      <v-icon v-else icon="mdi-email-fast-outline" color="white" size="large" />
    </v-chip>

    <!-- Status Text -->
    <div class="d-flex ga-2 align-center justify-start w-100">
      <span :class="`text-${config.color}`">{{ config.label }} |</span>
      <span class="text-body-1">{{ config.statusText }}</span>
    </div>

    <!-- Action Button -->
    <v-btn
      :disabled="config.isLoading"
      :loading="config.isLoading"
      variant="text"
      size="40"
      :color="config.color"
      rounded="circle"
      @click="config.action"
    >
      <v-icon
        :icon="config.isLoading ? 'mdi-loading' : 'mdi-play-outline'"
        size="24"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
//
// Props
//
const props = defineProps<{
  actionType: "nhis" | "patients";
}>();

//
// Composables
//
const { uploadStatusData, startNhisUpload, startPatientsUpload } =
  useUploadStatus();

//
// Configuration
//
const configs = {
  nhis: {
    label: "НАПРАВЛЕНИЯ",
    color: "purple",
    get statusText() {
      return uploadStatusData.value.nhis.displayText;
    },
    get isLoading() {
      return uploadStatusData.value.nhis.status === "progress";
    },
    action: startNhisUpload,
  },
  patients: {
    label: "БЕЗ НАПРАВЛЕНИЯ",
    color: "blue",
    get statusText() {
      return uploadStatusData.value.patients.displayText;
    },
    get isLoading() {
      return uploadStatusData.value.patients.status === "progress";
    },
    action: startPatientsUpload,
  },
} as const;

//
// Computed
//
const config = computed(() => configs[props.actionType]);
</script>
