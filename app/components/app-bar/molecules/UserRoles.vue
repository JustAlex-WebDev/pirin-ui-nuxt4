<template>
  <div v-if="pirinRoles.length > 0" class="my-2">
    <v-chip
      v-for="role in pirinRoles"
      :key="role"
      size="small"
      variant="outlined"
      rounded="true"
      class="mr-2"
      color="primary"
    >
      <v-icon start icon="mdi-account-outline" />
      {{ getRoleDisplayName(role) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
//
// Props
//
interface Props {
  pirinRoles: string[];
}

defineProps<Props>();

//
// Methods
//
const getRoleDisplayName = (role: string) => {
  return role === "pirin-admin" ? "Администратор" : "Потребител";
};
</script>
