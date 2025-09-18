<template>
  <v-card min-width="320" color="light-blue-lighten-4">
    <v-card-text class="py-0 px-0 pt-1">
      <!-- User Email -->
      <p class="mt-4 text-center text-medium-emphasis font-weight-bold">
        {{ userEmail }}
      </p>

      <!-- User Avatar and Name -->
      <div class="text-center my-3">
        <UserAvatar
          :user="user"
          :display-name="userName"
          :size="60"
          avatarColor="primary"
        />

        <!-- User Roles -->
        <UserRoles :pirinRoles="pirinRoles" />
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
import UserAvatar from "./UserAvatar.vue";
import UserRoles from "./UserRoles.vue";

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
