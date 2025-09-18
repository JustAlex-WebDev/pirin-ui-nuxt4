<template>
  <v-menu
    v-model="accountMenuOpen"
    location="bottom"
    :close-on-content-click="false"
  >
    <!-- Activator -->
    <template v-slot:activator="{ props }">
      <AppBarActionButton
        v-bind="props"
        icon="mdi-account-outline"
        tooltipText="Детайли за профила"
      />
    </template>

    <!-- Menu Content -->
    <AccountMenuCard
      :user="user"
      :userName="userName"
      :userEmail="userEmail"
      :pirinRoles="pirinRoles"
      :logout="logout"
    />
  </v-menu>
</template>

<script setup lang="ts">
//
// Imports
//
import AccountMenuCard from "../molecules/AccountMenuCard.vue";
import AppBarActionButton from "../molecules/AppBarActionButton.vue";

//
// Composables
//

// Auth
const { user, logout, getRoles } = useAuth();
//
// State
//
const accountMenuOpen = ref(false);

//
// Computed Properties
//

// User info
const userName = computed(() => {
  return user.value?.name || user.value?.preferred_username || "Потребител";
});

const userEmail = computed(() => {
  return user.value?.email || "email@example.com";
});

const userRoles = computed(() => {
  return getRoles() || [];
});

const pirinRoles = computed(() => {
  return userRoles.value.filter(
    (role) => role === "pirin-user" || role === "pirin-admin"
  );
});
</script>
