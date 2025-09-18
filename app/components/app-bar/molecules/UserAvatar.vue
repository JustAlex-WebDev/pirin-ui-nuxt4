<template>
  <div class="text-center my-3">
    <v-avatar
      :color="avatarColor"
      :size="size"
      class="text-white font-weight-bold"
    >
      <span class="text-h5">
        {{ avatarLetter }}
      </span>
    </v-avatar>

    <h3 class="mt-2 text-body-1 text-primary">
      {{ displayName }}
    </h3>
  </div>
</template>

<script setup lang="ts">
//
// Props
//
interface Props {
  user: { name?: string } | null;
  displayName: string;
  size: number;
  avatarColor: string;
}

const props = defineProps<Props>();

//
// Computed Properties
//
const avatarLetter = computed(() => {
  return props.user?.name ? props.user.name.charAt(0).toUpperCase() : "U";
});
</script>
