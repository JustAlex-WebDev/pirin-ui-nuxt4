<template>
  <!-- External Link -->
  <v-tooltip
    v-if="external"
    location="bottom"
    :open-delay="700"
    :close-delay="300"
  >
    <template v-slot:activator="{ props: tooltipProps }">
      <v-hover>
        <template v-slot:default="{ isHovering, props: hoverProps }">
          <a
            v-bind="tooltipProps"
            :href="to"
            target="_blank"
            rel="noopener noreferrer"
            class="d-flex align-center text-decoration-none px-2 py-2 rounded"
            :class="isHovering ? 'bg-grey-lighten-4' : ''"
            @mouseenter="
              hoverProps.onMouseenter as (payload: MouseEvent) => void
            "
            @mouseleave="
              hoverProps.onMouseleave as (payload: MouseEvent) => void
            "
          >
            <!-- Icon -->
            <v-icon :icon="icon" size="24" class="text-medium-emphasis me-8" />
            <!-- Title -->
            <span
              class="font-weight-medium text-black"
              style="font-size: small"
            >
              {{ title }}
            </span>
          </a>
        </template>
      </v-hover>
    </template>

    <span>{{ tooltipText }}</span>
  </v-tooltip>

  <!-- Internal Router Link -->
  <v-tooltip v-else location="bottom" :open-delay="700" :close-delay="300">
    <template v-slot:activator="{ props: tooltipProps }">
      <v-list-item
        v-bind="tooltipProps"
        :to="to"
        :rounded="true"
        :active="isActive"
        :class="{ 'text-white': isActive }"
        :prepend-icon="icon"
        :title="title"
        :style="{
          backgroundColor: isActive ? 'rgba(27, 90, 108, 1)' : undefined,
        }"
      >
      </v-list-item>
    </template>

    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
//
// Types
//
interface Props {
  to: string;
  icon: string;
  title: string;
  tooltipText: string;
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
