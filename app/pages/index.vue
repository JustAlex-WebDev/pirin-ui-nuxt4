<template>
  <v-row>
    <v-col cols="12">
      <v-sheet class="pa-6 mb-0" elevation="1" rounded>
        <h1 class="text-h4 mb-2 d-flex align-center ga-2">
          <!-- Icon -->
          <v-icon :icon="'mdi-home-outline'" size="x-small" color=""></v-icon>

          <!-- Title -->
          <span>Начало</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-subtitle-1 text-medium-emphasis">
          Добре дошли в системата Пирин, {{ displayName }}!
        </p>

        <!-- Logout Button -->
        <v-btn
          color="error"
          variant="outlined"
          @click="handleLogout"
          :loading="signingOut"
          prepend-icon="mdi-logout"
        >
          Изход
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//
// Composables
//
const { user, logout, displayName } = useAuth();

//
// State
//
const signingOut = ref(false);

//
// Methods
//
const handleLogout = async () => {
  signingOut.value = true;
  try {
    await logout();
    // Will be redirected by middleware
  } finally {
    signingOut.value = false;
  }
};

//
// Metadata
//
definePageMeta({
  title: "Начало",
  requiresAuth: true,
});
</script>
