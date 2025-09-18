<template>
  <v-card min-width="320" color="light-blue-lighten-4">
    <v-card-text class="py-0 px-0 pt-1">
      <!-- User Email -->
      <p class="mt-4 text-center text-medium-emphasis font-weight-bold">
        {{ userEmail }}
      </p>

      <!-- User Avatar and Name -->
      <div class="text-center my-3" data-testid="user-avatar-section">
        <v-avatar
          color="primary"
          size="60"
          class="text-white font-weight-bold"
          data-testid="user-avatar-large"
        >
          <span class="text-h5">
            {{ user && user.name ? user.name.charAt(0).toUpperCase() : "U" }}
          </span>
        </v-avatar>

        <h3 class="mt-2 text-body-1 text-primary">
          {{ userName }}
        </h3>

        <!-- User Roles -->
        <div v-if="pirinRoles.length > 0" class="my-2">
          <v-chip
            v-for="role in pirinRoles"
            :key="role"
            size="small"
            variant="outlined"
            :rounded="4"
            class="mr-2 text-medium-emphasis"
          >
            <v-icon start icon="mdi-account-outline" />
            {{ role === "pirin-admin" ? "Администратор" : "Потребител" }}
          </v-chip>
        </div>
      </div>

      <v-divider />

      <v-btn
        @click="logout()"
        color="white"
        size="large"
        block
        prepend-icon="mdi-logout"
      >
        Изход
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
//
// Types
//
interface Props {
  user: { name?: string } | null;
  userName: string;
  userEmail: string;
  pirinRoles: string[];
  logout: () => void;
}

//
// Props
defineProps<Props>();
</script>
