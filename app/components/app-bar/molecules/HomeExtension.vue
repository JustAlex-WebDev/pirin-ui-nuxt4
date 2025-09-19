<template>
  <!-- Data Filter Tabs -->
  <v-tabs
    v-model="dataFilter"
    color="white"
    density="compact"
    :disabled="loading"
  >
    <v-tab v-for="tab in tabs" :key="tab.key" :value="tab.key">
      <!-- <v-icon start :icon="tab.icon" size="small" /> -->
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
//
// Composables
//
const { loading, dataFilter, fetchLast5Days } = useHomePage();

//
// Types
//
interface Tab {
  key: string;
  label: string;
  icon: string;
}

//
// State
//
const tabs: Tab[] = [
  { key: "referrals", label: "Направления", icon: "mdi-file-document" },
  { key: "sales", label: "Без направления", icon: "mdi-cash-register" },
  { key: "", label: "Всички", icon: "mdi-view-grid" },
];

//
// Watchers
//
watch(
  dataFilter,
  () => {
    fetchLast5Days();
  },
  { immediate: false }
);
</script>
