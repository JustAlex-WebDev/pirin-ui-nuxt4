<template>
  <v-card min-width="320">
    <v-card-text class="pa-4">
      <!-- Status Items -->
      <div class="d-flex flex-column ga-3">
        <UploadStatusMenuItem actionType="nhis" />
        <v-divider />
        <UploadStatusMenuItem actionType="patients" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
//
// Imports
//
import UploadStatusMenuItem from "./UploadStatusMenuCardItem.vue";
</script>
