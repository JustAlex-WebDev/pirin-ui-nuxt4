<template>
  <v-list density="compact" nav>
    <!-- Section Title (optional) -->
    <div
      v-if="title"
      class="mb-2 px-1 text-uppercase text-caption text-medium-emphasis"
    >
      {{ title }}
    </div>

    <!-- Drawer Items -->
    <template v-for="item in items" :key="item.title">
      <DrawerItem
        :to="item.to"
        :icon="item.icon"
        :title="item.title"
        :tooltipText="item.tooltipText"
        :external="item?.external || false"
        :isPirinAdminRequired="item?.isPirinAdminRequired || false"
      />
    </template>
  </v-list>
</template>

<script setup lang="ts">
//
// Imports
//
import DrawerItem from "../molecules/DrawerItem.vue";

//
// Types
//
interface DrawerItemType {
  to: string;
  icon: string;
  title: string;
  tooltipText: string;
  isPirinAdminRequired?: boolean;
  external?: boolean;
}

interface Props {
  title?: string;
  items: DrawerItemType[];
}

//
// Props
//
defineProps<Props>();
</script>
