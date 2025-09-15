<template>
  <!-- External Link -->
  <v-hover v-if="external">
    <template v-slot:default="{ isHovering, props }">
      <a
        v-bind="props"
        :href="to"
        target="_blank"
        rel="noopener noreferrer"
        class="d-flex align-center text-decoration-none px-2 py-2 rounded"
        :class="isHovering ? 'bg-grey-lighten-4' : ''"
      >
        <!-- Icon -->
        <v-icon :icon="icon" size="24" class="text-medium-emphasis me-8" />

        <!-- Title -->
        <span class="font-weight-medium text-black" style="font-size: small">
          {{ label }}
        </span>
      </a>
    </template>
  </v-hover>

  <!-- Internal Router Link -->
  <v-list-item
    v-else
    :to="to"
    :rounded="true"
    :active="isActive"
    :class="{ 'text-white': isActive }"
    :prepend-icon="icon"
    :title="label"
    :style="{
      backgroundColor: isActive ? 'rgba(27, 90, 108, 1)' : undefined,
    }"
  >
  </v-list-item>
</template>

<script setup lang="ts">
//
// Types
//
interface Props {
  to: string;
  icon: string;
  label: string;
  isPirinAdminRequired?: boolean;
  external?: boolean;
}

//
// Props
//
const props = defineProps<Props>();

//
// Composables
//
const route = useRoute();

//
// Computed
//
const isActive = computed(() => {
  const currentPath = route.path;

  // Direct comparison
  if (currentPath === props.to) {
    return true;
  }

  // For non-root paths, check prefix match
  if (props.to !== "/") {
    return currentPath.startsWith(props.to + "/");
  }

  return false;
});
</script>
