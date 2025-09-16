<template>
  <div>
    <!-- Default state -->
    <AppBarActionButton
      v-if="!uploadStatusData.hasActiveUploads"
      icon="mdi-email-fast-outline"
      tooltipText="Статус на качване"
    />

    <!-- Loading state -->
    <v-btn v-if="uploadStatusData.hasActiveUploads">
      <v-progress-circular size="20" width="2" indeterminate color="white" />
    </v-btn>

    <!-- Success chip -->
    <v-chip
      v-if="successCount > 0"
      small
      label
      color="green"
      class="font-weight-bold ml-2"
    >
      {{ successCount }}
    </v-chip>

    <!-- Error chip -->
    <v-chip
      v-if="errorCount > 0"
      small
      label
      color="red"
      class="font-weight-bold ml-2"
    >
      {{ errorCount }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
//
// Imports
//
import AppBarActionButton from "./AppBarActionButton.vue";

//
// Composables
//
const { uploadStatusData } = useUploadStatus();

//
// Computed
//
const successCount = computed(() => {
  const nhis = uploadStatusData.value.nhis.detailed?.completed || 0;
  const patients = uploadStatusData.value.patients.detailed?.completed || 0;
  return nhis + patients;
});

const errorCount = computed(() => {
  const nhis = uploadStatusData.value.nhis.detailed?.jailed || 0;
  const patients = uploadStatusData.value.patients.detailed?.jailed || 0;
  return nhis + patients;
});
</script>
