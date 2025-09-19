<template>
  <div class="border rounded-lg">
    <v-data-table
      :mobile="smAndDown"
      :items="items"
      :headers="headers"
      :loading="loading"
      loading-text="Зареждане на данни..."
      :hide-default-footer="items.length === 0 && true"
      elevation="0"
      :item-key="itemKey"
      :hover="items.length === 0 ? false : true"
      :items-per-page-options="
        loading
          ? []
          : [
              { value: 10, title: '10' },
              { value: 15, title: '15' },
              { value: 20, title: '20' },
              { value: 50, title: '50' },
              { value: -1, title: 'Всички' },
            ]
      "
      items-per-page-text="Редове на страница"
      density="compact"
    >
      <!-- Dynamic header slots -->
      <template
        v-for="header in headers"
        #[`header.${header.key}`]="{
          column,
          getSortIcon,
          toggleSort,
          isSorted,
        }"
        :key="header.key"
      >
        <div
          class="d-flex align-center font-weight-bold cursor-pointer header"
          @click="toggleSort(column)"
        >
          <!-- Header icon -->
          <v-icon
            v-if="getHeaderIcon(header.key) !== ''"
            :icon="getHeaderIcon(header.key)"
            size="small"
            class="mr-2"
          ></v-icon>

          <!-- Header title -->
          <span>{{ header.title }}</span>

          <!-- Sort icon -->
          <v-icon
            v-if="header.sortable !== false"
            :icon="getSortIcon(column)"
            class="ml-1 sort-icon"
            :class="{ 'sort-active': isSorted(column) }"
          ></v-icon>
        </div>
      </template>

      <!-- Visit Date -->
      <template #item.visitDate="{ item }">
        {{ formatDate(item.visitDate) }}
      </template>

      <!-- No data slot -->
      <template #no-data>
        <p
          class="opacity-70 text-body-2 d-flex align-center justify-center ga-1"
        >
          <v-icon size="x-small" icon="mdi-information-outline" />
          <span>Няма налични данни!</span>
        </p>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
//
// Imports
//
import { useDisplay } from "vuetify";

//
// Types
//
interface TableHeader {
  title: string;
  key: string;
  sortable?: boolean;
}

//
// Props
//
interface Props {
  items: any[];
  headers: TableHeader[];
  loading?: boolean;
  itemKey?: string;
}

defineProps<Props>();

//
// Initial Setup
//

// Breakpoints
const { smAndDown } = useDisplay();

//
// Methods
//
const getHeaderIcon = (headerKey: string): string => {
  const iconMap: Record<string, string> = {
    visitDate: "mdi-calendar-outline",
    total: "mdi-chart-box-outline",
    ready: "mdi-check-circle-outline",
    pending: "mdi-clock-outline",
    sent: "mdi-email-fast-outline",
    jailed: "mdi-lock-outline",
  };
  return iconMap[headerKey] || "mdi-circle";
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.sort-icon {
  opacity: 0;
}

.header:hover .sort-icon {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.sort-icon.sort-active {
  opacity: 1 !important;
}
</style>
