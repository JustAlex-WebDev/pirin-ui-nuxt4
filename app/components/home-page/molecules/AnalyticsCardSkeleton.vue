<template>
  <v-card class="d-flex flex-column" color="grey-lighten-4" elevation="0">
    <v-card-text class="py-2">
      <!-- Icon and Number Skeleton -->
      <div class="d-flex align-center mb-2">
        <v-skeleton-loader width="26" height="20" class="mr-2" />
        <v-skeleton-loader width="40px" height="32px" />
      </div>

      <!-- Subtitle Skeleton -->
      <v-skeleton-loader width="50%" height="14px" />
    </v-card-text>

    <v-divider />

    <!-- Button Skeleton -->
    <v-card-actions class="justify-center py-0">
      <v-skeleton-loader width="100%" height="24px" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts"></script>
