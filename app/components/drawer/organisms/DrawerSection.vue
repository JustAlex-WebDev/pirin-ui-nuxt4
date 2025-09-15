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
        :label="item.title"
        :external="item.external"
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
  title: string;
  icon: string;
  to: string;
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
