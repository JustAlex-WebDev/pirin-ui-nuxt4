<template>
  <v-tooltip location="bottom" :open-delay="700" :close-delay="300">
    <template v-slot:activator="{ props }">
      <v-btn text v-bind="props" class="mr-2">
        <v-icon size="x-large" icon="mdi-download"></v-icon>
      </v-btn>
    </template>

    <span>Изтегляне</span>
  </v-tooltip>
</template>

<script setup lang="ts"></script>
